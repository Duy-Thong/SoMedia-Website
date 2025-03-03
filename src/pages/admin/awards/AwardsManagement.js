import React, { useState, useEffect } from 'react';
import { Layout, Typography, Card, Table, Button, Space, Modal, Form, Input, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, DashboardOutlined } from '@ant-design/icons';
import { database, dbRef, dbSet, dbGet, dbRemove, dbUpdate } from '../../../firebase/config';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text } = Typography;

const AwardsManagement = () => {
    const [awards, setAwards] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchAwards();
    }, []);

    const fetchAwards = async () => {
        try {
            const prizesRef = dbRef(database, 'Prizes');
            const snapshot = await dbGet(prizesRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                const awardsArray = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                setAwards(awardsArray);
            }
        } catch (error) {
            message.error('Lỗi khi tải dữ liệu giải thưởng');
        }
    };

    const navigate = useNavigate();

    const handleReturnToDashboard = () => {
        navigate('/admin/dashboard');
    };

    const columns = [
        {
            title: 'Tên giải thưởng',
            dataIndex: 'jobtitle',
            key: 'jobtitle',
            render: text => <Text style={{ color: '#d9d9d9' }}>{text}</Text>
        },
        {
            title: 'Nơi nhận',
            dataIndex: 'where',
            key: 'where',
            render: text => <Text style={{ color: '#d9d9d9' }}>{text}</Text>
        },
        {
            title: 'Thời gian',
            dataIndex: 'date',
            key: 'date',
            render: text => <Text style={{ color: '#d9d9d9' }}>{text}</Text>
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        style={{ background: '#1f1f1f', borderColor: '#303030', color: '#d9d9d9' }}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleDelete(record.id)}
                        style={{ borderColor: '#303030' }}
                    />
                </Space>
            ),
        },
    ];

    const handleAdd = () => {
        setEditingId(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingId(record.id);
        form.setFieldsValue({
            ...record
        });
        setIsModalVisible(true);
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: <span style={{ color: '#fff' }}>Xác nhận xóa</span>,
            content: <span style={{ color: '#d9d9d9' }}>Bạn có chắc chắn muốn xóa giải thưởng này?</span>,
            onOk: async () => {
                try {
                    const prizeRef = dbRef(database, `Prizes/${id}`);
                    await dbRemove(prizeRef);
                    await fetchAwards();
                    message.success('Xóa giải thưởng thành công');
                } catch (error) {
                    message.error('Lỗi khi xóa giải thưởng');
                }
            },
            okButtonProps: {
                danger: true
            },
            cancelButtonProps: {
                style: { background: '#141414', borderColor: '#303030', color: '#d9d9d9' }
            },
            styles: {
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
                body: {
                    background: '#141414',
                    padding: '24px',
                },
                mask: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                }
            },
            className: 'dark-modal'
        });
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingId) {
                const prizeRef = dbRef(database, `Prizes/${editingId}`);
                await dbUpdate(prizeRef, values);
                message.success('Cập nhật giải thưởng thành công');
            } else {
                const prizesRef = dbRef(database, 'Prizes');
                const newPrizeRef = dbRef(database, `Prizes/${Date.now()}`);
                await dbSet(newPrizeRef, values);
                message.success('Thêm giải thưởng thành công');
            }
            setIsModalVisible(false);
            fetchAwards();
        } catch (error) {
            message.error('Lỗi khi lưu giải thưởng');
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
        body: {
            background: '#141414',
            padding: '24px',
        },
        mask: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        title: {
            color: '#ffffff'
        }
    };

    useEffect(() => {
        // Insert the styles into the document
        const styleElement = document.createElement('style');
        styleElement.innerHTML = tableStyles;
        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    return (
        <Layout style={{ padding: '24px', background: '#0a0a0a', minHeight: 'calc(100vh - 64px)' }}>
            <Card style={{ background: '#141414', borderColor: '#303030', marginBottom: '24px' }}>
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <Title level={2} style={{ color: '#fff', margin: '0 0 16px 0' }}>
                        Quản lý giải thưởng
                    </Title>
                    <p style={{ color: '#d9d9d9' }}>
                        Thêm, sửa và xóa các giải thưởng của tổ chức.
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
                style={{ background: '#141414', borderColor: '#303030' }}
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                        style={{ marginBottom: 16 }}
                    >
                        Thêm giải thưởng
                    </Button>
                }
            >
                <Table
                    columns={columns}
                    dataSource={awards}
                    rowKey="id"
                    style={{
                        background: '#141414',
                        color: '#fff'
                    }}
                    pagination={{
                        style: { color: '#d9d9d9' }
                    }}
                    className="dark-table"
                />
            </Card>

            <Modal
                title={<span style={{ color: '#fff' }}>{editingId ? "Sửa giải thưởng" : "Thêm giải thưởng"}</span>}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
                width={600}
                maskClosable={false}
                destroyOnClose
                footer={[
                    <Button
                        key="back"
                        onClick={() => setIsModalVisible(false)}
                        style={{ background: '#141414', borderColor: '#303030', color: '#d9d9d9' }}
                    >
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleModalOk}>
                        {editingId ? "Cập nhật" : "Thêm mới"}
                    </Button>,
                ]}
                styles={modalStyles}
                maskStyle={modalStyles.mask}
            >
                <Form
                    form={form}
                    layout="vertical"
                    requiredMark="optional"
                    style={{
                        maxWidth: '100%',
                        padding: '20px',
                        backgroundColor: '#1f1f1f',
                        borderRadius: '6px',
                    }}
                >
                    <Form.Item
                        name="jobtitle"
                        label={<span style={{ color: '#d9d9d9' }}>Tên giải thưởng</span>}
                        rules={[
                            { required: true, message: 'Vui lòng nhập tên giải thưởng!' },
                            { max: 200, message: 'Tên giải thưởng không được vượt quá 200 ký tự!' }
                        ]}
                    >
                        <Input.TextArea
                            autoSize={{ minRows: 2, maxRows: 4 }}
                            placeholder="Nhập tên giải thưởng"
                            style={{
                                background: '#141414',
                                borderColor: '#303030',
                                color: '#d9d9d9',
                            }}
                            className="dark-input"
                        />
                    </Form.Item>
                    <Form.Item
                        name="where"
                        label={<span style={{ color: '#d9d9d9' }}>Nơi nhận</span>}
                        rules={[
                            { required: true, message: 'Vui lòng nhập nơi nhận!' },
                            { max: 100, message: 'Nơi nhận không được vượt quá 100 ký tự!' }
                        ]}
                    >
                        <Input
                            placeholder="Nhập nơi nhận giải thưởng"
                            style={{
                                background: '#141414',
                                borderColor: '#303030',
                                color: '#d9d9d9',
                            }}
                            className="dark-input"
                        />
                    </Form.Item>
                    <Form.Item
                        name="date"
                        label={<span style={{ color: '#d9d9d9' }}>Thời gian</span>}
                        rules={[
                            { required: true, message: 'Vui lòng nhập thời gian!' },
                            { max: 50, message: 'Thời gian không được vượt quá 50 ký tự!' }
                        ]}
                        extra={<Text style={{ color: '#666' }}>Ví dụ: 2022-2023 hoặc 2023</Text>}
                    >
                        <Input
                            placeholder="Nhập thời gian nhận giải thưởng"
                            style={{
                                background: '#141414',
                                borderColor: '#303030',
                                color: '#d9d9d9',
                            }}
                            className="dark-input"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

// Add this CSS either in your component or in a separate CSS file
const tableStyles = `
.dark-table .ant-table {
    background: #141414;
    color: #d9d9d9;
}

.dark-table .ant-table-thead > tr > th {
    background: #1f1f1f !important;
    color: #fff !important;
    border-bottom: 1px solid #303030;
}

.dark-table .ant-table-tbody > tr > td {
    border-bottom: 1px solid #303030;
    color: #d9d9d9;
}

.dark-table .ant-table-tbody > tr:hover > td {
    background: #1f1f1f !important;
}

.dark-table .ant-table-cell-row-hover {
    background: #1f1f1f !important;
}

.dark-table .ant-pagination-item {
    background: #141414;
    border-color: #303030;
}

.dark-table .ant-pagination-item a {
    color: #d9d9d9;
}

.dark-table .ant-pagination-item-active {
    background: #1f1f1f;
    border-color: #1890ff;
}

.dark-table .ant-pagination-prev .ant-pagination-item-link,
.dark-table .ant-pagination-next .ant-pagination-item-link {
    background: #141414;
    border-color: #303030;
    color: #d9d9d9;
}

.dark-table .ant-empty-description {
    color: #d9d9d9;
}

.dark-input::placeholder {
    color: rgba(255, 255, 255, 0.3) !important;
}

.dark-input::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.3) !important;
}

.dark-input:-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.3) !important;
}

.dark-input::-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.3) !important;
}

.dark-modal .ant-modal-content {
    background: #141414 !important;
}

.dark-modal .ant-modal-header {
    background: #1f1f1f !important;
    border-bottom: 1px solid #303030 !important;
}

.dark-modal .ant-modal-body {
    background: #141414 !important;
}

.dark-modal .ant-modal-confirm-title {
    color: #fff !important;
}

.dark-modal .ant-modal-confirm-content {
    color: #d9d9d9 !important;
}
`;

export default AwardsManagement;
