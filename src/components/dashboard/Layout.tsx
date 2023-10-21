import React , {useState} from 'react';
import { items } from '@/constants'
import {usePathname} from 'next/navigation'
import { Layout, Menu,Button,Grid } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const {useBreakpoint} = Grid


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const screens = useBreakpoint();
    
    const [collapsed, setCollapsed] = useState(true);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider breakpoint={screens.md?undefined:"lg"} collapsedWidth={screens.md?undefined:"0"}  collapsible theme='light' collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu defaultSelectedKeys={[pathname]} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: "none",borderBottom:"1px solid #e8e8e8" }}>
            
                    <div className='h-full  flex justify-center items-center'>
                        <img src='/logo/Reellife-dashboard.png' alt="Logo" className="w-8 h-9 mr-2 text-center" />
                    </div>

                </Header>
                <Content>
                    {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>© 2022 Reellife</Footer>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;


