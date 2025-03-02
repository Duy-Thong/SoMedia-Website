import React from 'react';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

const ContactManagement = () => {
    return (
        <Content style={{ padding: '24px' }}>
            <Title level={2}>Quản lý liên hệ</Title>
            <p>Trang quản lý tin nhắn liên hệ sẽ được phát triển ở đây.</p>
        </Content>
    );
};

export default ContactManagement;
