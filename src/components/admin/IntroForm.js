import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, Space, Divider, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import database from '../../firebase/config';
import { ref, set } from 'firebase/database';

const IntroForm = ({ initialData }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [animatedItems, setAnimatedItems] = useState([]);

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
            message.success('Data saved successfully!');
        } catch (error) {
            message.error('Failed to save data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddAnimatedItem = () => {
        // Find a new key that doesn't exist yet
        let newKey = 'item' + (animatedItems.length + 1);
        let counter = animatedItems.length + 1;

        while (animatedItems.some(item => item.key === newKey)) {
            counter++;
            newKey = 'item' + counter;
        }

        setAnimatedItems([...animatedItems, { key: newKey, value: '' }]);
    };

    const handleRemoveAnimatedItem = (keyToRemove) => {
        setAnimatedItems(animatedItems.filter(item => item.key !== keyToRemove));
    };

    const handleAnimatedItemChange = (key, newValue) => {
        setAnimatedItems(animatedItems.map(item =>
            item.key === key ? { ...item, value: newValue } : item
        ));
    };

    const handleKeyChange = (oldKey, newKey) => {
        // Don't allow duplicate keys
        if (animatedItems.some(item => item.key === newKey && item.key !== oldKey)) {
            message.error('This key already exists!');
            return;
        }

        setAnimatedItems(animatedItems.map(item =>
            item.key === oldKey ? { ...item, key: newKey } : item
        ));
    };

    return (
        <Card title="Edit Introduction Section" bordered={false}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please enter the title!' }]}
                >
                    <Input placeholder="Enter title" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter a description!' }]}
                >
                    <Input.TextArea rows={4} placeholder="Enter description" />
                </Form.Item>

                <Card
                    title="Animated Text"
                    style={{ marginBottom: 16 }}
                    extra={
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddAnimatedItem}
                        >
                            Add Item
                        </Button>
                    }
                >
                    {animatedItems.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            No animated text items. Click "Add Item" to create one.
                        </div>
                    )}

                    {animatedItems.map((item, index) => (
                        <div key={index}>
                            {index > 0 && <Divider />}
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Space>
                                    <Input
                                        addonBefore="Key"
                                        placeholder="Key name"
                                        value={item.key}
                                        onChange={(e) => handleKeyChange(item.key, e.target.value)}
                                        style={{ width: 200 }}
                                    />
                                    <Tooltip title="Remove this item">
                                        <Button
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() => handleRemoveAnimatedItem(item.key)}
                                        />
                                    </Tooltip>
                                </Space>
                                <Input
                                    addonBefore="Text"
                                    placeholder="Animation text value"
                                    value={item.value}
                                    onChange={(e) => handleAnimatedItemChange(item.key, e.target.value)}
                                />
                            </Space>
                        </div>
                    ))}
                </Card>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        icon={<SaveOutlined />}
                    >
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default IntroForm;
