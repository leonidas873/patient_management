import React from 'react';
import PatientsTable from '../components/patientsListComponents/PatientsTable';
import PatientsFilter from '../components/patientsListComponents/PatientsFilter';
import { Card } from 'antd';

const PatientsListPage: React.FC = () => {
  return (
    <div className="min-h-screen rounded-none py-6 dark:bg-gray-700">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-6">
          <PatientsFilter />
        </div>

        {/* Table Section */}
        <Card className="rounded-lg bg-white p-6 shadow">
          <PatientsTable />
        </Card>
      </div>
    </div>
  );
};

export default PatientsListPage;
