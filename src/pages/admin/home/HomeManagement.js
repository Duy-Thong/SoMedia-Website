import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin, Alert } from 'antd';
import IntroForm from '../../../components/admin/IntroForm';
import database from '../../../firebase/config';
import { ref, get } from 'firebase/database';

const { Content } = Layout;
const { Title } = Typography;

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
            <Content style={{ padding: '24px', textAlign: 'center' }}>
                <Spin size="large" />
                <p>Loading intro data...</p>
            </Content>
        );
    }

    if (error) {
        return (
            <Content style={{ padding: '24px' }}>
                <Alert
                    message="Error"
                    description={`Failed to load intro data: ${error}`}
                    type="error"
                    showIcon
                />
            </Content>
        );
    }

    return (
        <Content style={{ padding: '24px' }}>
            <Title level={2}>Quản lý trang chủ</Title>
            <IntroForm initialData={introData} />
        </Content>
    );
};

export default HomeManagement;
