import React from 'react';
import { Card, Row, Col, Button, Typography, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Text } = Typography;

const ActivitiesGrid = ({ items, onEdit, onDelete, type }) => {
    return (
        <Row gutter={[16, 16]}>
            {items.map((item, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                    <Card
                        hoverable
                        style={{
                            background: '#1f1f1f',
                            borderColor: '#303030'
                        }}
                        cover={
                            <Image
                                alt={item.title}
                                src={item.imageUrl}
                                style={{ height: 200, objectFit: 'cover' }}
                            />
                        }
                        actions={[
                            <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(item, index)} />,
                            <Button type="text" icon={<DeleteOutlined />} onClick={() => onDelete(index)} />
                        ]}
                    >
                        <Meta
                            title={<Text style={{ color: '#fff' }}>{item.title}</Text>}
                            description={
                                <Text style={{ color: '#999' }}>
                                    {type === 'activities' ? item.description : item.subtitle}
                                </Text>
                            }
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default ActivitiesGrid;
