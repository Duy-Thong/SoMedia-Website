import React from 'react';
import { Card, Typography, Space } from 'antd';

const { Title, Paragraph, Text } = Typography;

const IntroPreview = ({ introData }) => {
    if (!introData) {
        return <Card title="Preview" bordered={false}>No data available</Card>;
    }

    return (
        <Card title="Preview" bordered={false}>
            <Typography>
                <Title level={3}>{introData.title}</Title>
                <Space direction="vertical">
                    <Text strong>Animated Items:</Text>
                    <ul>
                        <li>{introData.animated?.first || 'Not set'}</li>
                        <li>{introData.animated?.second || 'Not set'}</li>
                        <li>{introData.animated?.third || 'Not set'}</li>
                        <li>{introData.animated?.fourth || 'Not set'}</li>
                    </ul>
                </Space>
                <Paragraph>{introData.description}</Paragraph>
            </Typography>
        </Card>
    );
};

export default IntroPreview;
