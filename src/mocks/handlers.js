import { http, HttpResponse } from 'msw';
import data from './data.json';
import moment from 'moment';
const SECRET_KEY = 'mock-secret-key';

// Function to generate a fake JWT (base64-encoded object)
const generateToken = (user) => {
  const payload = btoa(
    JSON.stringify({ id: user.id, username: user.username, role: user.role })
  );
  return `${payload}.${SECRET_KEY}`;
};

const validateToken = (token) => {
  if (!token) return null;
  const [payload, secret] = token.split('.');
  if (secret !== SECRET_KEY) return null;
  return JSON.parse(atob(payload));
  return true;
};

export const handlers = [
  // Login API
  http.post('/api/login', async ({ request }) => {
    const { username, password } = await request.json();

    // Get language from Accept-Language header
    const langHeader = request.headers.get('Accept-Language');
    // Use the first language if provided, or default to English
    const lang = langHeader ? langHeader.split(',')[0] : 'ka';

    // Find user by username only.
    const foundUser = data.users.find((u) => u.username === username);

    if (!foundUser) {
      const messageText =
        lang === 'ka' ? 'მომხმარებელი არ მოიძებნა' : 'User not found';
      return HttpResponse.json({ message: messageText }, { status: 404 });
    }

    if (foundUser.password !== password) {
      const messageText =
        lang === 'ka' ? 'არასწორი პაროლი' : 'Incorrect password';
      return HttpResponse.json({ message: messageText }, { status: 403 });
    }

    return HttpResponse.json({
      token: generateToken(foundUser),
      username: foundUser.username,
      role: foundUser.role,
      clinic: foundUser.clinic
    });
  }),

  // Get All Patients API with Filters and Pagination
  http.get('/api/patients', async ({ request }) => {
    const url = new URL(request.url);
    const token = request.headers.get('Authorization')?.split(' ')[1];
    const user = validateToken(token);

    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    let patients = data.patients;

    // Filtering using the nested personalInfo object
    const name = url.searchParams.get('name');
    const surname = url.searchParams.get('surname');
    const personalId = url.searchParams.get('personalId');
    const status = url.searchParams.get('status');
    const dateFrom = url.searchParams.get('dateFrom');
    const dateTo = url.searchParams.get('dateTo');

    if (name) {
      patients = patients.filter((p) =>
        p.personalInfo.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (surname) {
      patients = patients.filter((p) =>
        p.personalInfo.surname.toLowerCase().includes(surname.toLowerCase())
      );
    }
    if (personalId) {
      patients = patients.filter(
        (p) => p.personalInfo.personalId.includes(personalId)
      );
    }
    if (status) {
      patients = patients.filter((p) => p.personalInfo.status === status);
    }
    if (dateFrom || dateTo) {
      // Parse the provided dates if they exist.
      const fromDate = dateFrom ? moment(dateFrom, 'DD-MM-YYYY').toDate() : null;
      const toDate = dateTo ? moment(dateTo, 'DD-MM-YYYY').toDate() : null;
    
      patients = patients.filter((p) => {
        // Parse the addedDate (stored in "YYYY-MM-DD" format)
        const addedDate = moment(p.personalInfo.addedDate, 'YYYY-MM-DD').toDate();
    
        // If both from and to dates are provided, check if addedDate is within the range.
        if (fromDate && toDate) {
          return addedDate >= fromDate && addedDate <= toDate;
        }
        // If only fromDate is provided, check if addedDate is on/after fromDate.
        if (fromDate) {
          return addedDate >= fromDate;
        }
        // If only toDate is provided, check if addedDate is on/before toDate.
        if (toDate) {
          return addedDate <= toDate;
        }
    
        // Default: include the record.
        return true;
      });
    }

    // Pagination
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedPatients = patients.slice(startIndex, endIndex);

    return HttpResponse.json({
      total: patients.length,
      page,
      limit,
      data: paginatedPatients
    });
  }),

  // Add Patient API
  http.post('/api/patients-add', async ({ request }) => {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    const user = validateToken(token);

    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Expect the new patient to be sent with a nested personalInfo object
    const newPatient = await request.json();

    // Generate a unique ID (using current count plus current time)
    newPatient.id = data.patients.length + 1 + new Date().getTime();

    // Ensure personalInfo exists; if not, create it.
    if (!newPatient.personalInfo) {
      newPatient.personalInfo = {};
    }

    // Set default addedDate if not provided (ISO format)
    if (!newPatient.personalInfo.addedDate) {
      newPatient.personalInfo.addedDate = new Date().toISOString();
    }

    // Set default status if not provided
    if (!newPatient.personalInfo.status) {
      newPatient.personalInfo.status = 'active';
    }

    data.patients.unshift(newPatient);

    return HttpResponse.json(newPatient, { status: 201 });
  }),

  // Edit Patient API
  http.put('/api/patients-update/:id', async ({ request, params }) => {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    const user = validateToken(token);
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const patientId = parseInt(params.id);
    const updatedData = await request.json();
    const patientIndex = data.patients.findIndex((p) => p.id === patientId);

    if (patientIndex === -1) {
      return HttpResponse.json(
        { message: 'Patient not found' },
        { status: 404 }
      );
    }

    // Merge updatedData with existing patient data.
    data.patients[patientIndex] = {
      ...data.patients[patientIndex],
      ...updatedData,
      // Merge personalInfo if provided.
      personalInfo: {
        ...data.patients[patientIndex].personalInfo,
        ...(updatedData.personalInfo || {})
      }
    };

    return HttpResponse.json(data.patients[patientIndex], { status: 200 });
  }),

  // DELETE Patient API
  http.delete('/api/patients-delete/:id', async ({ request, params }) => {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    const user = validateToken(token);
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const patientId = parseInt(params.id);
    const patientIndex = data.patients.findIndex((p) => p.id === patientId);

    if (patientIndex === -1) {
      return HttpResponse.json(
        { message: 'Patient not found' },
        { status: 404 }
      );
    }

    data.patients.splice(patientIndex, 1);

    return HttpResponse.json(
      { message: 'Patient deleted successfully' },
      { status: 200 }
    );
  }),

  // GET Single Patient by ID API
  http.get('/api/patients/:id', async ({ request, params }) => {
    // Optional token validation:
    const token = request.headers.get('Authorization')?.split(' ')[1];
    // const user = validateToken(token);
    // if (!user) {
    //   return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    const patientId = parseInt(params.id, 10);
    const patient = data.patients.find((p) => p.id === patientId);

    if (!patient) {
      return HttpResponse.json(
        { message: 'Patient not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(patient, { status: 200 });
  }),

  http.get('/api/diseases', async ({ request }) => {
    // Return the full list of diseases
    return HttpResponse.json({
      data: data.diseases
    });
  })
];
