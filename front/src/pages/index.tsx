import * as React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch, useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import UserOutlined from "@ant-design/icons/UserOutlined";
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";

import RecordsPage from "./RecordsPage";

import { IStoreProps } from "../types";

import { ROUTES } from "../constants";

import "./style.scss";

const { Header, Content } = Layout;

const ProtectedPages: React.FC<IStoreProps> = observer(({ store }) => {
  const history = useHistory();

  const handleMenuClick = (key: string): void => {
    if (key in ROUTES) {
      history.push(ROUTES[key]());
    }
  };

  return (
    <Layout>
      <Header>
        <Menu
          theme='light'
          mode='horizontal'
          onClick={item => handleMenuClick(item.key as string)}
        >
          <Menu.SubMenu
            key='user-menu'
            icon={<UserOutlined />}
            title={store.fullName}
            className='user-menu'
          >
            <Menu.Item key='logout' icon={<LogoutOutlined />}>
              Выход
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Header>
      <Content>
        <Switch>
          <Route path={ROUTES.records()} exact>
            <RecordsPage store={store} />
          </Route>
        </Switch>
      </Content>
    </Layout>
  );
});

export default ProtectedPages;
