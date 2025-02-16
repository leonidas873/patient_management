import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Tag, Card } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getFiltersFromURL, updateSearchParams } from '../../utils/helpers';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;

export interface FilterValues {
  name?: string;
  surname?: string;
  addedDateRange?: moment.Moment[];
  dateFrom?: string;
  dateTo?: string;
  personalId?: string;
  status?: string;
}

const PatientsFilter: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    getFiltersFromURL(searchParams)
  );

  useEffect(() => {
    const filters = getFiltersFromURL(searchParams);
    setActiveFilters(filters);
    form.setFieldsValue(filters);
  }, [searchParams, form]);

  const onFinish = (values: FilterValues) => {
    if (values.addedDateRange) {
      values.dateFrom = values.addedDateRange[0]?.format('DD-MM-YYYY');
      values.dateTo = values.addedDateRange[1]?.format('DD-MM-YYYY');
      delete values.addedDateRange;
    }
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v !== undefined && v !== '')
    );
    setSearchParams(
      updateSearchParams(
        Object.fromEntries(
          Object.entries(filteredValues).map(([k, v]) => [k, String(v)])
        )
      )
    );
  };

  const onReset = () => {
    form.resetFields();
    setActiveFilters({});
    setSearchParams({});
  };

  const removeFilter = (key: string) => {
    const updatedFilters = { ...activeFilters };
    delete updatedFilters[key];
    setActiveFilters(updatedFilters);
    setSearchParams(updateSearchParams(updatedFilters));
    form.setFieldsValue({ [key]: undefined });
  };

  return (
    <Card className="mx-auto rounded-lg bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
        {t('patientsFilter.heading')}
      </h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Form.Item name="name" label={t('patientsFilter.name')}>
            <Input placeholder={t('patientsFilter.name')} allowClear />
          </Form.Item>
          <Form.Item name="surname" label={t('patientsFilter.surname')}>
            <Input placeholder={t('patientsFilter.surname')} allowClear />
          </Form.Item>
          <Form.Item
            name="addedDateRange"
            label={t('patientsFilter.addedDateRange')}
          >
            <RangePicker
              format="DD-MM-YYYY"
              placeholder={[t('patientsFilter.from'), t('patientsFilter.to')]}
              allowClear
            />
          </Form.Item>
          <Form.Item name="personalId" label={t('patientsFilter.personalId')}>
            <Input placeholder={t('patientsFilter.personalId')} allowClear />
          </Form.Item>
          <Form.Item name="status" label={t('patientsFilter.status')}>
            <Select placeholder={t('patientsFilter.selectStatus')} allowClear>
              <Option value="active">{t('patientsFilter.active')}</Option>
              <Option value="inactive">{t('patientsFilter.inactive')}</Option>
              <Option value="pending">{t('patientsFilter.pending')}</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="mt-6 flex space-x-4">
          <Button type="primary" htmlType="submit">
            {t('patientsFilter.filterButton')}
          </Button>
          <Button
            htmlType="button"
            onClick={onReset}
            className="border-gray-300"
          >
            {t('patientsFilter.resetButton')}
          </Button>
        </div>
      </Form>
      {Object.keys(activeFilters).length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">
            {t('patientsFilter.activeFilters')}:
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([key, value]) => (
              <Tag
                key={key}
                closable
                onClose={() => removeFilter(key)}
                className="mr-2 mb-2"
              >
                {t(`patientsFilter.${key}`) || key}: {value}
              </Tag>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default PatientsFilter;
