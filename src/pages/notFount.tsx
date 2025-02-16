import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="mb-4 text-5xl font-bold text-gray-800 dark:text-gray-100">
        {t('notFound.heading')}
      </h1>
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
        {t('notFound.message')}
      </p>
      <Button type="primary" onClick={handleGoHome}>
        {t('notFound.goHome')}
      </Button>
    </div>
  );
};

export default NotFound;
