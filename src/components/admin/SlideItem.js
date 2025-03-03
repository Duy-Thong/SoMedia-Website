import React from 'react';
import { Form, Input, Card, Button, Row, Col, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

const SlideItem = ({ slide, index, updateSlide, removeSlide }) => {
    const handleChange = (field, value) => {
        updateSlide(index, { ...slide, [field]: value });
    };

    return (
        <Card
            size="small"
            title={<Text style={{ color: '#fff' }}>Slide {index + 1}</Text>}
            style={{ background: '#141414', borderColor: '#303030' }}
            headStyle={{ borderColor: '#303030' }}
            extra={
                <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeSlide(index)}
                    style={{ border: 'none' }}
                >
                    Xóa
                </Button>
            }
        >
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item label={<Text style={{ color: '#fff' }}>Tiêu đề thay thế</Text>}>
                        <Input
                            value={slide.alt}
                            onChange={(e) => handleChange('alt', e.target.value)}
                            placeholder="Nhập tiêu đề thay thế"
                            style={{ background: '#1f1f1f', color: '#fff', borderColor: '#303030' }}
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label={<Text style={{ color: '#fff' }}>Mô tả</Text>}>
                        <Input
                            value={slide.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            placeholder="Nhập mô tả"
                            style={{ background: '#1f1f1f', color: '#fff', borderColor: '#303030' }}
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label={<Text style={{ color: '#fff' }}>Đường dẫn hình ảnh</Text>}>
                        <Input
                            value={slide.src}
                            onChange={(e) => handleChange('src', e.target.value)}
                            placeholder="Nhập đường dẫn hình ảnh"
                            style={{ background: '#1f1f1f', color: '#fff', borderColor: '#303030' }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            {slide.src && (
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <img
                        src={slide.src}
                        alt={slide.alt || "Xem trước"}
                        style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                    />
                </div>
            )}
        </Card>
    );
};

export default SlideItem;
