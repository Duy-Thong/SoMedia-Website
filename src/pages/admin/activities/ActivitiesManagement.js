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

    // Thêm hàm tạo ID ngẫu nhiên
    const generateId = () => {
        return 'id_' + Math.random().toString(36).substr(2, 9);
    };

    const handleActivitySubmit = async (values) => {
        try {
            setLoading(true);

            // Upload image if it's a File object
            if (values.img instanceof File) {
                const imageUrl = await uploadToBlob(values.img);
                values.img = imageUrl;
            }

            if (modalMode === 'add') {
                // Thêm ID mới cho activity
                const newActivity = {
                    ...values,
                    id: generateId()
                };
                // Cập nhật Firebase
                await set(ref(database, `activitiesData/${newActivity.id}`), newActivity);
                // Cập nhật state trực tiếp
                setActivitiesData(prev => [...prev, newActivity]);
            } else {
                // Cập nhật activity hiện tại
                const updatedActivity = {
                    ...currentItem,
                    ...values
                };
                // Cập nhật Firebase
                await set(ref(database, `activitiesData/${currentItem.id}`), updatedActivity);
                // Cập nhật state trực tiếp
                setActivitiesData(prev =>
                    prev.map(item => item.id === currentItem.id ? updatedActivity : item)
                );
            }
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

            if (modalMode === 'add') {
                // Thêm ID mới cho slide
                const newSlide = {
                    ...values,
                    id: generateId()
                };
                // Cập nhật Firebase
                await set(ref(database, `slides/${newSlide.id}`), newSlide);
                // Cập nhật state trực tiếp
                setSlidesData(prev => [...prev, newSlide]);
            } else {
                // Cập nhật slide hiện tại
                const updatedSlide = {
                    ...currentItem,
                    ...values
                };
                // Cập nhật Firebase
                await set(ref(database, `slides/${currentItem.id}`), updatedSlide);
                // Cập nhật state trực tiếp
                setSlidesData(prev =>
                    prev.map(item => item.id === currentItem.id ? updatedSlide : item)
                );
            }
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
                // Xóa từ Firebase
                await remove(ref(database, `activitiesData/${id}`));
                // Cập nhật state trực tiếp
                setActivitiesData(prev => prev.filter(item => item.id !== id));
            } else {
                // Xóa từ Firebase
                await remove(ref(database, `slides/${id}`));
                // Cập nhật state trực tiếp
                setSlidesData(prev => prev.filter(item => item.id !== id));
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const modalStyles = {
        content: {
            background: '#141414',
            padding: '16px',
            borderRadius: '8px',
            maxHeight: '90vh',
        },
        header: {
            background: '#1f1f1f',
            borderBottom: '1px solid #303030',
            padding: '12px 16px',
            marginBottom: 0,
        },
        body: {
            background: '#141414',
            padding: '16px',
            maxHeight: 'calc(90vh - 110px)', // Account for header and padding
            overflowY: 'auto',
        },
        mask: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        footer: {
            padding: '12px 16px',
            marginTop: 0,
        }
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
        <Layout style={{
            padding: { xs: '12px', sm: '24px' },
            background: '#0a0a0a',
            minHeight: 'calc(100vh - 64px)'
        }}>
            <Card style={{
                background: '#141414',
                borderColor: '#303030',
                marginBottom: '24px',
                padding: { xs: '12px', sm: '24px' }
            }}>
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

            <Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
                <Col span={24}>
                    <Card
                        title={<span style={{ color: '#fff' }}>Hoạt động</span>}
                        extra={
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => showActivityModal('add')}
                                size={window.innerWidth < 576 ? 'small' : 'middle'}
                            >
                                Thêm hoạt động
                            </Button>
                        }
                        style={{ background: '#141414', borderColor: '#303030' }}
                    >
                        <Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
                            {activitiesData.map(activity => (
                                <Col xs={24} sm={12} md={8} lg={6} key={activity.id}>
                                    <Card
                                        hoverable
                                        cover={<img alt={activity.time} src={activity.img} style={{
                                            height: { xs: '150px', sm: '200px' },
                                            objectFit: 'cover'
                                        }} />}
                                        actions={[
                                            <EditOutlined key="edit" onClick={() => showActivityModal('edit', activity)} />,
                                            <DeleteOutlined key="delete" onClick={() => handleDelete('activity', activity.id)} />
                                        ]}
                                        style={{
                                            background: '#1f1f1f',
                                            borderColor: '#303030',
                                            height: { xs: '300px', sm: '380px' }
                                        }}
                                    >
                                        <Meta
                                            title={<Text style={{
                                                color: '#fff',
                                                fontSize: { xs: '14px', sm: '16px' }
                                            }}>{activity.description}</Text>}
                                            description={
                                                <Text style={{
                                                    color: '#999',
                                                    fontSize: { xs: '12px', sm: '14px' },
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>
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
                        title={<span style={{ color: '#fff' }}>Slides</span>}
                        extra={
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => showSlideModal('add')}
                                size={window.innerWidth < 576 ? 'small' : 'middle'}
                            >
                                Thêm slide
                            </Button>
                        }
                        style={{ background: '#141414', borderColor: '#303030' }}
                    >
                        <Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
                            {slidesData.map(slide => (
                                <Col xs={24} sm={12} md={8} lg={6} key={slide.id}>
                                    <Card
                                        hoverable
                                        cover={<img alt={slide.alt} src={slide.src} style={{
                                            height: '200px',
                                            width: '100%',
                                            objectFit: 'cover'
                                        }} />}
                                        actions={[
                                            <EditOutlined key="edit" onClick={() => showSlideModal('edit', slide)} />,
                                            <DeleteOutlined key="delete" onClick={() => handleDelete('slide', slide.id)} />
                                        ]}
                                        style={{
                                            background: '#1f1f1f',
                                            borderColor: '#303030',
                                            height: '380px',
                                            width: '100%'
                                        }}
                                        bodyStyle={{
                                            height: '130px',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <Meta
                                            title={<Text style={{
                                                color: '#fff',
                                                fontSize: '16px',
                                                marginBottom: '8px',
                                                display: 'block'
                                            }}>{slide.description}</Text>}
                                            description={
                                                <Text style={{
                                                    color: '#999',
                                                    fontSize: '14px',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>
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
                title={<span style={{ color: '#fff' }}>{`${modalMode === 'add' ? 'Thêm' : 'Sửa'} hoạt động`}</span>}
                open={isActivityModalVisible}
                onCancel={handleModalCancel}
                footer={null}
                styles={modalStyles}
                maskStyle={modalStyles.mask}
                bodyStyle={{ maxHeight: 'calc(90vh - 110px)', overflowY: 'auto' }}
                centered
                destroyOnClose
            >
                <ActivityModalForm
                    initialData={currentItem}
                    onSubmit={handleActivitySubmit}
                    mode={modalMode}
                />
            </Modal>

            <Modal
                title={<span style={{ color: '#fff' }}>{`${modalMode === 'add' ? 'Thêm' : 'Sửa'} slide`}</span>}
                open={isSlideModalVisible}
                onCancel={handleModalCancel}
                footer={null}
                styles={modalStyles}
                maskStyle={modalStyles.mask}
                bodyStyle={{ maxHeight: 'calc(90vh - 110px)', overflowY: 'auto' }}
                centered
                destroyOnClose
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
