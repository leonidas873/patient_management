// src/components/patientForm/PatientForm.tsx
import React, { useEffect, useState } from 'react';
import { Form, Button, Tabs, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { Condition, FinancialRecord, PersonalInfo } from '../../types/apiTypes';
import PersonalInfoForm from './PersonalInfoForm';
import ConditionForm from './ConditionForm';
import FinancialRecordsTable from './FinancialRecordsTable';

const { TabPane } = Tabs;

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
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    if (defaultValues) {
      form.setFieldsValue(defaultValues);
    }
  }, [defaultValues, form]);

  const handleFinish = (values: PatientFormValues) => {
    onSubmit(values);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishFailed = (errorInfo: any) => {
    console.log('Validation failed:', errorInfo);
    const errorFields = errorInfo.errorFields as {
      name: (string | number)[];
    }[];

    if (
      errorFields.some((field) =>
        field.name[0].toString().startsWith('personalInfo')
      )
    ) {
      setActiveTab('1');
    } else if (
      errorFields.some((field) =>
        field.name[0].toString().startsWith('condition')
      )
    ) {
      setActiveTab('2');
    }
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
          onChange={(key) => setActiveTab(key)}
          destroyInactiveTabPane={false}
        >
          <TabPane tab={t('patientForm.personalInfoTab')} key="1" forceRender>
            <PersonalInfoForm />
          </TabPane>
          <TabPane tab={t('patientForm.conditionTab')} key="2" forceRender>
            <ConditionForm />
          </TabPane>
          <TabPane tab={t('patientForm.financialRecordsTab')} key="3">
            <FinancialRecordsTable
              records={defaultValues?.financialRecords || []}
            />
          </TabPane>
        </Tabs>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {submitLabel || t('patientForm.submit')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PatientForm;
