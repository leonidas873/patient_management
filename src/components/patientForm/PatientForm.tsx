import React, { useEffect, useState } from 'react';
import { Form, Button, Tabs, Card, TabsProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Condition, FinancialRecord, PersonalInfo } from '../../types/apiTypes';
import PersonalInfoForm from './PersonalInfoForm';
import ConditionForm from './ConditionForm';
import FinancialRecordsTable from './FinancialRecordsTable';

export interface PatientFormValues {
  personalInfo: Pick<
    PersonalInfo,
    'name' | 'surname' | 'birthDate' | 'gender' | 'country' | 'phone'
  >;
  condition: Condition;
  financialRecords: FinancialRecord[];
}

interface PatientFormProps {
  defaultValues?: PatientFormValues;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: PatientFormValues) => void;
  submitLabel?: string;
}

const PatientForm: React.FC<PatientFormProps> = ({
  defaultValues,
  onSubmit,
  submitLabel
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<PatientFormValues>();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialTab = searchParams.get('tab') || '1';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (defaultValues) {
      form.setFieldsValue(defaultValues);
    }
  }, [defaultValues, form]);

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams, activeTab]);

  const handleFinish = (values: PatientFormValues) => {
    onSubmit(values);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishFailed = (errorInfo: any) => {
    const errorFields = errorInfo.errorFields as {
      name: (string | number)[];
    }[];

    if (
      errorFields.some((field) =>
        field.name[0].toString().startsWith('personalInfo')
      )
    ) {
      setActiveTab('1');
      setSearchParams({ tab: '1' });
    } else if (
      errorFields.some((field) =>
        field.name[0].toString().startsWith('condition')
      )
    ) {
      setActiveTab('2');
      setSearchParams({ tab: '2' });
    }
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('patientForm.personalInfoTab'),
      children: <PersonalInfoForm />,
      forceRender: true
    },
    {
      key: '2',
      label: t('patientForm.conditionTab'),
      children: <ConditionForm />,
      forceRender: true
    },
    {
      key: '3',
      label: t('patientForm.financialRecordsTab'),
      children: (
        <FinancialRecordsTable
          records={defaultValues?.financialRecords || []}
        />
      )
    }
  ];

  const onTabChange = (key: string) => {
    setActiveTab(key);
    setSearchParams({ tab: key });
  };

  return (
    <Card className="w-full">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={defaultValues}
        onFinishFailed={onFinishFailed}
      >
        <Tabs
          defaultActiveKey="1"
          type="card"
          activeKey={activeTab}
          onChange={onTabChange}
          items={items}
        />
        <Form.Item>
          <Button type="primary" htmlType="submit" className='mt-6'>
            {submitLabel || t('patientForm.submit')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PatientForm;
