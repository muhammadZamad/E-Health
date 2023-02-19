import React, { useState } from 'react'
import Frontend from "pages/frontend"

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserAddOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={({ key }) => {
              if (key === "signout") {

              } else {
                navigate(key)
              }
            }}
            items={[
              {
                key: '/',
                icon: <UserAddOutlined />,
                label: 'ADD',
              },
              {
                key: '/record',
                icon: <HistoryOutlined />,
                label: 'Histroy',
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            <h1 className="text-center" style={{ marginTop: "-60px" }}>E-Health</h1>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Frontend />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
