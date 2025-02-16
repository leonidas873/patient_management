import { Form, Input, Select } from 'antd';
import DateInput from '../ui/DateInput';
import PhoneInput from './PhoneInput';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

function PersonalInfoForm() {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        label={t('personalInfoForm.firstName')}
        name={['personalInfo', 'name']}
        rules={[
          { required: true, message: t('personalInfoForm.firstNameRequired') }
        ]}
      >
        <Input placeholder={t('personalInfoForm.firstNamePlaceholder')} />
      </Form.Item>

      <Form.Item
        label={t('personalInfoForm.personalId')}
        name={['personalInfo', 'personalId']}
        rules={[
          { required: true, message: t('personalInfoForm.personalIdRequired') }
        ]}
      >
        <Input placeholder={t('personalInfoForm.personalIdPlaceholder')} />
      </Form.Item>

      <Form.Item
        label={t('personalInfoForm.surname')}
        name={['personalInfo', 'surname']}
        rules={[
          { required: true, message: t('personalInfoForm.surnameRequired') }
        ]}
      >
        <Input placeholder={t('personalInfoForm.surnamePlaceholder')} />
      </Form.Item>

      <Form.Item
        label={t('personalInfoForm.birthDate')}
        name={['personalInfo', 'birthDate']}
        rules={[
          { required: true, message: t('personalInfoForm.birthDateRequired') }
        ]}
      >
        <DateInput
          style={{ width: '100%' }}
          placeholder={t('personalInfoForm.birthDatePlaceholder')}
        />
      </Form.Item>

      <Form.Item
        label={t('personalInfoForm.country')}
        name={['personalInfo', 'country']}
        rules={[
          { required: true, message: t('personalInfoForm.countryRequired') }
        ]}
      >
        <Input placeholder={t('personalInfoForm.countryPlaceholder')} />
      </Form.Item>

      <Form.Item
        label={t('personalInfoForm.gender')}
        name={['personalInfo', 'gender']}
        rules={[
          { required: true, message: t('personalInfoForm.genderRequired') }
        ]}
      >
        <Select placeholder={t('personalInfoForm.genderPlaceholder')}>
          <Option value="male">{t('personalInfoForm.genderMale')}</Option>
          <Option value="female">{t('personalInfoForm.genderFemale')}</Option>
          <Option value="other">{t('personalInfoForm.genderOther')}</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={t('personalInfoForm.phone')}
        name={['personalInfo', 'phone']}
        rules={[
          { required: true, message: t('personalInfoForm.phoneRequired') }
        ]}
      >
        <PhoneInput />
      </Form.Item>
    </>
  );
}

export default PersonalInfoForm;
