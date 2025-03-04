import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, Space, Divider, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined, SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import database from '../../firebase/config';
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const IntroForm = ({ initialData, onLog }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [animatedItems, setAnimatedItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue({
                title: initialData.title,
                description: initialData.description,
            });

            // Convert animated object to array for dynamic rendering
            if (initialData.animated) {
                const animatedArray = Object.entries(initialData.animated).map(([key, value]) => ({
                    key,
                    value
                }));
                setAnimatedItems(animatedArray);
            }
        }
    }, [initialData, form]);

    const getChangedFields = (values) => {
        const changes = [];

        if (initialData?.title !== values.title) {
            changes.push(`tiêu đề từ "${initialData?.title}" thành "${values.title}"`);
        }

        if (initialData?.description !== values.description) {
            changes.push(`mô tả từ "${initialData?.description}" thành "${values.description}"`);
        }

        const initialAnimated = initialData?.animated || {};
        animatedItems.forEach(item => {
            if (initialAnimated[item.key] !== item.value) {
                changes.push(`văn bản động "${item.key}" từ "${initialAnimated[item.key]}" thành "${item.value}"`);
            }
        });

        return changes;
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const introRef = ref(database, 'introdata');

            // Convert animated items array back to object format
            const animatedObject = {};
            animatedItems.forEach(item => {
                animatedObject[item.key] = item.value;
            });

            const formattedData = {
                title: values.title,
                description: values.description,
                animated: animatedObject
            };

            await set(introRef, formattedData);
            message.success('Lưu dữ liệu thành công!');

            const changes = getChangedFields(values);
            if (changes.length > 0) {
                onLog(`Đã cập nhật thông tin trang chủ: ${changes.join(', ')}`);
            } else {
                onLog('Không có thay đổi nào được thực hiện');
            }
        } catch (error) {
            message.error('Lưu dữ liệu thất bại: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveAnimatedItem = (keyToRemove) => {
        setAnimatedItems(animatedItems.filter(item => item.key !== keyToRemove));
    };

    const handleAnimatedItemChange = (key, newValue) => {
        setAnimatedItems(animatedItems.map(item =>
            item.key === key ? { ...item, value: newValue } : item
        ));
    };

    return (
        <Card
            title="Chỉnh sửa phần Giới thiệu"
            bordered={false}
            className="dark-card"
            style={{ background: '#1f1f1f', color: '#e6e6e6' }}
            headStyle={{
                background: '#141414',
                color: '#e6e6e6',
                borderBottom: '1px solid #303030'
            }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                style={{ color: '#e6e6e6' }}
            >
                <Form.Item
                    name="title"
                    label={<span style={{ color: '#e6e6e6' }}>Tiêu đề</span>}
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                >
                    <Input placeholder="Nhập tiêu đề" style={{ background: '#141414', color: '#e6e6e6', borderColor: '#303030' }} />
                </Form.Item>

                <Form.Item
                    name="description"
                    label={<span style={{ color: '#e6e6e6' }}>Mô tả</span>}
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                >
                    <Input.TextArea
                        rows={4}
                        placeholder="Nhập mô tả"
                        style={{ background: '#141414', color: '#e6e6e6', borderColor: '#303030' }}
                    />
                </Form.Item>

                <Card
                    title={<span style={{ color: '#e6e6e6' }}>Văn bản động</span>}
                    style={{ marginBottom: 16, background: '#141414', borderColor: '#303030' }}
                    headStyle={{ background: '#0d0d0d', borderBottom: '1px solid #303030' }}
                >
                    {animatedItems.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#bfbfbf' }}>
                            Không có văn bản động.
                        </div>
                    )}

                    {animatedItems.map((item, index) => (
                        <div key={index}>
                            {index > 0 && <Divider style={{ borderColor: '#303030' }} />}
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Space>
                                    <Input
                                        addonBefore={<span style={{ background: '#0a0a0a', color: '#bfbfbf' }}>Key</span>}
                                        value={item.key}
                                        disabled
                                        style={{ width: 200, background: '#141414', color: '#e6e6e6', borderColor: '#303030' }}
                                    />
                                    <Tooltip title="Xóa mục này">
                                        <Button
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() => handleRemoveAnimatedItem(item.key)}
                                            style={{ borderColor: '#303030' }}
                                        />
                                    </Tooltip>
                                </Space>
                                <Input
                                    addonBefore={<span style={{ background: '#0a0a0a', color: '#bfbfbf' }}>Text</span>}
                                    placeholder="Nhập nội dung văn bản động"
                                    value={item.value}
                                    onChange={(e) => handleAnimatedItemChange(item.key, e.target.value)}
                                    style={{ background: '#141414', color: '#e6e6e6', borderColor: '#303030' }}
                                />
                            </Space>
                        </div>
                    ))}
                </Card>

                <Form.Item>
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            icon={<SaveOutlined />}
                        >
                            Lưu thay đổi
                        </Button>

                    </Space>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default IntroForm;
