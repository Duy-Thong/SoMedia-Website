import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin, Alert, Button } from 'antd';
import ActivitiesForm from '../../../components/admin/ActivitiesForm';
import database from '../../../firebase/config';
import { ref, get } from 'firebase/database';

const { Content } = Layout;
const { Title } = Typography;

const ActivitiesManagement = () => {
    const [activitiesData, setActivitiesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivitiesData = async () => {
            try {
                const activitiesRef = ref(database, 'activitiesData');
                const snapshot = await get(activitiesRef);

                if (snapshot.exists()) {
                    // Convert Firebase object to array if needed
                    const data = snapshot.val();
                    const activitiesArray = Array.isArray(data) ? data : Object.values(data);
                    setActivitiesData(activitiesArray);
                } else {
                    console.log("No activities data available");
                    setActivitiesData([]);
                }
            } catch (error) {
                console.error("Error fetching activities data:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchActivitiesData();
    }, []);

    if (loading) {
        return (
            <Content style={{ padding: '24px', textAlign: 'center' }}>
                <Spin size="large" />
                <p>Loading activities data...</p>
            </Content>
        );
    }

    if (error) {
        return (
            <Content style={{ padding: '24px' }}>
                <Alert
                    message="Error"
                    description={`Failed to load activities data: ${error}`}
                    type="error"
                    showIcon
                />
            </Content>
        );
    }

    return (
        <Content style={{ padding: '24px' }}>
            <Title level={2}>Quản lý hoạt động</Title>
            <ActivitiesForm initialData={activitiesData} />
        </Content>
    );
};

export default ActivitiesManagement;
