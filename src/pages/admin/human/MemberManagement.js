import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Table, Button, Modal, Form, Input,
    message, Popconfirm, Upload
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import { ref, push, remove, update, get } from 'firebase/database';
import { db } from '../../../firebase/config';
import { uploadToBlob } from '../../../utils/uploadHelpers';

const MemberManagement = () => {
    const [members, setMembers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch members data
    useEffect(() => {
        const fetchMembers = async () => {
            const membersRef = ref(db, 'humans');
            const snapshot = await get(membersRef);
            if (snapshot.exists()) {
                const membersData = [];
                snapshot.forEach((childSnapshot) => {
                    membersData.push({
                        key: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                setMembers(membersData);
            }
        };
        fetchMembers();
    }, []);

    // Handle image upload
    const handleImageChange = (info) => {
        if (info.file) {
            setImageFile(info.file);
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(info.file);
        }
    };

    // Add/Edit member
    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            let imageUrl = values.image;

            // Upload image if a new file is selected
            if (imageFile) {
                imageUrl = await uploadToBlob(imageFile, 'humans');
            }

            const finalValues = {
                ...values,
                image: imageUrl
            };

            if (editingId) {
                await update(ref(db, `humans/${editingId}`), finalValues);
                // Cập nhật state members trực tiếp
                setMembers(members.map(member =>
                    member.key === editingId
                        ? { ...member, ...finalValues }
                        : member
                ));
                message.success('Cập nhật thành công');
            } else {
                const newRef = await push(ref(db, 'humans'), finalValues);
                // Thêm member mới vào state
                setMembers([...members, {
                    key: newRef.key,
                    ...finalValues
                }]);
                message.success('Thêm thành viên thành công');
            }

            setIsModalVisible(false);
            form.resetFields();
            setImageFile(null);
            setPreviewImage('');
            setCurrentImageUrl('');
        } catch (error) {
            message.error('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete member
    const handleDelete = async (key) => {
        try {
            await remove(ref(db, `humans/${key}`));
            // Cập nhật state trực tiếp
            setMembers(members.filter(member => member.key !== key));
            message.success('Xóa thành công');
        } catch (error) {
            message.error('Error deleting member');
        }
    };

    // Reset image state when modal is opened/closed
    const handleModalClose = () => {
        setIsModalVisible(false);
        setImageFile(null);
        setPreviewImage('');
        setCurrentImageUrl('');
        form.resetFields();
    };

    // Sửa lại cách xử lý khi ấn nút Edit
    const handleEdit = (record) => {
        setEditingId(record.key);
        form.setFieldsValue(record);
        setCurrentImageUrl(record.image);
        setPreviewImage('');
        setIsModalVisible(true);
    };

    // Table columns configuration
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Chi tiết',
            dataIndex: 'detail',
            key: 'detail',
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img src={image} alt="thành viên" style={{ width: 50 }} />,
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        style={{ marginRight: 8 }}
                    />
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa thành viên này?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Đồng ý"
                        cancelText="Hủy"
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div style={{
            padding: 24,
            backgroundColor: '#141414',
            minHeight: '100vh',
            color: '#fff'
        }}>
            <div className='flex items-center justify-between p-6'>
                <Link to="/admin/dashboard">
                    <Button
                        icon={<ArrowLeftOutlined />}
                        style={{
                            marginBottom: 16,
                            backgroundColor: '#1f1f1f',
                            color: '#fff',
                            borderColor: '#303030'
                        }}
                    >
                        Trở về Dashboard
                    </Button>
                </Link>

                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        setEditingId(null);
                        form.resetFields();
                        setIsModalVisible(true);
                    }}
                    style={{ marginBottom: 16 }}
                    className='p-20'
                >
                    Thêm thành viên
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={members}
                style={{
                    backgroundColor: '#1f1f1f',
                    color: '#fff'
                }}
                className="dark-table"
                scroll={{ x: true }}
                pagination={{
                    position: ['bottomCenter'],
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50', '100'],
                    defaultPageSize: 10,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} của ${total} mục`,
                }}
            />

            <style jsx global>{`
                .dark-table {
                    background: #1f1f1f;
                }
                .dark-table .ant-table {
                    background: #1f1f1f;
                    color: #fff;
                }
                .dark-table .ant-table-thead > tr > th {
                    background: #141414 !important;
                    color: #fff !important;
                    border-bottom: 1px solid #303030;
                }
                .dark-table .ant-table-tbody > tr > td {
                    background: #1f1f1f !important;
                    color: #fff !important;
                    border-bottom: 1px solid #303030;
                }
                .dark-table .ant-table-tbody > tr:hover > td {
                    background: #303030 !important;
                }
                .dark-table .ant-pagination-item {
                    background: #1f1f1f;
                    border-color: #303030;
                }
                .dark-table .ant-pagination-item a {
                    color: #fff;
                }
                .dark-table .ant-pagination-item-active {
                    border-color: #1890ff;
                }
                .dark-table .ant-pagination-prev button,
                .dark-table .ant-pagination-next button {
                    background: #1f1f1f;
                    color: #fff;
                }
                .dark-modal .ant-modal-content {
                    background-color: #1f1f1f;
                }
                .dark-modal .ant-modal-header {
                    background-color: #1f1f1f;
                    border-bottom: 1px solid #303030;
                }
                .dark-modal .ant-modal-title {
                    color: #fff !important;
                }
                .dark-modal .ant-modal-close {
                    color: #fff;
                }
                .dark-modal .ant-modal-close:hover {
                    color: #1890ff;
                }
                .dark-modal .ant-modal-body {
                    background-color: #1f1f1f;
                }
                .dark-modal .ant-form-item-label > label {
                    color: #fff;
                }
                .dark-modal .ant-input,
                .dark-modal .ant-input-textarea {
                    background-color: #141414;
                    border-color: #303030;
                    color: #fff;
                }
                .dark-modal .ant-input:hover,
                .dark-modal .ant-input:focus,
                .dark-modal .ant-input-textarea:hover,
                .dark-modal .ant-input-textarea:focus {
                    border-color: #1890ff;
                }
                .dark-modal .ant-btn {
                    border-color: #303030;
                }
                .dark-table .ant-select-selector {
                    background-color: #1f1f1f !important;
                    color: #fff !important;
                    border-color: #303030 !important;
                }
                .dark-table .ant-select-arrow {
                    color: #fff;
                }
                .dark-table .ant-select-dropdown {
                    background-color: #1f1f1f !important;
                    border: 1px solid #303030;
                }
                .dark-table .ant-select-item {
                    color: #fff !important;
                }
                .dark-table .ant-select-item-option-selected {
                    background-color: #141414 !important;
                }
                .dark-table .ant-select-item-option-active {
                    background-color: #303030 !important;
                }
                .dark-table .ant-pagination-total-text {
                    color: #fff;
                }
            `}</style>

            <Modal
                title={editingId ? 'Sửa thành viên' : 'Thêm thành viên'} 
            open={isModalVisible}
            onCancel={handleModalClose}
            footer={null}
            className="dark-modal"
            >
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
                theme="dark"
            >
                <Form.Item
                    name="name"
                    label="Tên"
                    rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="detail"
                    label="Chi tiết"
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Hình ảnh"
                    rules={[{ required: true, message: 'Vui lòng chọn hình ảnh!' }]}
                >
                    <div>
                        <Input
                            style={{ marginBottom: '10px' }}
                            placeholder="URL hình ảnh hoặc tải lên"
                            value={currentImageUrl}
                            onChange={(e) => setCurrentImageUrl(e.target.value)}
                        />
                        <Upload
                            beforeUpload={(file) => {
                                handleImageChange({ file });
                                return false;
                            }}
                            showUploadList={false}
                        >
                            <Button
                                icon={<UploadOutlined />}
                                style={{
                                    backgroundColor: '#1f1f1f',
                                    color: '#fff',
                                    borderColor: '#303030'
                                }}
                            >
                                Tải ảnh lên
                            </Button>
                        </Upload>
                        {(previewImage || currentImageUrl) && (
                            <div style={{ marginTop: '10px' }}>
                                <img
                                    src={previewImage || currentImageUrl}
                                    alt="Preview"
                                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                                />
                            </div>
                        )}
                    </div>
                </Form.Item>

                <Form.Item style={{ marginTop: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        disabled={loading}
                    >
                        {editingId ? 'Cập nhật' : 'Thêm'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
        </div >
    );
};

export default MemberManagement;
