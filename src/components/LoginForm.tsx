import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useLogin } from '../api/queries';
import { LoginCredentials, ResponseError } from '../types/apiTypes';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const { mutate, error, isError, isPending: loading, reset } = useLogin();

  const onFinish = (values: LoginCredentials) => {
    mutate(values);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 shadow dark:bg-gray-950">
      <Card className="w-full max-w-md shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-semibold">
          {t('login.heading')}
        </h2>
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          onValuesChange={() => {
            if (isError) {
              reset();
            }
          }}
          onSubmitCapture={(e) => e.preventDefault()}
        >
          <Form.Item
            label={t('login.username')}
            name="username"
            rules={[{ required: true, message: t('login.usernameRequired') }]}
          >
            <Input placeholder={t('login.usernamePlaceholder')} />
          </Form.Item>
          <Form.Item
            label={t('login.password')}
            name="password"
            rules={[{ required: true, message: t('login.passwordRequired') }]}
          >
            <Input.Password
              placeholder={t('login.passwordPlaceholder')}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          {isError && (
            <div className="mb-2 text-red-600">
              {(error as AxiosError<ResponseError>)?.response?.data?.message ||
                (error as AxiosError<ResponseError>)?.message ||
                t('login.error')}
            </div>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {t('login.submit')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
