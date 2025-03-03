import React, { useState, useEffect } from 'react';
import { database } from '../../../firebase/config';
import { ref, get, set } from 'firebase/database';
import { Input, Button, Form, message, Card, Divider, Space, Image } from 'antd';
import { LinkOutlined, QrcodeOutlined, FileTextOutlined, ClockCircleOutlined, DeleteOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import { useNavigate } from 'react-router-dom';
const RecruitmentManagement = () => {
    const { useToken } = theme;
    const { token } = useToken();
    const navigate = useNavigate();
    const [recruitmentData, setRecruitmentData] = useState({
        applylink: '',
        button: '',
        qr: '',
        timeline: [],
        title1: '',
        title2: ''
    });
    const [form] = Form.useForm();

    useEffect(() => {
        fetchRecruitmentData();
    }, []);

    const fetchRecruitmentData = async () => {
        try {
            const recruitmentRef = ref(database, 'recruitmentpage');
            const snapshot = await get(recruitmentRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                setRecruitmentData(data);
                form.setFieldsValue(data);
                console.log('Fetched data:', data);  // Debug log
            }
        } catch (error) {
            console.error('Fetch error:', error);  // Debug log
            message.error('Failed to fetch recruitment data');
        }
    };

    const handleSave = async (values) => {
        try {
            const recruitmentRef = ref(database, 'recruitmentpage');
            await set(recruitmentRef, values);
            message.success('Recruitment data updated successfully');
        } catch (error) {
            message.error('Failed to update recruitment data');
        }
    };

    const darkThemeStyles = {
        page: {
            backgroundColor: '#141414',
            minHeight: '100vh'
        },
        card: {
            backgroundColor: '#1f1f1f',
            border: 'none'
        },
        innerCard: {
            backgroundColor: '#1f1f1f',
            border: '1px solid #303030'
        },
        title: {
            color: '#ffffff'
        },
        text: {
            color: '#fff'
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto" style={darkThemeStyles.page}>
            <Card style={darkThemeStyles.card} bordered={false}>
                <h1 className="text-2xl font-bold mb-6 text-center" style={darkThemeStyles.title}>
                    Quản Lý trang Tuyển thành viên
                </h1>
                <Form
                    form={form}
                    initialValues={recruitmentData}
                    onFinish={handleSave}
                    layout="vertical"
                    onValuesChange={(_, allValues) => {
                        console.log('Form values:', allValues);
                        setRecruitmentData(allValues);
                    }}
                    theme="dark"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card
                            title={<span style={darkThemeStyles.text}>Thông Tin Cơ Bản</span>}
                            className="shadow-lg"
                            style={darkThemeStyles.innerCard}
                            bordered={false}
                        >
                            <Form.Item label="Đường Dẫn Ứng Tuyển" name="applylink">
                                <Input prefix={<LinkOutlined />} placeholder="Nhập đường dẫn ứng tuyển" />
                            </Form.Item>
                            <Form.Item label="Nội Dung Nút" name="button">
                                <Input prefix={<FileTextOutlined />} placeholder="Nhập nội dung nút" />
                            </Form.Item>
                            <Form.Item label="Đường Dẫn Mã QR" name="qr">
                                <Input.Group compact>
                                    <Input
                                        prefix={<QrcodeOutlined />}
                                        placeholder="Nhập đường dẫn mã QR"
                                        value={recruitmentData.qr}
                                        style={{ width: 'calc(100% - 64px)' }}
                                    />
                                    <Button
                                        onClick={() => recruitmentData.qr && window.open(recruitmentData.qr)}
                                        disabled={!recruitmentData.qr}
                                    >
                                        Xem
                                    </Button>
                                </Input.Group>
                            </Form.Item>
                        </Card>

                        <Card
                            title={<span style={darkThemeStyles.text}>Cài Đặt Tiêu Đề</span>}
                            className="shadow-lg"
                            style={darkThemeStyles.innerCard}
                            bordered={false}
                        >
                            <Form.Item label="Tiêu Đề 1" name="title1">
                                <Input.TextArea
                                    rows={3}
                                    placeholder="Nhập tiêu đề chính"
                                    className="resize-none"
                                />
                            </Form.Item>
                            <Form.Item label="Tiêu Đề 2" name="title2">
                                <Input.TextArea
                                    rows={3}
                                    placeholder="Nhập tiêu đề phụ"
                                    className="resize-none"
                                />
                            </Form.Item>
                        </Card>
                    </div>

                    <Card
                        title={<span style={darkThemeStyles.text}>Các Sự Kiện Timeline</span>}
                        className="mt-6 shadow-lg"
                        style={darkThemeStyles.innerCard}
                        bordered={false}
                    >
                        <Form.List name="timeline">
                            {(fields, { add, remove }) => (
                                <div className="space-y-4">
                                    {fields.map((field, index) => (
                                        <Card
                                            key={field.key}
                                            size="small"
                                            style={{
                                                ...darkThemeStyles.innerCard,
                                                borderStyle: 'dashed'
                                            }}
                                            className="hover:border-blue-500 transition-colors"
                                            extra={
                                                <Button
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    onClick={() => remove(field.name)}
                                                    size="small"
                                                >
                                                    Xóa
                                                </Button>
                                            }
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Form.Item
                                                    label="Tên"
                                                    name={[field.name, 'name']}
                                                    rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                                                >
                                                    <Input prefix={<FileTextOutlined />} />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Thời Gian"
                                                    name={[field.name, 'time']}
                                                    rules={[{ required: true, message: 'Vui lòng nhập thời gian' }]}
                                                >
                                                    <Input prefix={<ClockCircleOutlined />} />
                                                </Form.Item>
                                            </div>
                                            <Form.Item
                                                label="Mô Tả"
                                                name={[field.name, 'description']}
                                                rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                                            >
                                                <Input.TextArea rows={2} className="resize-none" />
                                            </Form.Item>
                                        </Card>
                                    ))}
                                    <Button
                                        type="default"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                        className="hover:border-blue-500 text-blue-500"
                                    >
                                        Thêm Mục Timeline
                                    </Button>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        icon={<SaveOutlined />}
                                        className="bg-blue-600 hover:bg-blue-700 mt-4 mb-4"
                                    >
                                        Lưu Thay Đổi
                                    </Button>
                                    <Button
                                        type="default"
                                        onClick={() => navigate('/admin/dashboard')}
                                        block
                                        className="bg-gray-600 hover:bg-gray-700"
                                    >
                                        Quay Lại Dashboard
                                    </Button>

                                </div>
                            )}
                        </Form.List>
                    </Card>


                </Form>
            </Card>

            <style jsx global>{`
                .ant-form-item-label > label {
                    color: #fff !important;
                }
                .ant-input, .ant-input-textarea {
                    background-color: #141414 !important;
                    border-color: #303030 !important;
                    color: #fff !important;
                }
                .ant-input:hover, .ant-input:focus {
                    border-color: #1890ff !important;
                }
                .ant-card-head {
                    background-color: #1f1f1f !important;
                    border-bottom: 1px solid #303030 !important;
                }
                .ant-btn {
                    background-color: #1f1f1f !important;
                    border-color: #303030 !important;
                    color: #fff !important;
                }
                .ant-btn:hover {
                    border-color: #1890ff !important;
                    color: #1890ff !important;
                }
                .ant-btn-primary {
                    background-color: #1890ff !important;
                    color: #fff !important;
                }
                .ant-btn-primary:hover {
                    background-color: #40a9ff !important;
                    border-color: #40a9ff !important;
                    color: #fff !important;
                }
                .ant-btn-dangerous {
                    background-color: #1f1f1f !important;
                    border-color: #ff4d4f !important;
                    color: #ff4d4f !important;
                }
                .ant-btn-dangerous:hover {
                    background-color: #ff4d4f !important;
                    color: #fff !important;
                }
                .ant-card {
                    background-color: #1f1f1f !important;
                    border-color: #303030 !important;
                }
            `}</style>
        </div>
    );
};

export default RecruitmentManagement;
