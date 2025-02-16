import { Form, Input, Button, Select, Space, Slider } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useGetDiseases } from '../../api/queries';
import DateInput from '../DateInput';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

function ConditionForm() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useGetDiseases();

  return (
    <>
      <Form.Item
        label={t('conditionForm.diseaseLabel')}
        name={['condition', 'disease']}
        rules={[
          { required: true, message: t('conditionForm.diseaseRequired') }
        ]}
      >
        {isLoading ? (
          <Input placeholder={t('conditionForm.loadingDiseases')} disabled />
        ) : error ? (
          <Input
            placeholder={t('conditionForm.errorLoadingDiseases')}
            disabled
          />
        ) : (
          <Select placeholder={t('conditionForm.selectDisease')}>
            {data?.data?.map((disease) => (
              <Option key={disease.id} value={disease.id}>
                {disease.name}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.List name={['condition', 'symptoms']}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => {
              const { key, ...restField } = field;
              return (
                <Space
                  key={key}
                  align="center"
                  style={{ display: 'flex', marginBottom: 8 }}
                >
                  <Form.Item
                    {...restField}
                    name={[field.name, 'name']}
                    rules={[
                      {
                        required: true,
                        message: t('conditionForm.symptomNameRequired')
                      }
                    ]}
                  >
                    <Input placeholder={t('conditionForm.symptomNameLabel')} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[field.name, 'noteDate']}
                    rules={[
                      {
                        required: true,
                        message: t('conditionForm.noteDateRequired')
                      }
                    ]}
                  >
                    <DateInput placeholder={t('conditionForm.noteDateLabel')} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[field.name, 'severity']}
                    rules={[
                      {
                        required: true,
                        message: t('conditionForm.severityRequired')
                      }
                    ]}
                  >
                    <Slider min={0} max={100} style={{ width: 200 }} />
                  </Form.Item>
                  <DeleteOutlined
                    onClick={() => remove(field.name)}
                    className="relative top-[-13px] cursor-pointer text-red-500"
                  />
                </Space>
              );
            })}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                {t('conditionForm.addSymptom')}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
}

export default ConditionForm;
