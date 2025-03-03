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
            backgroundColor: '#1f1f1f',
            minHeight: '100vh'
        },
        card: {
            backgroundColor: '#2d2d2d',
            border: 'none'
        },
        innerCard: {
            backgroundColor: '#363636',
            border: '1px solid #404040'
        },
        title: {
            color: '#ffffff'
        },
        text: {
            color: '#e0e0e0'
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto" style={darkThemeStyles.page}>
            <Card style={darkThemeStyles.card} bordered={false}>
                <h1 className="text-2xl font-bold mb-6 text-center" style={darkThemeStyles.title}>
                    Recruitment Management
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
                            title={<span style={darkThemeStyles.text}>Basic Information</span>}
                            className="shadow-lg"
                            style={darkThemeStyles.innerCard}
                            bordered={false}
                        >
                            <Form.Item label="Apply Link" name="applylink">
                                <Input prefix={<LinkOutlined />} placeholder="Enter application link" />
                            </Form.Item>
                            <Form.Item label="Button Text" name="button">
                                <Input prefix={<FileTextOutlined />} placeholder="Enter button text" />
                            </Form.Item>
                            <Form.Item label="QR Code URL" name="qr">
                                <Input.Group compact>
                                    <Input
                                        prefix={<QrcodeOutlined />}
                                        placeholder="Enter QR code URL"
                                        value={recruitmentData.qr}
                                        style={{ width: 'calc(100% - 64px)' }}
                                    />
                                    <Button
                                        onClick={() => recruitmentData.qr && window.open(recruitmentData.qr)}
                                        disabled={!recruitmentData.qr}
                                    >
                                        Preview
                                    </Button>
                                </Input.Group>
                            </Form.Item>
                        </Card>

                        <Card
                            title={<span style={darkThemeStyles.text}>Title Settings</span>}
                            className="shadow-lg"
                            style={darkThemeStyles.innerCard}
                            bordered={false}
                        >
                            <Form.Item label="Title 1" name="title1">
                                <Input.TextArea
                                    rows={3}
                                    placeholder="Enter main title"
                                    className="resize-none"
                                />
                            </Form.Item>
                            <Form.Item label="Title 2" name="title2">
                                <Input.TextArea
                                    rows={3}
                                    placeholder="Enter subtitle"
                                    className="resize-none"
                                />
                            </Form.Item>
                        </Card>
                    </div>

                    <Card
                        title={<span style={darkThemeStyles.text}>Timeline Events</span>}
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
                                                    Remove
                                                </Button>
                                            }
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Form.Item
                                                    label="Name"
                                                    name={[field.name, 'name']}
                                                    rules={[{ required: true, message: 'Please input name' }]}
                                                >
                                                    <Input prefix={<FileTextOutlined />} />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Time"
                                                    name={[field.name, 'time']}
                                                    rules={[{ required: true, message: 'Please input time' }]}
                                                >
                                                    <Input prefix={<ClockCircleOutlined />} />
                                                </Form.Item>
                                            </div>
                                            <Form.Item
                                                label="Description"
                                                name={[field.name, 'description']}
                                                rules={[{ required: true, message: 'Please input description' }]}
                                            >
                                                <Input.TextArea rows={2} className="resize-none" />
                                            </Form.Item>
                                        </Card>
                                    ))}
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                        className="hover:border-blue-500"
                                    >
                                        Add Timeline Item
                                    </Button>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        icon={<SaveOutlined />}
                                        className="bg-blue-600 hover:bg-blue-700 mt-4 mb-4"
                                    >
                                        Save Changes
                                    </Button>
                                    <Button
                                        type="default"
                                        onClick={() => navigate('/admin/dashboard')}
                                        block
                                        className="bg-gray-600 hover:bg-gray-700"
                                    >
                                        Back to Dashboard
                                    </Button>

                                </div>
                            )}
                        </Form.List>
                    </Card>

                    
                </Form>
            </Card>

            <style jsx global>{`
                .ant-form-item-label > label {
                    color: #e0e0e0 !important;
                }
                .ant-input, .ant-input-textarea {
                    background-color: #404040 !important;
                    border-color: #505050 !important;
                    color: #e0e0e0 !important;
                }
                .ant-input:hover, .ant-input:focus {
                    border-color: #1890ff !important;
                }
                .ant-card-head {
                    background-color: #2d2d2d !important;
                    border-bottom: 1px solid #404040 !important;
                }
                .ant-btn-dashed {
                    border-color: #404040 !important;
                    color: #e0e0e0 !important;
                }
            `}</style>
        </div>
    );
};

export default RecruitmentManagement;
