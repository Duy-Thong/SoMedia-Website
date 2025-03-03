import React, { useState } from 'react';
import { Layout, Menu, Card, Row, Col, Button, Typography } from 'antd';
import {
    UserOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    ContactsOutlined,
    SettingOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DashboardOutlined,
    LogoutOutlined,
    ProfileOutlined,
    ProjectOutlined,
    TeamOutlined,
    PhoneFilled,
    TrophyOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase/config';
import { signOut } from 'firebase/auth';
import './AdminDashboard.css';
import { PhoneAuthCredential } from 'firebase/auth/cordova';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AdminDashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/admin/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const navigateTo = (path) => {
        navigate(path);
    };

    const menuItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Tổng quan',
            onClick: () => navigateTo('/admin/dashboard'),
        },
        {
            key: 'users',
            icon: <UserOutlined />,
            label: 'Quản lý người dùng',
            onClick: () => navigateTo('/admin/users'),
        },
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: 'Quản lý trang chủ',
            onClick: () => navigateTo('/admin/home-management'),
        },
        {
            key: 'about',
            icon: <InfoCircleOutlined />,
            label: 'Quản lý trang giới thiệu',
            onClick: () => navigateTo('/admin/about-management'),
        },
        {
            key: 'activities',
            icon: <ProfileOutlined />,
            label: 'Quản lý hoạt động',
            onClick: () => navigateTo('/admin/activities'),
        },
        {
            key: 'projects',
            icon: <ProjectOutlined />,
            label: 'Quản lý dự án',
            onClick: () => navigateTo('/admin/projects'),
        },
        {
            key: 'recruitment',
            icon: <TeamOutlined />,
            label: 'Quản lý tuyển thành viên',
            onClick: () => navigateTo('/admin/recruitment'),
        },
        {
            key: 'members',
            icon: <ContactsOutlined />,
            label: 'Quản lý thành viên',
            onClick: () => navigateTo('/admin/members'),
        },
        {
            key: 'contact',
            icon: <PhoneFilled />,
            label: 'Quản lý liên hệ',
            onClick: () => navigateTo('/admin/contact-management'),
        },
        {
            key: 'awards',
            icon: <TrophyOutlined />,
            label: 'Quản lý giải thưởng',
            onClick: () => navigateTo('/admin/awards'),
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Đăng xuất',
            onClick: handleLogout,
        },
    ];

    return (
        <Layout className="admin-dashboard">
            <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
                <div className="logo">
                    {!collapsed ? <h2 style={{ color: 'white' }}>SoMedia Admin</h2> : <h2 style={{ color: 'white' }}>SM</h2>}
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']} items={menuItems} />
            </Sider>
            <Layout style={{ background: '#141414' }}>
                <Header className="admin-header" style={{ background: '#1f1f1f', color: 'white' }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                        style: { color: 'white' }
                    })}
                    <div className="header-title">
                        <Title level={4} style={{ color: 'white', margin: 0 }}>Quản trị website Sổ Media</Title>
                    </div>

                </Header>
                <Content className="admin-content" style={{ background: '#141414' }}>
                    <Title level={3} style={{ color: 'white' }}>Tổng quan hệ thống</Title>

                    <Row gutter={[16, 16]} className="management-row">
                        <Col xs={24} sm={12} lg={8}>
                            <Card className="management-card" hoverable style={{ background: '#1f1f1f' }}>
                                <UserOutlined className="card-icon" style={{ color: '#1890ff' }} />
                                <Title level={4} style={{ color: 'white' }}>Quản lý người dùng</Title>
                                <p style={{ color: 'white' }}>Thêm, sửa, xóa và quản lý tài khoản người dùng</p>
                                <Button type="primary" onClick={() => navigateTo('/admin/users')}>
                                    Truy cập
                                </Button>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Card className="management-card" hoverable style={{ background: '#1f1f1f' }}>
                                <HomeOutlined className="card-icon" style={{ color: '#1890ff' }} />
                                <Title level={4} style={{ color: 'white' }}>Quản lý trang chủ</Title>
                                <p style={{ color: 'white' }}>Chỉnh sửa nội dung và giao diện trang chủ</p>
                                <Button type="primary" onClick={() => navigateTo('/admin/home-management')}>
                                    Truy cập
                                </Button>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Card className="management-card" hoverable style={{ background: '#1f1f1f' }}>
                                <InfoCircleOutlined className="card-icon" style={{ color: '#1890ff' }} />
                                <Title level={4} style={{ color: 'white' }}>Quản lý trang giới thiệu</Title>
                                <p style={{ color: 'white' }}>Cập nhật nội dung trang giới thiệu</p>
                                <Button type="primary" onClick={() => navigateTo('/admin/about-management')}>
                                    Truy cập
                                </Button>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Card className="management-card" hoverable style={{ background: '#1f1f1f' }}>
                                <ProfileOutlined className="card-icon" style={{ color: '#1890ff' }} />
                                <Title level={4} style={{ color: 'white' }}>Quản lý hoạt động</Title>
                                <p style={{ color: 'white' }}>Quản lý danh sách hoạt động của câu lạc bộ</p>
                                <Button type="primary" onClick={() => navigateTo('/admin/activities')}>
                                    Truy cập
                                </Button>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Card className="management-card" hoverable style={{ background: '#1f1f1f' }}>
                                <ProjectOutlined className="card-icon" style={{ color: '#1890ff' }} />
                                <Title level={4} style={{ color: 'white' }}>Quản lý dự án</Title>
                                <p style={{ color: 'white' }}>Quản lý các dự án của câu lạc bộ</p>
                                <Button type="primary" onClick={() => navigateTo('/admin/projects')}>
                                    Truy cập
                                </Button>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Card className="management-card" hoverable style={{ background: '#1f1f1f' }}>
                                <TeamOutlined className="card-icon" style={{ color: '#1890ff' }} />
                                <Title level={4} style={{ color: 'white' }}>Quản lý tuyển thành viên</Title>
                                <p style={{ color: 'white' }}>Quản lý thông tin tuyển thành viên mới</p>
                                <Button type="primary" onClick={() => navigateTo('/admin/recruitment')}>
                                    Truy cập
                                </Button>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Card className="management-card" hoverable style={{ background: '#1f1f1f' }}>
                                <ContactsOutlined className="card-icon" style={{ color: '#1890ff' }} />
                                <Title level={4} style={{ color: 'white' }}>Quản lý thành viên</Title>
                                <p style={{ color: 'white' }}>Quản lý danh sách thành viên ban điều hành</p>
                                <Button type="primary" onClick={() => navigateTo('/admin/members')}>
                                    Truy cập
                                </Button>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Card className="management-card" hoverable style={{ background: '#1f1f1f' }}>
                                <PhoneFilled className="card-icon" style={{ color: '#1890ff' }} />
                                <Title level={4} style={{ color: 'white' }}>Quản lý liên hệ</Title>
                                <p style={{ color: 'white' }}>Xem và phản hồi các tin nhắn liên hệ</p>
                                <Button type="primary" onClick={() => navigateTo('/admin/contact-management')}>
                                    Truy cập
                                </Button>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Card className="management-card" hoverable style={{ background: '#1f1f1f' }}>
                                <TrophyOutlined className="card-icon" style={{ color: '#1890ff' }} />
                                <Title level={4} style={{ color: 'white' }}>Quản lý giải thưởng</Title>
                                <p style={{ color: 'white' }}>Quản lý danh sách giải thưởng của câu lạc bộ</p>
                                <Button type="primary" onClick={() => navigateTo('/admin/awards')}>
                                    Truy cập
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;
