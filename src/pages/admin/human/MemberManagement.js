import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Table, Button, Modal, Form, Input,
    message, Popconfirm
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { ref, push, remove, update, get } from 'firebase/database';
import { db } from '../../../firebase/config';

const MemberManagement = () => {
    const [members, setMembers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState(null);

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

    // Add/Edit member
    const handleSubmit = async (values) => {
        try {
            if (editingId) {
                await update(ref(db, `humans/${editingId}`), values);
                message.success('Member updated successfully');
            } else {
                await push(ref(db, 'humans'), values);
                message.success('Member added successfully');
            }

            setIsModalVisible(false);
            form.resetFields();
            window.location.reload();
        } catch (error) {
            message.error('Error: ' + error.message);
        }
    };

    // Delete member
    const handleDelete = async (key) => {
        try {
            await remove(ref(db, `humans/${key}`));
            message.success('Member deleted successfully');
            window.location.reload();
        } catch (error) {
            message.error('Error deleting member');
        }
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
                        onClick={() => {
                            setEditingId(record.key);
                            form.setFieldsValue(record);
                            setIsModalVisible(true);
                        }}
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
                onCancel={() => setIsModalVisible(false)}
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
                        label="URL Hình ảnh"
                        rules={[{ required: true, message: 'Vui lòng nhập URL hình ảnh!' }]}
                    >
                        <Input placeholder="./assets/humans/example.jpg" />
                    </Form.Item>

                    <Form.Item style={{ marginTop: 16 }}>
                        <Button type="primary" htmlType="submit">
                            {editingId ? 'Cập nhật' : 'Thêm'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default MemberManagement;
