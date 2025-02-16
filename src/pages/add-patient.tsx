import React from 'react';
import PatientForm, {
  PatientFormValues
} from '../components/patientForm/PatientForm';
import { useAddPatient } from '../api/queries';
import DoctorCard from '../components/Cards/DoctorCard';

const AddPatient: React.FC = () => {
  const { mutate } = useAddPatient();
  const onSubmit = (values: PatientFormValues) => {
    mutate(values);
  };

  return (
    <div className="m-auto flex max-w-4xl flex-col items-stretch justify-center gap-4">
      <DoctorCard />
      <PatientForm onSubmit={onSubmit} />
    </div>
  );
};

export default AddPatient;
