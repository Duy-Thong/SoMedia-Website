import React, { useState, useEffect } from 'react';
import { Layout, Typography, Form, Input, Button, message, Card, Space, Modal } from 'antd';
import { ref, get, set } from 'firebase/database';
import { database } from '../../../firebase/config';
import {
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined,
    SaveOutlined,
    ApiOutlined,
    FileTextOutlined,
    FacebookOutlined,
    InstagramOutlined,
    YoutubeOutlined,
    GlobalOutlined
} from '@ant-design/icons';
import { SiTiktok, SiThreads } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

const ContactManagement = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [contactSnapshot, socialSnapshot] = await Promise.all([
                get(ref(database, 'contactConfig')),
                get(ref(database, 'socialprofils'))
            ]);

            const formData = {
                ...(contactSnapshot.exists() ? contactSnapshot.val() : {}),
                ...(socialSnapshot.exists() ? socialSnapshot.val() : {})
            };
            form.setFieldsValue(formData);
        } catch (error) {
            message.error('Lỗi khi tải dữ liệu');
            console.error(error);
        }
    };

    const onFinish = async (values) => {
        Modal.confirm({
            title: 'Xác nhận thay đổi',
            content: 'Bạn có chắc chắn muốn cập nhật thông tin?',
            onOk: async () => {
                setLoading(true);
                try {
                    const { facebook, instagram, threads, tiktok, youtube, ...contactData } = values;
                    await Promise.all([
                        set(ref(database, 'contactConfig'), contactData),
                        set(ref(database, 'socialprofils'), { facebook, instagram, threads, tiktok, youtube })
                    ]);
                    message.success('Cập nhật thông tin thành công');
                } catch (error) {
                    message.error('Lỗi khi cập nhật thông tin');
                    console.error(error);
                }
                setLoading(false);
            }
        });
    };

    const cardStyle = {
        backgroundColor: '#1f1f1f',
        border: '1px solid #303030',
        borderRadius: '8px',
    };

    const innerCardStyle = {
        backgroundColor: '#141414',
        border: 'none',
    };

    return (
        <Content style={{ padding: '24px', maxWidth: 1000, margin: '0 auto', backgroundColor: '#141414', minHeight: '100vh' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Title level={2} style={{ color: '#fff' }}>Quản lý thông tin liên hệ</Title>

                <Card style={cardStyle}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        style={{ color: '#fff' }}
                    >
                        <Card title={<span style={{ color: '#fff' }}>Thông tin cơ bản</span>}
                            className="inner-card"
                            style={innerCardStyle}
                            headStyle={{ backgroundColor: '#141414', borderBottom: '1px solid #303030' }}>
                            <Form.Item
                                name="YOUR_ADDRESS"
                                label={<Space><EnvironmentOutlined /> Địa chỉ</Space>}
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                            >
                                <TextArea rows={3} />
                            </Form.Item>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <Form.Item
                                    name="YOUR_EMAIL"
                                    label={<Space><MailOutlined /> Email</Space>}
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập email' },
                                        { type: 'email', message: 'Email không hợp lệ' }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="YOUR_FONE"
                                    label={<Space><PhoneOutlined /> Số điện thoại</Space>}
                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                        </Card>

                        <Card title={<span style={{ color: '#fff' }}>Cấu hình Email Service</span>}
                            className="inner-card"
                            style={{ ...innerCardStyle, marginTop: '16px' }}
                            headStyle={{ backgroundColor: '#141414', borderBottom: '1px solid #303030' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                                <Form.Item
                                    name="YOUR_SERVICE_ID"
                                    label={<Space><ApiOutlined /> Service ID</Space>}
                                    rules={[{ required: true, message: 'Vui lòng nhập Service ID' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="YOUR_TEMPLATE_ID"
                                    label={<Space><ApiOutlined /> Template ID</Space>}
                                    rules={[{ required: true, message: 'Vui lòng nhập Template ID' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="YOUR_USER_ID"
                                    label={<Space><ApiOutlined /> User ID</Space>}
                                    rules={[{ required: true, message: 'Vui lòng nhập User ID' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                        </Card>

                        <Card title={<span style={{ color: '#fff' }}>Mô tả</span>}
                            className="inner-card"
                            style={{ ...innerCardStyle, marginTop: '16px' }}
                            headStyle={{ backgroundColor: '#141414', borderBottom: '1px solid #303030' }}>
                            <Form.Item
                                name="description"
                                label={<Space><FileTextOutlined /> Nội dung mô tả</Space>}
                                rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                        </Card>

                        <Card title={<span style={{ color: '#fff' }}>Mạng xã hội</span>}
                            className="inner-card"
                            style={{ ...innerCardStyle, marginTop: '16px' }}
                            headStyle={{ backgroundColor: '#141414', borderBottom: '1px solid #303030' }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Form.Item
                                    name="facebook"
                                    label={<Space><FacebookOutlined /> Facebook</Space>}
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập đường dẫn Facebook' },
                                        { type: 'url', message: 'Đường dẫn không hợp lệ' }
                                    ]}
                                >
                                    <Input placeholder="https://facebook.com/..." />
                                </Form.Item>

                                <Form.Item
                                    name="instagram"
                                    label={<Space><InstagramOutlined /> Instagram</Space>}
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập đường dẫn Instagram' },
                                        { type: 'url', message: 'Đường dẫn không hợp lệ' }
                                    ]}
                                >
                                    <Input placeholder="https://instagram.com/..." />
                                </Form.Item>

                                <Form.Item
                                    name="threads"
                                    label={<Space><SiThreads /> Threads</Space>}
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập đường dẫn Threads' },
                                        { type: 'url', message: 'Đường dẫn không hợp lệ' }
                                    ]}
                                >
                                    <Input placeholder="https://threads.net/..." />
                                </Form.Item>

                                <Form.Item
                                    name="tiktok"
                                    label={<Space><SiTiktok /> TikTok</Space>}
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập đường dẫn TikTok' },
                                        { type: 'url', message: 'Đường dẫn không hợp lệ' }
                                    ]}
                                >
                                    <Input placeholder="https://tiktok.com/..." />
                                </Form.Item>

                                <Form.Item
                                    name="youtube"
                                    label={<Space><YoutubeOutlined /> YouTube</Space>}
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập đường dẫn YouTube' },
                                        { type: 'url', message: 'Đường dẫn không hợp lệ' }
                                    ]}
                                >
                                    <Input placeholder="https://youtube.com/..." />
                                </Form.Item>
                            </div>
                        </Card>

                        <Form.Item className='mt-4 flex justify-center'>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                block
                                icon={<SaveOutlined />}
                                style={{ backgroundColor: '#1890ff' }}
                            >
                                Lưu thay đổi
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Button
                    type="default"
                    onClick={() => navigate('/admin/dashboard')}
                    block
                    style={{ backgroundColor: '#303030', color: '#fff', border: 'none' }}
                    className="hover:bg-gray-700"
                >
                    Back to Dashboard
                </Button>
            </Space>
        </Content>
    );
};

export default ContactManagement;
