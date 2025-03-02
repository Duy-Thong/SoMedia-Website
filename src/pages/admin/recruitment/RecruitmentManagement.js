import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin, Alert, Tabs } from 'antd';
import RecruitmentForm from '../../../components/admin/RecruitmentForm';
import RecruitmentApplications from '../../../components/admin/RecruitmentApplications';
import database from '../../../firebase/config';
import { ref, get } from 'firebase/database';

const { Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

const RecruitmentManagement = () => {
    const [recruitmentData, setRecruitmentData] = useState({
        settings: {},
        applications: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecruitmentData = async () => {
            try {
                // Fetch recruitment settings
                const settingsRef = ref(database, 'recruitmentData/settings');
                const settingsSnapshot = await get(settingsRef);

                // Fetch recruitment applications
                const applicationsRef = ref(database, 'recruitmentData/applications');
                const applicationsSnapshot = await get(applicationsRef);

                const settings = settingsSnapshot.exists() ? settingsSnapshot.val() : {
                    isActive: false,
                    title: 'Tuyển thành viên mới',
                    description: 'Chúng tôi đang tìm kiếm những thành viên nhiệt huyết!',
                    openDate: '',
                    closeDate: '',
                    requirements: [''],
                    positions: [{ name: '', description: '', slots: 1 }]
                };

                const applications = applicationsSnapshot.exists()
                    ? (Array.isArray(applicationsSnapshot.val())
                        ? applicationsSnapshot.val()
                        : Object.values(applicationsSnapshot.val()))
                    : [];

                setRecruitmentData({
                    settings,
                    applications
                });

            } catch (error) {
                console.error("Error fetching recruitment data:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecruitmentData();
    }, []);

    if (loading) {
        return (
            <Content style={{ padding: '24px', textAlign: 'center' }}>
                <Spin size="large" />
                <p>Đang tải dữ liệu tuyển thành viên...</p>
            </Content>
        );
    }

    if (error) {
        return (
            <Content style={{ padding: '24px' }}>
                <Alert
                    message="Lỗi"
                    description={`Không thể tải dữ liệu: ${error}`}
                    type="error"
                    showIcon
                />
            </Content>
        );
    }

    return (
        <Content style={{ padding: '24px' }}>
            <Title level={2}>Quản lý tuyển thành viên</Title>

            <Tabs defaultActiveKey="settings" style={{ marginTop: 20 }}>
                <TabPane tab="Cài đặt tuyển dụng" key="settings">
                    <RecruitmentForm initialData={recruitmentData.settings} />
                </TabPane>
                <TabPane tab="Đơn đăng ký" key="applications">
                    <RecruitmentApplications applications={recruitmentData.applications} />
                </TabPane>
            </Tabs>
        </Content>
    );
};

export default RecruitmentManagement;
