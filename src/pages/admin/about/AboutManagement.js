import React, { useState, useEffect } from 'react';
import { Layout, Typography, Form, Input, Button, Card, message, Spin, Tabs, Table, Space, Modal, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { getAboutData, updateAboutData, getDepartments, updateDepartment, addDepartment, deleteDepartment } from '../../../services/aboutService';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

const AboutManagement = () => {
    const [form] = Form.useForm();
    const [departmentForm] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [departmentsLoading, setDepartmentsLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        loadAboutData();
        loadDepartments();
    }, []);

    const loadAboutData = async () => {
        try {
            setLoading(true);
            const data = await getAboutData();
            if (data) {
                form.setFieldsValue({
                    title: data.title,
                    aboutme: data.aboutme,
                    goals: data.goals
                });
            }
        } catch (error) {
            message.error('Failed to load about data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const loadDepartments = async () => {
        try {
            setDepartmentsLoading(true);
            const data = await getDepartments();
            if (data) {
                // Add key property for table
                const departmentsWithKeys = data.map((dept, index) => ({
                    ...dept,
                    key: index.toString()
                }));
                setDepartments(departmentsWithKeys);
            }
        } catch (error) {
            message.error('Failed to load departments');
            console.error(error);
        } finally {
            setDepartmentsLoading(false);
        }
    };

    const onFinish = async (values) => {
        try {
            setSaving(true);
            await updateAboutData(values);
            message.success('About information updated successfully');
        } catch (error) {
            message.error('Failed to update about information');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleMainImageChange = (e) => {
        setImageUrl(e.target.value);
    };

    const showAddDepartmentModal = () => {
        setEditingDepartment(null);
        setImageUrl('');
        departmentForm.resetFields();
        setIsModalVisible(true);
    };

    const showEditDepartmentModal = (department) => {
        setEditingDepartment(department);
        setImageUrl(department.image || '');
        departmentForm.setFieldsValue({
            name: department.name,
            description: department.description,
            image: department.image || '',
        });
        setIsModalVisible(true);
    };

    const handleDepartmentDelete = async (department) => {
        try {
            await deleteDepartment(department.key);
            message.success('Department deleted successfully');
            loadDepartments();
        } catch (error) {
            message.error('Failed to delete department');
            console.error(error);
        }
    };

    const handleDepartmentSave = async () => {
        try {
            const values = await departmentForm.validateFields();
            values.image = imageUrl || values.image;

            if (editingDepartment) {
                await updateDepartment(editingDepartment.key, values);
                message.success('Department updated successfully');
            } else {
                await addDepartment(values);
                message.success('Department added successfully');
            }

            setIsModalVisible(false);
            loadDepartments();
        } catch (error) {
            message.error('Failed to save department');
            console.error(error);
        }
    };


    const departmentColumns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => showEditDepartmentModal(record)}
                    >
                        Sửa
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDepartmentDelete(record)}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Content style={{ padding: '24px', backgroundColor: '#1f1f1f', minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Title level={2} style={{ color: '#fff', margin: 0 }}>Quản lý trang giới thiệu</Title>
                <Button
                    type="primary"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate('/admin/dashboard')}
                >
                    Quay về Dashboard
                </Button>
            </div>

            <Tabs
                defaultActiveKey="1"
                style={{ color: '#fff' }}
                className="dark-tabs"
            >
                <TabPane tab="Thông tin chung" key="1">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '50px' }}>
                            <Spin size="large" />
                        </div>
                    ) : (
                        <Card style={{ backgroundColor: '#242424', borderColor: '#303030' }}>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="title"
                                    label={<Text style={{ color: '#fff' }}>Tiêu đề</Text>}
                                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                                >
                                    <Input
                                        placeholder="Nhập tiêu đề"
                                        style={{ backgroundColor: '#303030', color: '#fff', borderColor: '#434343' }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="aboutme"
                                    label={<Text style={{ color: '#fff' }}>Giới thiệu</Text>}
                                    rules={[{ required: true, message: 'Vui lòng nhập nội dung giới thiệu' }]}
                                >
                                    <TextArea
                                        rows={6}
                                        placeholder="Nhập nội dung giới thiệu về So Media"
                                        style={{ backgroundColor: '#303030', color: '#fff', borderColor: '#434343' }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="goals"
                                    label={<Text style={{ color: '#fff' }}>Mục tiêu</Text>}
                                    rules={[{ required: true, message: 'Vui lòng nhập mục tiêu' }]}
                                >
                                    <TextArea
                                        rows={6}
                                        placeholder="Nhập mục tiêu của So Media"
                                        style={{ backgroundColor: '#303030', color: '#fff', borderColor: '#434343' }}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={saving}
                                    >
                                        Lưu thay đổi
                                    </Button>
                                    <Button
                                        style={{ marginLeft: 8, background: '#1f1f1f', borderColor: '#434343', color: '#fff' }}
                                        onClick={loadAboutData}
                                        disabled={loading}
                                    >
                                        Làm mới
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    )}
                </TabPane>
                <TabPane tab="Phòng ban" key="2">
                    <Card
                        title={<Text style={{ color: '#fff' }}>Danh sách phòng ban</Text>}
                        style={{ backgroundColor: '#242424', borderColor: '#303030' }}
                        extra={
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={showAddDepartmentModal}
                            >
                                Thêm phòng ban
                            </Button>
                        }
                    >
                        <Table
                            columns={departmentColumns}
                            dataSource={departments}
                            loading={departmentsLoading}
                            rowKey="key"
                            style={{ backgroundColor: '#242424' }}
                            className="dark-table"
                        />
                    </Card>

                    <Modal
                        title={<Text style={{ color: '#fff' }}>{editingDepartment ? "Sửa phòng ban" : "Thêm phòng ban"}</Text>}
                        visible={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        footer={[
                            <Button key="back" style={{ background: '#1f1f1f', borderColor: '#434343', color: '#fff' }} onClick={() => setIsModalVisible(false)}>
                                Cancel
                            </Button>,
                            <Button key="submit" type="primary" onClick={handleDepartmentSave}>
                                Save
                            </Button>,
                        ]}
                        bodyStyle={{ backgroundColor: '#242424', borderColor: '#303030' }}
                        style={{ backgroundColor: '#242424' }}
                        className="dark-modal"
                        width={600}
                        maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                        modalRender={modal => (
                            <div style={{ backgroundColor: '#242424', borderRadius: '8px' }}>
                                {modal}
                            </div>
                        )}
                    >
                        <Form
                            form={departmentForm}
                            layout="vertical"
                        >
                            <Form.Item
                                name="name"
                                label={<Text style={{ color: '#fff' }}>Tên phòng ban</Text>}
                                rules={[{ required: true, message: 'Vui lòng nhập tên phòng ban' }]}
                            >
                                <Input placeholder="Nhập tên phòng ban" style={{ backgroundColor: '#303030', color: '#fff', borderColor: '#434343' }} />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label={<Text style={{ color: '#fff' }}>Mô tả</Text>}
                                rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                            >
                                <TextArea rows={4} placeholder="Nhập mô tả phòng ban" style={{ backgroundColor: '#303030', color: '#fff', borderColor: '#434343' }} />
                            </Form.Item>

                            <Form.Item
                                name="image"
                                label={<Text style={{ color: '#fff' }}>URL Hình ảnh</Text>}
                                rules={[{ required: true, message: 'Vui lòng nhập URL hình ảnh' }]}
                            >
                                <Input
                                    placeholder="Nhập URL hình ảnh"
                                    style={{ backgroundColor: '#303030', color: '#fff', borderColor: '#434343' }}
                                    value={imageUrl}
                                    onChange={handleMainImageChange}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                </TabPane>
            </Tabs>
        </Content>
    );
};

export default AboutManagement;
