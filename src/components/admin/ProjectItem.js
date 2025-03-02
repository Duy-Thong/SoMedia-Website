import React from 'react';
import { Form, Input, Button, Row, Col, Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const ProjectItem = ({ project, index, updateProject, removeProject }) => {
    const handleChange = (field, value) => {
        const updatedProject = { ...project, [field]: value };
        updateProject(index, updatedProject);
    };

    return (
        <Card
            size="small"
            title={`Dự án #${index + 1}`}
            style={{ marginBottom: '16px' }}
            extra={
                <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeProject(index)}
                    type="text"
                >
                    Xóa
                </Button>
            }
        >
            <Form.Item label="Tên dự án">
                <Input
                    value={project.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Nhập tên dự án"
                />
            </Form.Item>

            <Form.Item label="Mô tả">
                <TextArea
                    value={project.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Mô tả chi tiết về dự án"
                    rows={4}
                />
            </Form.Item>

            <Form.Item label="Đường dẫn hình ảnh">
                <Input
                    value={project.image}
                    onChange={(e) => handleChange('image', e.target.value)}
                    placeholder="URL hình ảnh hoặc đường dẫn tương đối"
                />
            </Form.Item>

            <Form.Item label="Đường dẫn liên kết">
                <Input
                    value={project.link}
                    onChange={(e) => handleChange('link', e.target.value)}
                    placeholder="URL liên kết đến dự án (nếu có)"
                />
            </Form.Item>

            {project.image && (
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <img
                        src={project.image}
                        alt={project.title}
                        style={{ maxHeight: '150px', maxWidth: '100%' }}
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

export default ProjectItem;
