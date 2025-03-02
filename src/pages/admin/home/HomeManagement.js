import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin, Alert, Card, Row, Col, Divider } from 'antd';
import IntroForm from '../../../components/admin/IntroForm';
import database from '../../../firebase/config';
import { ref, get } from 'firebase/database';
import { HomeOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

const HomeManagement = () => {
    const [introData, setIntroData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIntroData = async () => {
            try {
                const introRef = ref(database, 'introdata');
                const snapshot = await get(introRef);

                if (snapshot.exists()) {
                    setIntroData(snapshot.val());
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIntroData();
    }, []);

    if (loading) {
        return (
            <Content
                style={{
                    padding: '32px',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                    minHeight: 'calc(100vh - 64px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Spin size="large" tip={<Text style={{ color: '#bfbfbf', marginTop: '15px' }}>Loading intro data...</Text>} />
            </Content>
        );
    }

    if (error) {
        return (
            <Content
                style={{
                    padding: '32px',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                    minHeight: 'calc(100vh - 64px)'
                }}
            >
                <Card
                    style={{
                        background: '#141414',
                        borderRadius: '10px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <Alert
                        message="Error"
                        description={`Failed to load intro data: ${error}`}
                        type="error"
                        showIcon
                    />
                </Card>
            </Content>
        );
    }

    return (
        <Content
            style={{
                padding: '32px',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                minHeight: 'calc(100vh - 64px)'
            }}
        >
            <Row gutter={[24, 24]}>
                <Col span={24} style={{ display: 'flex', alignItems: 'center' }}>
                    <HomeOutlined style={{ fontSize: '28px', color: '#1890ff', marginRight: '12px' }} />
                    <Title level={2} style={{ color: '#fff', margin: 0, fontWeight: 600 }}>
                        Quản lý trang chủ
                    </Title>
                </Col>

                <Col span={24}>
                    <Text style={{ color: '#bfbfbf', fontSize: '16px', display: 'block', marginBottom: '20px' }}>
                        Chỉnh sửa thông tin hiển thị trên trang chủ của website
                    </Text>
                    <Divider style={{ borderColor: '#303030', margin: '12px 0 24px' }} />
                </Col>

                <Col span={24}>
                    <Card
                        bordered={false}
                        style={{
                            background: '#141414',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.6)'
                        }}
                        title={
                            <Text strong style={{ color: '#e6e6e6', fontSize: '18px' }}>
                                Thông tin giới thiệu
                            </Text>
                        }
                        headStyle={{
                            background: '#1a1a1a',
                            borderBottom: '1px solid #303030',
                            padding: '16px 24px'
                        }}
                        bodyStyle={{
                            padding: '24px'
                        }}
                    >
                        <IntroForm initialData={introData} />
                    </Card>
                </Col>
            </Row>
        </Content>
    );
};

export default HomeManagement;
