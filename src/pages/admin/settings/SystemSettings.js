import React from 'react';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

const SystemSettings = () => {
    return (
        <Content style={{ padding: '24px' }}>
            <Title level={2}>Cài đặt hệ thống</Title>
            <p>Trang cài đặt và cấu hình hệ thống sẽ được phát triển ở đây.</p>
        </Content>
    );
};

export default SystemSettings;
