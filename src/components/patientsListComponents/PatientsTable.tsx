import React from 'react';
import { Card, Table } from 'antd';
import { useSearchParams } from 'react-router-dom';
import {
  patients_table_columns,
  patients_table_columns_actions
} from './PatientsTable.config';
import { Patient, Role } from '../../types/apiTypes';
import PatientsListHeader from './PatientsListHeader';
import { usePatientsQuery } from '../../api/queries';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from 'react-i18next';

function PatientsTable() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchParams] = useSearchParams();
  const { user } = useAuthStore();
  const filters = Object.fromEntries(searchParams.entries());
  const { t } = useTranslation();
  const { data: patients, isLoading } = usePatientsQuery({
    page: currentPage.toString(),
    ...filters
  });
  if (!user) return <div>Not logged in</div>;
  if (isLoading) return <div>Loading...</div>;

  const translatedColumns = patients_table_columns.map((col) => ({
    ...col,
    ...{ title: <>{t(col.title)}</> }
  }));
  // console.log(t(translatedColumns[0].title))
  const columns =
    user.role === Role.Admin || user.role === Role.Doctor
      ? [...translatedColumns, ...patients_table_columns_actions]
      : [...translatedColumns];

  const dataSource = patients?.data.map((patient: Patient) => ({
    ...patient.personalInfo,
    key: patient.id
  }));

  return (
    <Card>
      <PatientsListHeader />
      <Table
        dataSource={dataSource}
        columns={columns}
        locale={{
          emptyText: t('table.emptyText')
        }}
        pagination={{
          pageSize: 5,
          total: patients?.total,
          current: currentPage,
          onChange: (cur) => {
            setCurrentPage(cur);
          }
        }}
      />
    </Card>
  );
}

export default PatientsTable;
