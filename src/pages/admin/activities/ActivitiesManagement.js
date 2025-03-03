import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin, Alert, Card, Button, Modal, Row, Col, Space } from 'antd';
import { HomeOutlined, PlusOutlined, EditOutlined, DeleteOutlined, DashboardOutlined } from '@ant-design/icons';
import ActivityItem from '../../../components/admin/ActivityItem';
import SlideItem from '../../../components/admin/SlideItem';
import ActivityModalForm from '../../../components/admin/forms/ActivityModalForm';
import SlideModalForm from '../../../components/admin/forms/SlideModalForm';
import database from '../../../firebase/config';
import { ref, get, set, remove } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { uploadToBlob } from '../../../utils/uploadHelpers';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Meta } = Card;

const ActivitiesManagement = () => {
    const [activitiesData, setActivitiesData] = useState([]);
    const [slidesData, setSlidesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isActivityModalVisible, setIsActivityModalVisible] = useState(false);
    const [isSlideModalVisible, setIsSlideModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const navigate = useNavigate();

    const handleReturnToDashboard = () => {
        navigate('/admin/dashboard');
    };

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

    const showActivityModal = (mode, activity = null) => {
        setModalMode(mode);
        setCurrentItem(activity);
        setIsActivityModalVisible(true);
    };

    const showSlideModal = (mode, slide = null) => {
        setModalMode(mode);
        setCurrentItem(slide);
        setIsSlideModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsActivityModalVisible(false);
        setIsSlideModalVisible(false);
        setCurrentItem(null);
    };

    const handleActivitySubmit = async (values) => {
        try {
            setLoading(true);

            // Upload image if it's a File object
            if (values.img instanceof File) {
                const imageUrl = await uploadToBlob(values.img);
                values.img = imageUrl;
            }

            const newActivities = [...activitiesData];
            if (modalMode === 'add') {
                newActivities.push(values);
            } else {
                const index = activitiesData.findIndex(item => item.id === currentItem.id);
                if (index !== -1) {
                    newActivities[index] = { ...currentItem, ...values };
                }
            }
            await set(ref(database, 'activitiesData'), newActivities);
            setActivitiesData(newActivities);
            handleModalCancel();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSlideSubmit = async (values) => {
        try {
            setLoading(true);

            // Upload image if it's a File object
            if (values.src instanceof File) {
                const imageUrl = await uploadToBlob(values.src);
                values.src = imageUrl;
            }

            const newSlides = [...slidesData];
            if (modalMode === 'add') {
                newSlides.push(values);
            } else {
                const index = slidesData.findIndex(item => item.id === currentItem.id);
                if (index !== -1) {
                    newSlides[index] = { ...currentItem, ...values };
                }
            }
            await set(ref(database, 'slides'), newSlides);
            setSlidesData(newSlides);
            handleModalCancel();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (type, id) => {
        try {
            if (type === 'activity') {
                const newActivities = activitiesData.filter(item => item.id !== id);
                await set(ref(database, 'activitiesData'), newActivities);
                setActivitiesData(newActivities);
            } else {
                const newSlides = slidesData.filter(item => item.id !== id);
                await set(ref(database, 'slides'), newSlides);
                setSlidesData(newSlides);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const modalStyles = {
        content: {
            background: '#141414',
            padding: '24px',
            borderRadius: '8px',
        },
        header: {
            background: '#1f1f1f',
            borderBottom: '1px solid #303030',
            padding: '16px 24px',
        },
        title: {
            color: '#fff',
            margin: 0,
        },
        body: {
            background: '#141414',
            padding: '24px',
        },
        mask: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
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
            <Card style={{ background: '#141414', borderColor: '#303030', marginBottom: '24px' }}>
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

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card
                        title="Hoạt động"
                        extra={
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => showActivityModal('add')}
                            >
                                Thêm hoạt động
                            </Button>
                        }
                        style={{ background: '#141414', borderColor: '#303030' }}
                    >
                        <Row gutter={[16, 16]}>
                            {activitiesData.map(activity => (
                                <Col xs={24} sm={12} md={8} lg={6} key={activity.id}>
                                    <Card
                                        hoverable
                                        cover={<img alt={activity.time} src={activity.img} style={{ height: '200px', objectFit: 'cover' }} />}
                                        actions={[
                                            <EditOutlined key="edit" onClick={() => showActivityModal('edit', activity)} />,
                                            <DeleteOutlined key="delete" onClick={() => handleDelete('activity', activity.id)} />
                                        ]}
                                        style={{
                                            background: '#1f1f1f',
                                            borderColor: '#303030',
                                            height: '380px'
                                        }}
                                    >
                                        <Meta
                                            title={<Text style={{ color: '#fff' }}>{activity.description}</Text>}
                                            description={
                                                <Text
                                                    style={{
                                                        color: '#999',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                >
                                                    {activity.time}
                                                </Text>
                                            }
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Card>
                </Col>

                <Col span={24}>
                    <Card
                        title="Slides"
                        extra={
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => showSlideModal('add')}
                            >
                                Thêm slide
                            </Button>
                        }
                        style={{ background: '#141414', borderColor: '#303030' }}
                    >
                        <Row gutter={[16, 16]}>
                            {slidesData.map(slide => (
                                <Col xs={24} sm={12} md={8} lg={6} key={slide.id}>
                                    <Card
                                        hoverable
                                        cover={<img alt={slide.alt} src={slide.src} style={{ height: '200px', objectFit: 'cover' }} />}
                                        actions={[
                                            <EditOutlined key="edit" onClick={() => showSlideModal('edit', slide)} />,
                                            <DeleteOutlined key="delete" onClick={() => handleDelete('slide', slide.id)} />
                                        ]}
                                        style={{
                                            background: '#1f1f1f',
                                            borderColor: '#303030',
                                            height: '380px'
                                        }}
                                    >
                                        <Meta
                                            title={<Text style={{ color: '#fff' }}>{slide.description}</Text>}
                                            description={
                                                <Text
                                                    style={{
                                                        color: '#999',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                >
                                                    {slide.alt}
                                                </Text>
                                            }
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Card>
                </Col>
            </Row>

            <Modal
                title={`${modalMode === 'add' ? 'Thêm' : 'Sửa'} hoạt động`}
                open={isActivityModalVisible}
                onCancel={handleModalCancel}
                footer={null}
                styles={modalStyles}
                maskStyle={modalStyles.mask}
                centered
            >
                <ActivityModalForm
                    initialData={currentItem}
                    onSubmit={handleActivitySubmit}
                    mode={modalMode}
                />
            </Modal>

            <Modal
                title={`${modalMode === 'add' ? 'Thêm' : 'Sửa'} slide`}
                open={isSlideModalVisible}
                onCancel={handleModalCancel}
                footer={null}
                styles={modalStyles}
                maskStyle={modalStyles.mask}
                centered
            >
                <SlideModalForm
                    initialData={currentItem}
                    onSubmit={handleSlideSubmit}
                    mode={modalMode}
                />
            </Modal>
        </Layout>
    );
};

export default ActivitiesManagement;
