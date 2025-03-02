import React from 'react';
import { Form, Input, Button, Card, message, Tabs } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { auth, database, dbRef, dbSet, dbGet } from '../../../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
    const navigate = useNavigate();

    const onLogin = async (values) => {
        try {
            // Authenticate the user
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);

            // Check if user has admin privileges
            const userSnapshot = await dbGet(dbRef(database, `users/${userCredential.user.uid}`));

            if (userSnapshot.exists()) {
                const userData = userSnapshot.val();
                if (userData.role === 'admin') {
                    message.success('Đăng nhập thành công');
                    navigate('/admin/dashboard');
                } else {
                    await signOut(auth);
                    message.error('Bạn không có quyền truy cập trang quản trị');
                }
            } else {
                await signOut(auth);
                message.error('Không tìm thấy thông tin người dùng');
            }
        } catch (error) {
            message.error('Email hoặc mật khẩu không chính xác');
        }
    };

    const onRegister = async (values) => {
        try {
            if (values.password !== values.confirmPassword) {
                message.error('Mật khẩu xác nhận không khớp');
                return;
            }

            // Create authentication user
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);

            // Store additional user data in the database
            // For testing purposes, directly assign admin role
            const userData = {
                username: values.username,
                email: values.email,
                role: 'admin', // Setting admin role directly for testing
                createdAt: new Date().toISOString()
            };

            await dbSet(dbRef(database, `users/${userCredential.user.uid}`), userData);

            message.success('Đăng ký thành công với quyền admin');
            navigate('/admin/dashboard');
        } catch (error) {
            message.error('Đăng ký thất bại: ' + error.message);
        }
    };

    const items = [
        {
            key: 'login',
            label: 'Đăng nhập',
            children: (
                <Form name="admin_login" onFinish={onLogin} autoComplete="off" layout="vertical">
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Vui lòng nhập email hợp lệ!',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block size="large">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
        {
            key: 'register',
            label: 'Đăng ký',
            children: (
                <Form name="admin_register" onFinish={onRegister} autoComplete="off" layout="vertical">
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên người dùng!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Tên người dùng" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Vui lòng nhập email hợp lệ!',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng xác nhận mật khẩu!',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" size="large" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block size="large">
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
    ];

    return (
        <div className="admin-login-container">
            <Card className="admin-login-box">
                <Tabs defaultActiveKey="login" items={items} centered className="admin-tabs" />
            </Card>
        </div>
    );
};

export default AdminLogin;