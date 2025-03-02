import React, { useState } from 'react';
import { Form, Button, Card, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProjectItem from './ProjectItem';
import database from '../../firebase/config';
import { ref, set } from 'firebase/database';

const ProjectsForm = ({ initialData = [] }) => {
    const [projects, setProjects] = useState(initialData);
    const [saving, setSaving] = useState(false);
    const [form] = Form.useForm();

    const handleSave = async () => {
        try {
            setSaving(true);
            const projectsRef = ref(database, 'projectsData');
            await set(projectsRef, projects);
            message.success('Cập nhật dự án thành công!');
        } catch (error) {
            console.error('Error saving projects:', error);
            message.error('Lỗi khi lưu dữ liệu: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    const addProject = () => {
        const newProject = {
            title: '',
            description: '',
            image: '',
            link: ''
        };
        setProjects([...projects, newProject]);
    };

    const updateProject = (index, updatedProject) => {
        const updatedProjects = [...projects];
        updatedProjects[index] = updatedProject;
        setProjects(updatedProjects);
    };

    const removeProject = (index) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa dự án này?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                const updatedProjects = projects.filter((_, i) => i !== index);
                setProjects(updatedProjects);
                message.success('Đã xóa dự án');
            }
        });
    };

    return (
        <Form form={form} layout="vertical">
            <Card title="Danh sách dự án" className="projects-card">
                {projects.map((project, index) => (
                    <ProjectItem
                        key={index}
                        project={project}
                        index={index}
                        updateProject={updateProject}
                        removeProject={removeProject}
                    />
                ))}
                <Button
                    type="dashed"
                    onClick={addProject}
                    block
                    icon={<PlusOutlined />}
                    style={{ marginTop: '20px' }}
                >
                    Thêm dự án
                </Button>
            </Card>

            <Button
                type="primary"
                onClick={handleSave}
                loading={saving}
                style={{ marginTop: '20px' }}
            >
                Lưu thay đổi
            </Button>
        </Form>
    );
};

export default ProjectsForm;
