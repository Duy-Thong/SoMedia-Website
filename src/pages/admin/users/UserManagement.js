import React, { useState, useEffect } from 'react';
import {
    database, dbRef, dbGet, dbSet, dbRemove, dbUpdate,
    auth, createUserWithEmailAndPassword
} from '../../../firebase/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Table, Input, Button, Space, Modal, Form,
    Select, Card, Tag, Typography, Popconfirm, ConfigProvider, theme
} from 'antd';
import {
    SearchOutlined, EditOutlined, DeleteOutlined,
    UserAddOutlined, SaveOutlined, UserOutlined
} from '@ant-design/icons';
import 'antd/dist/reset.css'; // Import Ant Design styles

const { Title } = Typography;
const { Option } = Select;
const { darkAlgorithm } = theme;

// Định nghĩa theme tối cho ứng dụng
const darkTheme = {
    token: {
        colorPrimary: '#1890ff',
        colorBgContainer: '#121212',
        colorBgElevated: '#1f1f1f',
        colorText: '#ffffff',
        colorBorder: '#303030',
        borderRadius: 6,
    },
    algorithm: darkAlgorithm,
    components: {
        Table: {
            colorBgContainer: '#1f1f1f',
            headerBg: '#121212',
        },
        Card: {
            colorBgContainer: '#1f1f1f',
        },
        Button: {
            defaultBg: '#2a2a2a',
            defaultColor: '#ffffff',
        },
        Modal: {
            contentBg: '#1f1f1f',
            headerBg: '#1f1f1f',
            titleColor: '#ffffff',
        },
        Select: {
            optionSelectedBg: '#177ddc',
        },
    },
};

// Tùy chỉnh style chung
const styles = {
    pageContainer: {
        padding: '24px',
        backgroundColor: '#121212',
        minHeight: '100vh',
        color: '#ffffff'
    },
    cardStyle: {
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        marginBottom: '24px',
    },
    tableCard: {
        backgroundColor: '#1f1f1f',
        border: '1px solid #303030',
        borderRadius: '8px',
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: '24px',
        fontWeight: 'bold',
        margin: '0 0 16px 0'
    },
    searchInput: {
        width: '100%',
        maxWidth: '400px',
        marginBottom: '16px',
        backgroundColor: '#2a2a2a',
        borderColor: '#303030',
    },
    addButton: {
        background: '#177ddc',
        borderColor: '#177ddc',
        boxShadow: '0 2px 0 rgba(0, 0, 0, 0.045)',
    },
    editButton: {
        backgroundColor: '#177ddc',
        borderColor: '#177ddc',
    },
    deleteButton: {
        backgroundColor: '#ff4d4f',
        borderColor: '#ff4d4f',
        color: '#ffffff',
    },
    formLabel: {
        color: '#ffffff'
    }
};

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [form] = Form.useForm();
    const [addUserForm] = Form.useForm();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const usersRef = dbRef(database, 'users');
            const snapshot = await dbGet(usersRef);

            if (snapshot.exists()) {
                const usersData = snapshot.val();
                const usersArray = Object.keys(usersData).map(key => ({
                    key: key, // Use key for Table component
                    id: key,
                    ...usersData[key]
                }));
                setUsers(usersArray);
            } else {
                setUsers([]);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Không thể tải danh sách người dùng");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await dbRemove(dbRef(database, `users/${userId}`));
            toast.success("Xóa người dùng thành công");
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Không thể xóa người dùng");
        }
    };

    const showEditModal = (user) => {
        setEditingUser(user);
        form.setFieldsValue({
            username: user.username,
            role: user.role
        });
        setIsModalVisible(true);
    };

    const handleEditCancel = () => {
        setIsModalVisible(false);
        setEditingUser(null);
    };

    const handleEditOk = async () => {
        try {
            const values = await form.validateFields();

            const updates = {
                username: values.username,
                role: values.role
            };

            await dbUpdate(dbRef(database, `users/${editingUser.id}`), updates);

            setUsers(users.map(user =>
                user.id === editingUser.id ? { ...user, ...updates } : user
            ));

            toast.success("Cập nhật người dùng thành công");
            setIsModalVisible(false);
            setEditingUser(null);
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Không thể cập nhật người dùng");
        }
    };

    const showAddUserModal = () => {
        addUserForm.resetFields();
        setIsAddUserModalVisible(true);
    };

    const handleAddUserCancel = () => {
        setIsAddUserModalVisible(false);
    };

    const handleAddUserOk = async () => {
        try {
            const values = await addUserForm.validateFields();

            // First create the user auth account
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );

            const userId = userCredential.user.uid;

            // Then save the user data to the database
            const userData = {
                username: values.username,
                email: values.email,
                role: values.role,
                createdAt: new Date().toISOString()
            };

            await dbSet(dbRef(database, `users/${userId}`), userData);

            const newUser = { key: userId, id: userId, ...userData };
            setUsers([...users, newUser]);

            toast.success("Thêm người dùng thành công");
            setIsAddUserModalVisible(false);
            addUserForm.resetFields();
        } catch (error) {
            console.error("Error adding user:", error);
            toast.error(error.message || "Không thể thêm người dùng");
        }
    };

    // Define table columns
    const columns = [
        {
            title: 'Tên người dùng',
            dataIndex: 'username',
            key: 'username',
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return (
                    String(record.username).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.email).toLowerCase().includes(value.toLowerCase())
                );
            },
            sorter: (a, b) => a.username.localeCompare(b.username),
            render: (text) => <span style={{ color: '#ffffff' }}>{text}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            render: (text) => <span style={{ color: '#ffffff' }}>{text}</span>,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => <span style={{ color: '#ffffff' }}>{new Date(text).toLocaleDateString()}</span>,
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            render: (role) => {
                let color = '#177ddc'; // blue for user
                let displayText = 'Người dùng';

                if (role === 'admin') {
                    color = '#ff4d4f'; // red for admin
                    displayText = 'Quản trị viên';
                } else if (role === 'moderator') {
                    color = '#52c41a'; // green for moderator
                    displayText = 'Điều hành viên';
                }

                return <Tag color={color} style={{ borderRadius: '4px' }}>{displayText}</Tag>;
            },
            filters: [
                { text: 'Quản trị viên', value: 'admin' },
                { text: 'Điều hành viên', value: 'moderator' },
                { text: 'Người dùng', value: 'user' },
            ],
            onFilter: (value, record) => record.role === value,
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => showEditModal(record)}
                        style={styles.editButton}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa người dùng này?"
                        onConfirm={() => handleDeleteUser(record.id)}
                        okText="Có"
                        cancelText="Không"
                        okButtonProps={{ style: { backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' } }}
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            style={styles.deleteButton}
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <ConfigProvider theme={darkTheme}>
            <div style={styles.pageContainer}>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    theme="dark"
                />

                <Card
                    style={{ ...styles.cardStyle, ...styles.tableCard }}
                    bordered={false}
                >
                    <Space direction="vertical" style={{ width: '100%' }} size="large">
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px'
                        }}>
                            <Title level={2} style={styles.headerTitle}>
                                Quản lý Người Dùng
                            </Title>
                            <Button
                                type="primary"
                                icon={<UserAddOutlined />}
                                onClick={showAddUserModal}
                                style={styles.addButton}
                                size="large"
                            >
                                Thêm Người Dùng Mới
                            </Button>
                        </div>

                        <Input
                            placeholder="Tìm kiếm theo tên hoặc email"
                            prefix={<SearchOutlined style={{ color: '#8c8c8c' }} />}
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                            style={styles.searchInput}
                            allowClear
                        />

                        <Table
                            columns={columns}
                            dataSource={users}
                            loading={loading}
                            pagination={{
                                pageSize: 10,
                                showSizeChanger: true,
                                showTotal: (total) => `Tổng cộng ${total} người dùng`
                            }}
                            rowKey="id"
                            style={{ backgroundColor: '#1f1f1f' }}
                        />
                    </Space>
                </Card>

                {/* Edit User Modal */}
                <Modal
                    title={<span style={{ color: '#ffffff' }}>Chỉnh Sửa Người Dùng</span>}
                    open={isModalVisible}
                    onCancel={handleEditCancel}
                    footer={[
                        <Button key="cancel" onClick={handleEditCancel}>
                            Hủy
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            icon={<SaveOutlined />}
                            onClick={handleEditOk}
                            style={styles.editButton}
                        >
                            Lưu Thay Đổi
                        </Button>
                    ]}
                    bodyStyle={{ paddingTop: '12px' }}
                >
                    <Form
                        form={form}
                        layout="vertical"
                    >
                        <Form.Item
                            name="username"
                            label={<span style={styles.formLabel}>Tên người dùng</span>}
                            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
                        >
                            <Input prefix={<UserOutlined />} />
                        </Form.Item>
                        {editingUser && (
                            <Form.Item label={<span style={styles.formLabel}>Email</span>}>
                                <Input value={editingUser.email} disabled />
                            </Form.Item>
                        )}
                        <Form.Item
                            name="role"
                            label={<span style={styles.formLabel}>Vai trò</span>}
                            rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
                        >
                            <Select>
                                <Option value="user">Người dùng</Option>
                                <Option value="admin">Quản trị viên</Option>
                                <Option value="moderator">Điều hành viên</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Add User Modal */}
                <Modal
                    title={<span style={{ color: '#ffffff' }}>Thêm Người Dùng Mới</span>}
                    open={isAddUserModalVisible}
                    onCancel={handleAddUserCancel}
                    footer={[
                        <Button key="cancel" onClick={handleAddUserCancel}>
                            Hủy
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            icon={<UserAddOutlined />}
                            onClick={handleAddUserOk}
                            style={styles.addButton}
                        >
                            Thêm Người Dùng
                        </Button>
                    ]}
                    bodyStyle={{ paddingTop: '12px' }}
                >
                    <Form
                        form={addUserForm}
                        layout="vertical"
                    >
                        <Form.Item
                            name="username"
                            label={<span style={styles.formLabel}>Tên người dùng</span>}
                            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
                        >
                            <Input prefix={<UserOutlined />} />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label={<span style={styles.formLabel}>Email</span>}
                            rules={[
                                { required: true, message: 'Vui lòng nhập email' },
                                { type: 'email', message: 'Vui lòng nhập email hợp lệ' }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label={<span style={styles.formLabel}>Mật khẩu</span>}
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu' },
                                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="role"
                            label={<span style={styles.formLabel}>Vai trò</span>}
                            initialValue="user"
                        >
                            <Select>
                                <Option value="user">Người dùng</Option>
                                <Option value="admin">Quản trị viên</Option>
                                <Option value="moderator">Điều hành viên</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </ConfigProvider>
    );
};

export default UserManagement;
