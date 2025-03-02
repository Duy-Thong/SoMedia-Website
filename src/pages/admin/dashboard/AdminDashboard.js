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
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase/config';
import { signOut } from 'firebase/auth';
import './AdminDashboard.css';

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
            key: 'contact',
            icon: <ContactsOutlined />,
            label: 'Quản lý liên hệ',
            onClick: () => navigateTo('/admin/contact-management'),
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Cài đặt hệ thống',
            onClick: () => navigateTo('/admin/settings'),
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
            <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
                <div className="logo">
                    {!collapsed ? <h2>SoMedia Admin</h2> : <h2>SM</h2>}
                </div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={['dashboard']} items={menuItems} />
            </Sider>
            <Layout>
                <Header className="admin-header">
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    <div className="header-title">
                        <Title level={4}>Quản trị website Sổ Media</Title>
                    </div>
                    <Button icon={<LogoutOutlined />} onClick={handleLogout}>
                        Đăng xuất
                    </Button>
                </Header>
                <Content className="admin-content">
                    <Title level={3}>Tổng quan hệ thống</Title>

                    <Row gutter={[16, 16]} className="management-row">
                        <Col xs={24} sm={12} lg={8}>
                            <Card className="management-card" hoverable>
                                <UserOutlined className="card-icon" />
                                <Title level={4}>Quản lý người dùng</Title>
                                <p>Thêm, sửa, xóa và quản lý tài khoản người dùng</p>
                                <Button type="primary" onClick={() => navigateTo('/admin/users')}>
                                    Truy cập
                                </Button>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Card className="management-card" hoverable>
                                <HomeOutlined className="card-icon" />
                                <Title level={4}>Quản lý trang chủ</Title>
                                <p>Chỉnh sửa nội dung và giao diện trang chủ</p>
                                <Button type="primary" onClick={() => navigateTo('/admin/home-management')}>
                                    Truy cập
                                </Button>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Card className="management-card" hoverable>
                                <InfoCircleOutlined className="card-icon" />
                                <Title level={4}>Quản lý trang giới thiệu</Title>
                                <p>Cập nhật nội dung trang giới thiệu</p>
                                <Button type="primary" onClick={() => navigateTo('/admin/about-management')}>
                                    Truy cập
                                </Button>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Card className="management-card" hoverable>
                                <ContactsOutlined className="card-icon" />
                                <Title level={4}>Quản lý liên hệ</Title>
                                <p>Xem và phản hồi các tin nhắn liên hệ</p>
                                <Button type="primary" onClick={() => navigateTo('/admin/contact-management')}>
                                    Truy cập
                                </Button>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Card className="management-card" hoverable>
                                <SettingOutlined className="card-icon" />
                                <Title level={4}>Cài đặt hệ thống</Title>
                                <p>Cấu hình và tùy chỉnh hệ thống</p>
                                <Button type="primary" onClick={() => navigateTo('/admin/settings')}>
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
