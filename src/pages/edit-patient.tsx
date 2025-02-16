import React from 'react';
import PatientForm, { PatientFormValues } from '../components/patientForm/PatientForm';
import { useGetPatient, useUpdatePatient } from '../api/queries';
import { useParams } from 'react-router-dom';
import DoctorCard from '../components/DoctorCard';
import { Patient } from '../types/apiTypes';

const EditPatient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { mutate } = useUpdatePatient(Number(id));
  const { data, isLoading } = useGetPatient(Number(id));
  const onSubmit = (values: PatientFormValues) => {
    mutate(values);
  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="m-auto flex max-w-4xl flex-col items-stretch justify-center gap-4">
      <DoctorCard />
      <PatientForm onSubmit={onSubmit} defaultValues={data} />
    </div>
  );
};

export default EditPatient;
