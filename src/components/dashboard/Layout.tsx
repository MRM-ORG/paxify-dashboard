import React , {useState} from 'react';
import { items } from '@/constants'
import {usePathname} from 'next/navigation'
import { Layout, Menu, Grid, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;

const {useBreakpoint} = Grid


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const screens = useBreakpoint();
    
    const [collapsed, setCollapsed] = useState(true);
    console.log({pathname})
    const pathParts = pathname.split('/').filter(part => part !== ''); // Split the path and remove empty parts
    const lastPart = pathParts[pathParts.length - 1]; // Get the last part of the path
    const capitalizedWord = lastPart.charAt(0).toUpperCase() + lastPart.slice(1);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider breakpoint={screens.md?undefined:"lg"} collapsedWidth={screens.md?undefined:"0"}  collapsible theme='light' collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu defaultSelectedKeys={[pathname]} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: "white",borderBottom:"1px solid #e8e8e8" }}>
                    <div className='flex justify-between'>
                        <div className='pl-10'>
                            <span style={{fontWeight: 'bold', fontSize: '27px'}}>{capitalizedWord}</span>
                        </div>
                        <div className='flex flex-row pr-10'>
                            <div className='mt-4 mr-2'>
                            <img src='/logo/Notifications.png' className='h-[36px] w-[36px]'/>
                            </div>
                            <div>
                                <Avatar shape="square" icon={<UserOutlined className='mt-2'/>} className='h-[45px] w-[45px]'/>
                            </div>
                            <div className='flex flex-col ml-2'>
                                <span style={{fontWeight: '600'}}>Mushfiq</span>
                                <span >Admin</span>
                            </div>
                        </div>
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


