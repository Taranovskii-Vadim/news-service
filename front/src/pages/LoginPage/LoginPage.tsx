import React from "react";
import { useHistory } from "react-router";
import { Button, Form, Input, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { IStoreProps } from "../../types";

import { ROUTES } from "../../constants";

import "./style.scss";

const { Title } = Typography;

interface IFormValues {
  login: string;
  password: string;
}

const LoginPage: React.FC<IStoreProps> = observer(({ store }) => {
  const history = useHistory();

  const handleLogin = async ({ login, password }: IFormValues) => {
    try {
      await store.login(login, password);
      history.push(ROUTES.records());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='login'>
      <Title level={2} className='login__title'>
        Сервис новостей
      </Title>
      <Form layout='vertical' onFinish={handleLogin}>
        <Form.Item>
          <Input
            name='login'
            prefix={<UserOutlined />}
            placeholder='Введите логин'
          />
        </Form.Item>
        <Form.Item>
          <Input
            name='password'
            prefix={<LockOutlined />}
            placeholder='Введите пароль'
          />
        </Form.Item>
        <Form.Item>
          <Button style={{ width: "100%" }} type='primary' htmlType='submit'>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export default LoginPage;
