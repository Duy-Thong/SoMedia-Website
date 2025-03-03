import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Space, Modal, Row, Col } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { ref, set, push, remove, update } from 'firebase/database';
import database from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import ProjectsGrid from './ProjectsGrid';

const ProjectsForm = ({ initialData = [] }) => {
    const [form] = Form.useForm();
    const [projects, setProjects] = useState([]);  // Will store objects with id and data
    const [editingIndex, setEditingIndex] = useState(-1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Transform initialData to include IDs
        const formattedProjects = Object.entries(initialData || {}).map(([id, data]) => ({
            id,
            ...data
        }));
        setProjects(formattedProjects);
    }, [initialData]);

    const handleSubmit = (values) => {
        console.log("Form submitted with values:", values);

        // If editing an existing project
        if (editingIndex >= 0) {
            const projectToUpdate = projects[editingIndex];
            const projectRef = ref(database, `dataportfolio/${projectToUpdate.id}`);

            update(projectRef, values)
                .then(() => {
                    const updatedProjects = projects.map((project, index) =>
                        index === editingIndex ? { ...project, ...values } : project
                    );
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
        } else {
            // Adding a new project
            const projectsRef = ref(database, 'dataportfolio');
            const newProjectRef = push(projectsRef);

            set(newProjectRef, values)
                .then(() => {
                    const newProject = {
                        id: newProjectRef.key,
                        ...values
                    };
                    setProjects([...projects, newProject]);
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
        const projectToDelete = projects[index];

        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa dự án này?',
            content: 'Hành động này không thể hoàn tác',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                const projectRef = ref(database, `dataportfolio/${projectToDelete.id}`);
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
        form.setFieldsValue({
            description: project.description,
            img: project.img,
            link: project.link
        });
        setIsModalVisible(true);
    };

    const handleAddNew = () => {
        setEditingIndex(-1);
        form.resetFields();
        setIsModalVisible(true);
    };

    return (
        <div className="p-4">
            <Row justify="space-between" align="middle" className="mb-6">
                <Col>
                    <h1 className="text-2xl font-semibold text-white">Quản lý dự án</h1>
                </Col>
                <Col>
                    <Space>
                        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
                            Thêm dự án mới
                        </Button>
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
                    </Space>
                </Col>
            </Row>

            {projects && projects.length > 0 ? (
                <ProjectsGrid
                    projects={projects}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ) : (
                <div className="text-center text-gray-400 py-8">
                    Không có dự án nào để hiển thị
                </div>
            )}

            <Modal
                title={<span style={{ color: '#fff' }}>{editingIndex >= 0 ? "Chỉnh sửa dự án" : "Thêm dự án mới"}</span>}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={500}
                centered
                style={{
                    maxHeight: '90vh'
                }}
                modalRender={(modal) => (
                    <div style={{
                        background: '#1f1f1f',
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}>
                        {modal}
                    </div>
                )}
                styles={{
                    header: {
                        background: '#141414',
                        padding: '12px 16px',
                        borderBottom: '1px solid #303030'
                    },
                    content: {
                        background: '#1f1f1f',
                        padding: '16px'
                    },
                    body: {
                        padding: '16px 0',
                        maxHeight: 'calc(90vh - 120px)',
                        overflowY: 'auto'
                    },
                    mask: {
                        backgroundColor: 'rgba(0, 0, 0, 0.65)'
                    },
                    title: {
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: 500
                    }
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={editingIndex >= 0 ? projects[editingIndex] : {}}
                    style={{ color: '#fff' }}
                    size="middle"
                >
                    <Form.Item
                        name="description"
                        label={<span style={{ color: '#fff' }}>Mô tả dự án</span>}
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả dự án' }]}
                        style={{ marginBottom: '16px' }}
                    >
                        <Input.TextArea
                            rows={3}
                            style={{
                                background: '#141414',
                                borderColor: '#303030',
                                color: '#fff'
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="img"
                        label={<span style={{ color: '#fff' }}>Đường dẫn hình ảnh</span>}
                        rules={[{ required: true, message: 'Vui lòng nhập URL hình ảnh' }]}
                        style={{ marginBottom: '16px' }}
                    >
                        <Input
                            style={{
                                background: '#141414',
                                borderColor: '#303030',
                                color: '#fff'
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="link"
                        label={<span style={{ color: '#fff' }}>Liên kết dự án</span>}
                        rules={[{ required: true, message: 'Vui lòng nhập liên kết dự án' }]}
                        style={{ marginBottom: '24px' }}
                    >
                        <Input
                            style={{
                                background: '#141414',
                                borderColor: '#303030',
                                color: '#fff'
                            }}
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <Button onClick={() => setIsModalVisible(false)}>
                                Hủy
                            </Button>
                            <Button type="primary" htmlType="submit">
                                {editingIndex >= 0 ? 'Cập nhật' : 'Thêm mới'}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    );
};

export default ProjectsForm;
