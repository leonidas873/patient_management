import React from 'react';
import { Card } from 'antd';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from 'react-i18next';

const DoctorCard: React.FC = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation();

  return (
    <Card className="mx-auto my-4 max-w-full border border-gray-200 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          {t('doctorCard.username')} : {user?.username}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t('doctorCard.clinic')} : {user?.clinic}
        </p>
      </div>
    </Card>
  );
};

export default DoctorCard;
