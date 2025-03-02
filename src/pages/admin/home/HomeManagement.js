import React from 'react';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

const HomeManagement = () => {
    return (
        <Content style={{ padding: '24px' }}>
            <Title level={2}>Quản lý trang chủ</Title>
            <p>Trang quản lý nội dung trang chủ sẽ được phát triển ở đây.</p>
        </Content>
    );
};

export default HomeManagement;
