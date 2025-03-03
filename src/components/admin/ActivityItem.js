import React from 'react';
import { Form, Input, Button, Row, Col, Card, Typography } from 'antd';
import { DeleteOutlined, PictureOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ActivityItem = ({ activity, index, updateActivity, removeActivity }) => {
    const handleChange = (field, value) => {
        const updatedActivity = { ...activity, [field]: value };
        updateActivity(index, updatedActivity);
    };

    return (
        <Card
            size="small"
            title={`Hoạt động #${index + 1}`}
            style={{
                marginBottom: '16px',
                background: '#1f1f1f',
                borderColor: '#303030'
            }}
            headStyle={{
                background: '#141414',
                color: '#fff',
                borderBottom: '1px solid #303030'
            }}
            bodyStyle={{ padding: '16px' }}
            extra={
                <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeActivity(index)}
                    type="text"
                >
                    Xóa
                </Button>
            }
        >
            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label={<Text style={{ color: '#d9d9d9' }}>Thời gian</Text>}
                        style={{ marginBottom: '12px' }}
                    >
                        <Input
                            value={activity.time}
                            onChange={(e) => handleChange('time', e.target.value)}
                            placeholder="Ví dụ: September"
                            style={{ background: '#141414', color: '#fff', borderColor: '#303030' }}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={16}>
                    <Form.Item
                        label={<Text style={{ color: '#d9d9d9' }}>Mô tả</Text>}
                        style={{ marginBottom: '12px' }}
                    >
                        <Input
                            value={activity.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            placeholder="Mô tả hoạt động"
                            style={{ background: '#141414', color: '#fff', borderColor: '#303030' }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                label={<Text style={{ color: '#d9d9d9' }}>Đường dẫn hình ảnh</Text>}
                style={{ marginBottom: '12px' }}
            >
                <Input
                    value={activity.img}
                    onChange={(e) => handleChange('img', e.target.value)}
                    placeholder="URL hình ảnh hoặc đường dẫn tương đối"
                    style={{ background: '#141414', color: '#fff', borderColor: '#303030' }}
                    prefix={<PictureOutlined style={{ color: '#d9d9d9' }} />}
                />
            </Form.Item>
            {activity.img && (
                <div style={{ marginTop: '10px', textAlign: 'center', background: '#141414', padding: '8px', borderRadius: '4px' }}>
                    <img
                        src={activity.img}
                        alt={activity.description}
                        style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'contain' }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                        }}
                    />
                </div>
            )}
        </Card>
    );
};

export default ActivityItem;
