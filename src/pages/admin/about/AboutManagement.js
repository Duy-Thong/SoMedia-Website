import React, { useState, useEffect } from 'react';
import { Layout, Typography, Form, Input, Button, Card, message, Spin, Tabs, Table, Space, Modal, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { getAboutData, updateAboutData, getDepartments, updateDepartment, addDepartment, deleteDepartment } from '../../../services/aboutService';

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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => showEditDepartmentModal(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDepartmentDelete(record)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Content style={{ padding: '24px', backgroundColor: '#1f1f1f', minHeight: '100vh' }}>
            <Title level={2} style={{ color: '#fff' }}>Quản lý trang giới thiệu</Title>

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
                <TabPane tab="Departments" key="2">
                    <Card
                        title={<Text style={{ color: '#fff' }}>Danh sách Departments</Text>}
                        style={{ backgroundColor: '#242424', borderColor: '#303030' }}
                        extra={
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={showAddDepartmentModal}
                            >
                                Thêm Department
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
                        title={<Text style={{ color: '#fff' }}>{editingDepartment ? "Edit Department" : "Add Department"}</Text>}
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
                    >
                        <Form
                            form={departmentForm}
                            layout="vertical"
                        >
                            <Form.Item
                                name="name"
                                label={<Text style={{ color: '#fff' }}>Department Name</Text>}
                                rules={[{ required: true, message: 'Please enter department name' }]}
                            >
                                <Input placeholder="Enter department name" style={{ backgroundColor: '#303030', color: '#fff', borderColor: '#434343' }} />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label={<Text style={{ color: '#fff' }}>Description</Text>}
                                rules={[{ required: true, message: 'Please enter description' }]}
                            >
                                <TextArea rows={4} placeholder="Enter department description" style={{ backgroundColor: '#303030', color: '#fff', borderColor: '#434343' }} />
                            </Form.Item>

                            <Form.Item
                                name="image"
                                label={<Text style={{ color: '#fff' }}>Main Image URL</Text>}
                                rules={[{ required: true, message: 'Please enter image URL' }]}
                            >
                                <Input
                                    placeholder="Enter image URL"
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
