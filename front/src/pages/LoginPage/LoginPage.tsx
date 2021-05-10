import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router";
import { Button, Form, Input, Tabs, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { IStoreProps } from "../../types";
import { ROUTES } from "../../constants";

import "./style.scss";

const { Title } = Typography;
const { TabPane } = Tabs;

interface IFormValues {
  email: string;
  password: string;
}

interface ISignUpValues {
  name: string;
  surname: string;
  email: string;
  login: string;
  password: string;
}

const LoginPage: React.FC<IStoreProps> = observer(({ store }) => {
  const history = useHistory();

  const [activeKey, setActiveKey] = useState(() => "1");

  const handleLogin = async ({ email, password }: IFormValues) => {
    try {
      await store.login(email, password);
      history.push(ROUTES.records());
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignUp = async ({
    name,
    surname,
    email,
    password,
  }: ISignUpValues) => {
    try {
      await store.signUp(name, surname, email, password);
      history.push(ROUTES.records());
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeTab = (key: string): void => setActiveKey(key);

  return (
    <div className='login'>
      <Title level={2} className='login__title'>
        Сервис новостей
      </Title>
      <Tabs
        activeKey={activeKey}
        size='large'
        style={{ width: "100%" }}
        onChange={onChangeTab}
      >
        <TabPane tab='Войти' key='1'>
          <Form layout='vertical' onFinish={handleLogin}>
            <Form.Item
              name='email'
              rules={[{ required: true, message: `Укажите email` }]}
            >
              <Input
                prefix={<UserOutlined />}
                type='email'
                placeholder='Введите email'
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[{ required: true, message: `Укажите пароль` }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type='password'
                placeholder='Введите пароль'
              />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Войти
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab='Зарегистрироваться' key='2'>
          <Form layout='vertical' onFinish={handleSignUp}>
            <Form.Item
              name='name'
              rules={[{ required: true, message: `Укажите имя` }]}
            >
              <Input type='text' placeholder='Введите имя' />
            </Form.Item>
            <Form.Item
              name='surname'
              rules={[{ required: true, message: `Укажите фамилию` }]}
            >
              <Input type='text' placeholder='Введите фамилию' />
            </Form.Item>
            <Form.Item
              name='email'
              rules={[{ required: true, message: `Укажите email` }]}
            >
              <Input type='email' placeholder='Введите email' />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[{ required: true, message: `Укажите пароль` }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type='password'
                placeholder='Введите пароль'
              />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Отправить
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
});

export default LoginPage;
