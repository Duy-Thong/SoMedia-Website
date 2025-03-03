import React, { useState, useEffect } from 'react';
import { Layout, Typography, Form, Input, Button, Card, message, Spin, Tabs, Table, Space, Modal, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { getAboutData, updateAboutData, getDepartments, updateDepartment, addDepartment, deleteDepartment } from '../../../services/aboutService';
import { uploadToBlob } from '../../../services/uploadService';
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
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
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
                const departmentsWithKeys = data.map(dept => ({
                    ...dept,
                    key: dept.id // Use Firebase ID as key
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

    const handleUpload = async (file) => {
        try {
            setUploading(true);
            const url = await uploadToBlob(file);
            setImageUrl(url);
            message.success('Upload thành công!');
            return url;
        } catch (error) {
            message.error('Upload thất bại.');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    const uploadProps = {
        beforeUpload: (file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                message.error('Chỉ có thể tải lên file hình ảnh!');
                return false;
            }
            handleUpload(file);
            return false;
        },
        maxCount: 1,
        listType: "picture-card",
        fileList: fileList,
        onChange: ({ fileList: newFileList }) => {
            setFileList(newFileList);
        },
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
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa phòng ban "${department.name}"?`,
            okText: 'Xóa',
            cancelText: 'Hủy',
            okType: 'danger',
            onOk: async () => {
                try {
                    await deleteDepartment(department.id);
                    message.success('Xóa phòng ban thành công');
                    // Refresh list after successful deletion
                    const updatedDepartments = departments.filter(dept => dept.id !== department.id);
                    setDepartments(updatedDepartments);
                } catch (error) {
                    console.error('Error deleting department:', error);
                    message.error('Không thể xóa phòng ban. Vui lòng thử lại.');
                }
            }
        });
    };

    const handleDepartmentSave = async () => {
        try {
            const values = await departmentForm.validateFields();
            values.image = imageUrl || values.image;

            if (editingDepartment) {
                await updateDepartment(editingDepartment.id, values); // Use id instead of key
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

                        open={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        footer={[
                            <Button
                                key="back"
                                style={{
                                    background: '#1f1f1f',
                                    borderColor: '#434343',
                                    color: '#fff',
                                    padding: '0 20px'
                                }}
                                onClick={() => setIsModalVisible(false)}
                            >
                                Hủy
                            </Button>,
                            <Button
                                key="submit"
                                type="primary"
                                onClick={handleDepartmentSave}
                                style={{
                                    padding: '0 20px'
                                }}
                            >
                                {editingDepartment ? "Cập nhật" : "Thêm mới"}
                            </Button>,
                        ]}
                        bodyStyle={{
                            backgroundColor: '#242424',
                            borderColor: '#303030',
                            padding: '24px',
                            maxHeight: 'calc(90vh - 130px)',  // Account for header and footer
                            overflowY: 'auto'  // Enable scrolling for modal content
                        }}
                        style={{
                            top: 50,  // Increased from 20 to 50 to show more content above
                            maxHeight: '90vh',  // Limit modal height
                            overflow: 'hidden'  // Prevent modal overflow
                        }}
                        className="dark-modal"
                        width={700}
                        maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                        modalRender={modal => (
                            <div style={{
                                backgroundColor: '#242424',
                                borderRadius: '8px',
                                maxHeight: '90vh'  // Consistent with modal max height
                            }}>
                                {modal}
                            </div>
                        )}
                    >
                        <Form
                            form={departmentForm}
                            layout="vertical"
                            style={{
                                overflow: 'visible',  // Allow form content to be fully visible
                                padding: '4px'  // Add slight padding to prevent content touching edges
                            }}
                        >
                            <Form.Item
                                name="name"
                                label={<Text style={{ color: '#fff', fontSize: '15px' }}>Tên phòng ban</Text>}
                                rules={[{ required: true, message: 'Vui lòng nhập tên phòng ban' }]}
                            >
                                <Input
                                    placeholder="Nhập tên phòng ban"
                                    style={{
                                        backgroundColor: '#303030',
                                        color: '#fff',
                                        borderColor: '#434343',
                                        padding: '8px 12px',
                                        height: '40px'
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label={<Text style={{ color: '#fff', fontSize: '15px' }}>Mô tả</Text>}
                                rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Nhập mô tả phòng ban"
                                    style={{
                                        backgroundColor: '#303030',
                                        color: '#fff',
                                        borderColor: '#434343',
                                        padding: '8px 12px'
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="image"
                                label={<Text style={{ color: '#fff', fontSize: '15px' }}>Hình ảnh</Text>}
                                rules={[{ required: true, message: 'Vui lòng tải lên hình ảnh' }]}
                            >
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px',
                                    backgroundColor: '#303030',
                                    padding: '20px',
                                    borderRadius: '6px',
                                    border: '1px dashed #434343'
                                }}>
                                    <Upload {...uploadProps}>
                                        <Button
                                            icon={<UploadOutlined />}
                                            loading={uploading}
                                            style={{
                                                width: '100%',
                                                height: '40px',
                                                backgroundColor: '#1f1f1f',
                                                borderColor: '#434343',
                                                color: '#fff'
                                            }}
                                        >
                                            Tải lên hình ảnh
                                        </Button>
                                    </Upload>
                                    {imageUrl && (
                                        <div style={{
                                            marginTop: '10px',
                                            textAlign: 'center',
                                            padding: '10px',
                                            backgroundColor: '#1f1f1f',
                                            borderRadius: '4px'
                                        }}>
                                            <img
                                                src={imageUrl}
                                                alt="Preview"
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: '200px',
                                                    objectFit: 'contain'
                                                }}
                                            />
                                        </div>
                                    )}
                                    <Input
                                        placeholder="URL hình ảnh"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        style={{
                                            backgroundColor: '#1f1f1f',
                                            color: '#fff',
                                            borderColor: '#434343',
                                            height: '40px',
                                            padding: '8px 12px'
                                        }}
                                    />
                                </div>
                            </Form.Item>
                        </Form>
                    </Modal>
                </TabPane>
            </Tabs>
        </Content>
    );
};

export default AboutManagement;
