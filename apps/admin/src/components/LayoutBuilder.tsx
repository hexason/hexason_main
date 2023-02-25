import { useAuth } from '@/hooks/useAuth';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/router';
import { createElement } from 'react';
import { FaFacebook } from "react-icons/fa"

const { Content, Footer, Sider } = Layout;

export default function LayoutBuilder({ children }: any) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter()
  const { user, loading } = useAuth();

  const items: MenuProps['items'] = [
    {
      key: "nav_1",
      icon: createElement(FaFacebook),
      label: "Нүүр",
      onClick: () => {
        router.push("/")
      }
    },
    {
      key: "nav_2",
      icon: createElement(FaFacebook),
      label: "Бараа нэмэх",
      onClick: () => {
        router.push("/product/add")
      }
    },
  ];

  if (loading) return <>Loading...</>
  if (!user) return children;
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: colorBgContainer, minHeight: "80vh" }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Powered By Hexason</Footer>
      </Layout>
    </Layout>
  )
}
