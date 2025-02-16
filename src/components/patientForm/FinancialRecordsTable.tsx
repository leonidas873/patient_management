import React, { useMemo } from 'react';
import { Table } from 'antd';
import { FinancialRecord } from '../../types/apiTypes';
import { useTranslation } from 'react-i18next';

interface FinancialRecordsTableProps {
  records: FinancialRecord[];
}

const FinancialRecordsTable: React.FC<FinancialRecordsTableProps> = ({
  records
}) => {
  const { t } = useTranslation();

  const columns = useMemo(() => {
    return [
      {
        title: t('financialRecordsTable.service'),
        dataIndex: 'service',
        key: 'service'
      },
      {
        title: t('financialRecordsTable.amount'),
        dataIndex: 'amount',
        key: 'amount',
        render: (amount: number) => `$${amount}`
      },
      {
        title: t('financialRecordsTable.date'),
        dataIndex: 'date',
        key: 'date',
        render: (date: string) => date
      }
    ];
  }, [t]);

  const dataSource = useMemo(() => {
    return records.map((record, index) => ({
      ...record,
      key: record.date + index
    }));
  }, []);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      locale={{
        emptyText: t('table.emptyText')
      }}
    />
  );
};

export default FinancialRecordsTable;
