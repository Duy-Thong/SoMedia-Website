import React, { useState } from 'react';
import { Form, Button, Card, message, Modal, Space, Typography, Divider, Row, Col, Tabs } from 'antd';
import { PlusOutlined, SaveOutlined, ExclamationCircleOutlined, DashboardOutlined } from '@ant-design/icons';
import ActivityItem from './ActivityItem';
import SlideItem from './SlideItem';
import database from '../../firebase/config';
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;
const { confirm } = Modal;
const { TabPane } = Tabs;

const ActivitiesForm = ({ initialData = [], initialSlides = [] }) => {
    const [activities, setActivities] = useState(initialData);
    const [slides, setSlides] = useState(initialSlides);
    const [saving, setSaving] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            setSaving(true);
            // Save activities data
            const activitiesRef = ref(database, 'activitiesData');
            await set(activitiesRef, activities);

            // Save slides data
            const slidesRef = ref(database, 'slides');
            await set(slidesRef, slides);

            message.success({
                content: 'Cập nhật dữ liệu thành công!',
                style: { marginTop: '20vh' },
            });
        } catch (error) {
            console.error('Error saving data:', error);
            message.error({
                content: 'Lỗi khi lưu dữ liệu: ' + error.message,
                style: { marginTop: '20vh' },
            });
        } finally {
            setSaving(false);
        }
    };

    // Activities management functions
    const addActivity = () => {
        const newActivity = {
            description: '',
            img: '',
            time: ''
        };
        setActivities([...activities, newActivity]);
    };

    const updateActivity = (index, updatedActivity) => {
        const updatedActivities = [...activities];
        updatedActivities[index] = updatedActivity;
        setActivities(updatedActivities);
    };

    const removeActivity = (index) => {
        confirm({
            title: 'Xác nhận xóa',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có chắc chắn muốn xóa hoạt động này?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            style: {
                background: '#1f1f1f',
                borderColor: '#303030'
            },
            okButtonProps: {
                style: { background: '#ff4d4f', borderColor: '#ff4d4f' }
            },
            onOk() {
                const updatedActivities = activities.filter((_, i) => i !== index);
                setActivities(updatedActivities);
                message.success({
                    content: 'Đã xóa hoạt động',
                    style: { marginTop: '20vh' },
                });
            }
        });
    };

    // Slides management functions
    const addSlide = () => {
        const newSlide = {
            alt: '',
            description: '',
            src: ''
        };
        setSlides([...slides, newSlide]);
    };

    const updateSlide = (index, updatedSlide) => {
        const updatedSlides = [...slides];
        updatedSlides[index] = updatedSlide;
        setSlides(updatedSlides);
    };

    const removeSlide = (index) => {
        confirm({
            title: 'Xác nhận xóa',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có chắc chắn muốn xóa slide này?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            style: {
                background: '#1f1f1f',
                borderColor: '#303030'
            },
            okButtonProps: {
                style: { background: '#ff4d4f', borderColor: '#ff4d4f' }
            },
            onOk() {
                const updatedSlides = slides.filter((_, i) => i !== index);
                setSlides(updatedSlides);
                message.success({
                    content: 'Đã xóa slide',
                    style: { marginTop: '20vh' },
                });
            }
        });
    };

    const handleGoToDashboard = () => {
        navigate('/admin/dashboard');
    };

    return (
        <div style={{ background: '#141414', padding: '20px', borderRadius: '8px' }}>
            <Form form={form} layout="vertical">
                <Tabs
                    defaultActiveKey="activities"
                    style={{ color: '#fff' }}
                    className="custom-tabs"
                >
                    <TabPane
                        tab={<span style={{ color: '#fff' }}>Hoạt động</span>}
                        key="activities"
                    >
                        <Card
                            title={<Text style={{ color: '#fff' }}>Danh sách hoạt động</Text>}
                            className="activities-card"
                            style={{
                                background: '#1f1f1f',
                                borderColor: '#303030'
                            }}
                            headStyle={{
                                background: '#141414',
                                borderColor: '#303030'
                            }}
                        >
                            <Space direction="vertical" style={{ width: '100%' }} size="large">
                                {activities.map((activity, index) => (
                                    <ActivityItem
                                        key={index}
                                        activity={activity}
                                        index={index}
                                        updateActivity={updateActivity}
                                        removeActivity={removeActivity}
                                    />
                                ))}

                                <Button
                                    type="dashed"
                                    onClick={addActivity}
                                    block
                                    icon={<PlusOutlined />}
                                    style={{
                                        marginTop: '12px',
                                        borderColor: '#177ddc',
                                        color: '#177ddc'
                                    }}
                                >
                                    Thêm hoạt động
                                </Button>
                            </Space>
                        </Card>
                    </TabPane>
                    <TabPane
                        tab={<span style={{ color: '#fff' }}>Slides</span>}
                        key="slides"
                    >
                        <Card
                            title={<Text style={{ color: '#fff' }}>Danh sách slides</Text>}
                            className="slides-card"
                            style={{
                                background: '#1f1f1f',
                                borderColor: '#303030'
                            }}
                            headStyle={{
                                background: '#141414',
                                borderColor: '#303030'
                            }}
                        >
                            <Space direction="vertical" style={{ width: '100%' }} size="large">
                                {slides.map((slide, index) => (
                                    <SlideItem
                                        key={index}
                                        slide={slide}
                                        index={index}
                                        updateSlide={updateSlide}
                                        removeSlide={removeSlide}
                                    />
                                ))}

                                <Button
                                    type="dashed"
                                    onClick={addSlide}
                                    block
                                    icon={<PlusOutlined />}
                                    style={{
                                        marginTop: '12px',
                                        borderColor: '#177ddc',
                                        color: '#177ddc'
                                    }}
                                >
                                    Thêm slide
                                </Button>
                            </Space>
                        </Card>
                    </TabPane>
                </Tabs>

                <Divider style={{ borderColor: '#303030' }} />

                <Row gutter={16}>
                    <Col span={12}>
                        <Button
                            type="default"
                            onClick={handleGoToDashboard}
                            icon={<DashboardOutlined />}
                            size="large"
                        >
                            Quay về Trang chủ
                        </Button>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Button
                            type="primary"
                            onClick={handleSave}
                            loading={saving}
                            icon={<SaveOutlined />}
                            size="large"
                        >
                            Lưu thay đổi
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default ActivitiesForm;
