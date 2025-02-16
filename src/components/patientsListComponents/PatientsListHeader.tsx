import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Role } from '../../types/apiTypes';
import { useTranslation } from 'react-i18next';

const PatientsListHeader: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleAddPatient = () => {
    navigate('/add-patient');
  };

  const { user } = useAuthStore();

  return (
    <div className="mb-6 flex items-center justify-between rounded-md bg-gray-100 p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        {t('patientsTable.header.h2')}
      </h2>
      {user?.role == Role.Doctor && (
        <button
          onClick={handleAddPatient}
          className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          {t('patientsTable.header.addPatient')}
        </button>
      )}
    </div>
  );
};

export default PatientsListHeader;
