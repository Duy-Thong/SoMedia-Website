import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Divider, message, Space, Upload, Modal,Row,Col} from 'antd';
import { DeleteOutlined, PlusOutlined, UploadOutlined ,ArrowLeftOutlined} from '@ant-design/icons';
import { ref, set, push, remove, update } from 'firebase/database';
import database from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
const ProjectsForm = ({ initialData = [] }) => {
    const [form] = Form.useForm();
    const [projects, setProjects] = useState(initialData || []);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("ProjectsForm received data:", initialData);
        setProjects(initialData || []);
    }, [initialData]);

    const handleSubmit = (values) => {
        console.log("Form submitted with values:", values);

        // If editing an existing project
        if (editingIndex >= 0) {
            const updatedProjects = [...projects];
            updatedProjects[editingIndex] = values;

            // Update project in Firebase
            const projectRef = ref(database, `dataportfolio/${editingIndex}`);
            update(projectRef, values)
                .then(() => {
                    setProjects(updatedProjects);
                    message.success('Dự án đã được cập nhật thành công');
                    setEditingIndex(-1);
                    form.resetFields();
                    setIsModalVisible(false);
                })
                .catch(error => {
                    console.error("Error updating project:", error);
                    message.error('Không thể cập nhật dự án');
                });
        }
        // Adding a new project
        else {
            // Add project to Firebase
            const projectsRef = ref(database, 'dataportfolio');
            const newProjectRef = push(projectsRef);

            set(newProjectRef, values)
                .then(() => {
                    setProjects([...projects, values]);
                    message.success('Dự án đã được thêm thành công');
                    form.resetFields();
                    setIsModalVisible(false);
                })
                .catch(error => {
                    console.error("Error adding project:", error);
                    message.error('Không thể thêm dự án');
                });
        }
    };

    const handleDelete = (index) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa dự án này?',
            content: 'Hành động này không thể hoàn tác',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                const projectRef = ref(database, `dataportfolio/${index}`);
                remove(projectRef)
                    .then(() => {
                        const updatedProjects = projects.filter((_, i) => i !== index);
                        setProjects(updatedProjects);
                        message.success('Dự án đã được xóa thành công');
                    })
                    .catch(error => {
                        console.error("Error deleting project:", error);
                        message.error('Không thể xóa dự án');
                    });
            },
        });
    };

    const handleEdit = (project, index) => {
        setEditingIndex(index);
        form.setFieldsValue(project);
        setIsModalVisible(true);
    };

    const handleAddNew = () => {
        setEditingIndex(-1);
        form.resetFields();
        setIsModalVisible(true);
    };

    return (
        <div className="p-4">
            <Row justify="space-between mt-6 mb-4">
                <Col>
                    <h1 className="text-2xl font-semibold text-white">Quản lý dự án</h1>
                </Col>
                <Col>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>Thêm dự án mới</Button>
                </Col>
                <Col>
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/admin/dashboard')}
                        style={{
                            background: '#141414',
                            borderColor: '#303030',
                            color: '#e6e6e6'
                        }}
                    >
                        Quay về Dashboard
                    </Button>
                </Col>

            </Row>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {projects && projects.length > 0 ? (
                    projects.map((project, index) => (
                        <Card
                            key={index}
                            title={project.description || 'Dự án không tên'}
                            style={{ width: 300 }}
                            cover={project.img && <img alt={project.description} src={project.img} style={{ height: 120, objectFit: 'cover' }} />}
                            actions={[
                                <div style={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Button type="link" onClick={() => handleEdit(project, index)}>Sửa</Button>
                                </div>,
                                <div style={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Button type="link" danger onClick={() => handleDelete(index)}>Xóa</Button>
                                </div>
                            ]}
                        >
                            <p><strong>Mô tả:</strong> {project.description || 'Không có mô tả'}</p>
                            <p><strong>Liên kết:</strong> <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff' }}>{project.link || 'Không có liên kết'}</a></p>
                        </Card>
                    ))
                ) : (
                    <p>Không có dự án nào để hiển thị</p>
                )}
            </div>

            <Modal
                title={editingIndex >= 0 ? "Chỉnh sửa dự án" : "Thêm dự án mới"}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={editingIndex >= 0 ? projects[editingIndex] : {}}
                >
                    <Form.Item
                        name="description"
                        label="Mô tả dự án"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả dự án' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="img"
                        label="Đường dẫn hình ảnh"
                        rules={[{ required: true, message: 'Vui lòng nhập URL hình ảnh' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="link"
                        label="Liên kết dự án"
                        rules={[{ required: true, message: 'Vui lòng nhập liên kết dự án' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                {editingIndex >= 0 ? 'Cập nhật' : 'Thêm mới'}
                            </Button>
                            <Button onClick={() => setIsModalVisible(false)}>
                                Hủy
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProjectsForm;
