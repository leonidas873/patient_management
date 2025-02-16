import { PersonalInfo } from '../../types/apiTypes';
import { Space } from 'antd';
import { DeletePatient, EditPatient } from './Actions';
import { ColumnType } from 'antd/es/table';

interface ColumnItem {
  title: string;
  dataIndex: string | string[];
  key: keyof PersonalInfo;
}

export const patients_table_columns: ColumnItem[] = [
  {
    title: 'patientsTable.columns.name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'patientsTable.columns.surname',
    dataIndex: 'surname',
    key: 'surname'
  },
  {
    title: 'patientsTable.columns.birthDate',
    dataIndex: 'birthDate',
    key: 'birthDate'
  },
  {
    title: 'patientsTable.columns.status',
    dataIndex: 'status',
    key: 'status'
  }
];

export const patients_table_columns_actions: ColumnType[] = [
  {
    title: 'Actions',
    key: 'action',
    align: 'center',
    render: (record: { key: number }) => (
      <Space size="middle">
        <DeletePatient id={record.key} />
        <EditPatient id={record.key} />
      </Space>
    )
  }
];
