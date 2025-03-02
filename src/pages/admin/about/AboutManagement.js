import React from 'react';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

const AboutManagement = () => {
    return (
        <Content style={{ padding: '24px' }}>
            <Title level={2}>Quản lý trang giới thiệu</Title>
            <p>Trang quản lý nội dung giới thiệu sẽ được phát triển ở đây.</p>
        </Content>
    );
};

export default AboutManagement;
