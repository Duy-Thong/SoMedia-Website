import React from 'react';
import { Form, Input, Button, Row, Col, Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const ActivityItem = ({ activity, index, updateActivity, removeActivity }) => {
    const handleChange = (field, value) => {
        const updatedActivity = { ...activity, [field]: value };
        updateActivity(index, updatedActivity);
    };

    return (
        <Card
            size="small"
            title={`Hoạt động #${index + 1}`}
            style={{ marginBottom: '16px' }}
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
                    <Form.Item label="Thời gian">
                        <Input
                            value={activity.time}
                            onChange={(e) => handleChange('time', e.target.value)}
                            placeholder="Ví dụ: September"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={16}>
                    <Form.Item label="Mô tả">
                        <Input
                            value={activity.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            placeholder="Mô tả hoạt động"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item label="Đường dẫn hình ảnh">
                <Input
                    value={activity.img}
                    onChange={(e) => handleChange('img', e.target.value)}
                    placeholder="URL hình ảnh hoặc đường dẫn tương đối"
                />
            </Form.Item>
            {activity.img && (
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <img
                        src={activity.img}
                        alt={activity.description}
                        style={{ maxHeight: '100px', maxWidth: '100%' }}
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
