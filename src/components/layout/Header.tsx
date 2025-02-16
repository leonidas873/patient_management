import React from 'react';
import { Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';
import { Link, useNavigate } from 'react-router-dom';

const { Option } = Select;

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useThemeStore();
  const { logout } = useAuthStore();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const { user } = useAuthStore();
  return (
    <header className="flex flex-col items-center justify-between bg-white p-4 shadow sm:flex-row dark:bg-gray-800">
      <div className="mb-2 sm:mb-0">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          <Link to="/">{t('patientManagement')}</Link>
        </h1>
      </div>

      <div className="mb-2 flex items-center space-x-4 sm:mb-0">
        <Button onClick={toggleDarkMode} type="default">
          {darkMode ? t('darkMode') : t('lightMode')}
        </Button>
        <Select
          defaultValue={i18n.language}
          style={{ width: 140 }}
          onChange={handleLanguageChange}
        >
          <Option value="en">English</Option>
          <Option value="ka">ქართული</Option>
        </Select>
      </div>

      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-gray-800 dark:text-gray-100">
            {user.username}
          </span>
          <Button onClick={handleLogout} type="primary">
            {t('logout')}
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
