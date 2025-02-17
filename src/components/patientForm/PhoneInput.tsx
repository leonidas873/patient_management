import React, { useState } from 'react';
import { Input, Button, Modal, Form, message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

interface PhoneInputProps {
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value = '', onChange }) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    if (onChange) {
      onChange(newVal);
    }
    if (verified && newVal !== value) {
      setVerified(false);
    }
  };

  const handleSendCode = async () => {
    if (!value || value.trim() === '') {
      message.error(t('phoneInput.errorNoPhone'));
      return;
    }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success(t('phoneInput.otpSent'));
      setModalVisible(true);
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error(t('phoneInput.otpFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      message.error(t('phoneInput.otpRequired'));
      return;
    }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success(t('phoneInput.phoneVerified'));
      setVerified(true);
      setModalVisible(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    } catch (error) {
      message.error(t('phoneInput.otpVerificationFailed'));
    } finally {
      setLoading(false);
    }
  };

  const isPhoneValid = value.replace(/\D/g, '').length >= 5;

  return (
    <>
      <Form.Item style={{marginBottom: "5px"}}>
        <Input
          placeholder={t('phoneInput.placeholder')}
          value={value}
          onChange={handleInputChange}
          addonAfter={
            <Button
              type="primary"
              onClick={handleSendCode}
              loading={loading}
              disabled={!isPhoneValid || verified}
              style={
                verified
                  ? {
                      backgroundColor: 'green',
                      borderColor: 'green',
                      minWidth: '120px',
                      whiteSpace: 'nowrap',
                      height: '30px'
                    }
                  : { minWidth: '120px', whiteSpace: 'nowrap', height: '30px' }
              }
            >
              {verified ? (
                <>
                  <CheckOutlined /> {t('phoneInput.verified')}
                </>
              ) : (
                t('phoneInput.sendCode')
              )}
            </Button>
          }
        />
      </Form.Item>

      <Modal
        title={t('phoneInput.verifyPhoneNumber')}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        okText={t('phoneInput.verifyOtp')}
        cancelText={t('phoneInput.cancel')}
        onOk={handleVerifyOtp}
        confirmLoading={loading}
      >
        <Form layout="vertical">
          <Form.Item label={t('phoneInput.otpLabel')} required>
            <Input
              placeholder={t('phoneInput.otpPlaceholder')}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PhoneInput;
