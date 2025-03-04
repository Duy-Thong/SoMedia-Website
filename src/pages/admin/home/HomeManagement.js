import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin, Alert, Card, Row, Col, Divider, Button, Space } from 'antd';
import IntroForm from '../../../components/admin/IntroForm';
import database, { logActivity } from '../../../firebase/config';
import { ref, get } from 'firebase/database';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text } = Typography;

const HomeManagement = () => {
    const [introData, setIntroData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
            <Content className="p-4 md:p-8 text-center bg-[#141414] min-h-[calc(100vh-64px)] flex flex-col justify-center items-center">
                <Spin size="large" tip={<Text className="text-white mt-4">Loading intro data...</Text>} />
            </Content>
        );
    }

    if (error) {
        return (
            <Content className="p-4 md:p-8 bg-[#141414] min-h-[calc(100vh-64px)]">
                <Card className="bg-[#1f1f1f] rounded-lg shadow-lg border-[#303030]">
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
        <Content className="p-4 md:p-8 bg-[#141414] min-h-[calc(100vh-64px)]">
            <Row gutter={[24, 24]}>
                <Col span={24} className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4">
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/admin/dashboard')}
                        className="bf-blue-200"
                    >
                        Quay về Dashboard
                    </Button>
                    <Space>
                        <HomeOutlined className="text-2xl text-[#1890ff] mr-3" />
                        <Title level={2} className="m-0 text-white font-semibold">
                            Quản lý trang chủ
                        </Title>
                    </Space>

                </Col>

                <Col span={24}>
                    <Divider className="border-[#303030] my-3 md:my-6" />
                </Col>

                <Col span={24}>
                    <Card
                        bordered={false}
                        className="bg-[#1f1f1f] rounded-xl overflow-hidden shadow-xl border-[#303030]"
                        title={
                            <Text strong className="text-white text-base md:text-lg">
                                Thông tin giới thiệu
                            </Text>
                        }
                        headStyle={{
                            backgroundColor: '#1f1f1f',
                            borderBottom: '1px solid #303030',
                            padding: '12px 16px md:16px 24px'
                        }}
                        bodyStyle={{
                            padding: '16px md:24px',
                            backgroundColor: '#1f1f1f'
                        }}
                    >
                        <IntroForm
                            initialData={introData}
                            onLog={(action) => logActivity('admin', action)}
                        />
                    </Card>
                </Col>
            </Row>
        </Content>
    );
};

export default HomeManagement;
