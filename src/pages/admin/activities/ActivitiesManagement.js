import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin, Alert, Card, Button, Breadcrumb, Space } from 'antd';
import { HomeOutlined, AppstoreOutlined, HistoryOutlined, DashboardOutlined } from '@ant-design/icons';
import ActivitiesForm from '../../../components/admin/ActivitiesForm';
import database from '../../../firebase/config';
import { ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

const ActivitiesManagement = () => {
    const [activitiesData, setActivitiesData] = useState([]);
    const [slidesData, setSlidesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch activities data
                const activitiesRef = ref(database, 'activitiesData');
                const activitiesSnapshot = await get(activitiesRef);

                // Fetch slides data
                const slidesRef = ref(database, 'slides');
                const slidesSnapshot = await get(slidesRef);

                if (activitiesSnapshot.exists()) {
                    const data = activitiesSnapshot.val();
                    const activitiesArray = Array.isArray(data) ? data : Object.values(data);
                    setActivitiesData(activitiesArray);
                } else {
                    console.log("No activities data available");
                    setActivitiesData([]);
                }

                if (slidesSnapshot.exists()) {
                    const data = slidesSnapshot.val();
                    const slidesArray = Array.isArray(data) ? data : Object.values(data);
                    setSlidesData(slidesArray);
                } else {
                    console.log("No slides data available");
                    setSlidesData([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleReturnToDashboard = () => {
        navigate('/admin/dashboard');
    };

    if (loading) {
        return (
            <Card style={{ margin: '24px', background: '#141414', borderColor: '#303030' }}>
                <Spin size="large" tip="Đang tải dữ liệu..." />
            </Card>
        );
    }

    if (error) {
        return (
            <Card style={{ margin: '24px', background: '#141414', borderColor: '#303030' }}>
                <Alert
                    message="Error"
                    description={`Failed to load data: ${error}`}
                    type="error"
                    showIcon
                    style={{ background: '#2a1215', borderColor: '#5c0011' }}
                />
            </Card>
        );
    }

    return (
        <Layout style={{ padding: '24px', background: '#0a0a0a', minHeight: 'calc(100vh - 64px)' }}>
            <Card
                style={{
                    background: '#141414',
                    borderColor: '#303030',
                    marginBottom: '24px'
                }}
            >
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <Title level={2} style={{ color: '#fff', margin: '0 0 16px 0' }}>
                        Quản lý hoạt động và Slides
                    </Title>
                    <p style={{ color: '#d9d9d9' }}>
                        Thêm, sửa và xóa các hoạt động sự kiện và slides hiển thị trên trang chủ.
                        Thay đổi sẽ được cập nhật ngay sau khi lưu.
                    </p>
                    <Button
                        type="primary"
                        icon={<DashboardOutlined />}
                        onClick={handleReturnToDashboard}
                        style={{
                            background: '#141414',
                            borderColor: '#303030',
                            color: '#d9d9d9'
                        }}
                    >
                        Về Dashboard
                    </Button>
                </Space>
            </Card>

            <Card
                style={{
                    background: '#141414',
                    borderColor: '#303030'
                }}
            >
                <ActivitiesForm initialData={activitiesData} initialSlides={slidesData} />
            </Card>
        </Layout>
    );
};

export default ActivitiesManagement;
