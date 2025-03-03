import React from 'react';
import { Card, Row, Col, Button, Typography, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Text } = Typography;

const ProjectsGrid = ({ projects, onEdit, onDelete }) => {
    return (
        <Row gutter={[16, 16]}>
            {projects.map((project, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                    <Card
                        hoverable
                        style={{
                            background: '#1f1f1f',
                            borderColor: '#303030'
                        }}
                        cover={
                            <Image
                                alt={project.description}
                                src={project.img}
                                fallback="https://via.placeholder.com/340x191?text=Image+Not+Found"
                                style={{ height: 200, objectFit: 'cover' }}
                                preview={false}
                            />
                        }
                        actions={[
                            <Button
                                type="text"
                                icon={<EditOutlined />}
                                onClick={() => onEdit(project, index)}
                                style={{ color: '#1890ff' }}
                            />,
                            <Button
                                type="text"
                                icon={<DeleteOutlined />}
                                onClick={() => onDelete(index)}
                                danger
                            />
                        ]}
                    >
                        <Meta
                            title={<Text style={{ color: '#fff' }} ellipsis>{project.description}</Text>}
                            description={
                                <Text style={{ color: '#999' }} ellipsis>
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: '#1890ff' }}
                                    >
                                        {project.link}
                                    </a>
                                </Text>
                            }
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default ProjectsGrid;
