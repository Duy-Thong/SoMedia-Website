import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin, Alert, Button } from 'antd';
import ProjectsForm from '../../../components/admin/ProjectsForm';
import database from '../../../firebase/config';
import { ref, get } from 'firebase/database';

const { Content } = Layout;
const { Title } = Typography;

const ProjectsManagement = () => {
    const [projectsData, setProjectsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjectsData = async () => {
            try {
                const projectsRef = ref(database, 'projectsData');
                const snapshot = await get(projectsRef);

                if (snapshot.exists()) {
                    // Convert Firebase object to array if needed
                    const data = snapshot.val();
                    const projectsArray = Array.isArray(data) ? data : Object.values(data);
                    setProjectsData(projectsArray);
                } else {
                    console.log("No projects data available");
                    setProjectsData([]);
                }
            } catch (error) {
                console.error("Error fetching projects data:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectsData();
    }, []);

    if (loading) {
        return (
            <Content style={{ padding: '24px', textAlign: 'center' }}>
                <Spin size="large" />
                <p>Loading projects data...</p>
            </Content>
        );
    }

    if (error) {
        return (
            <Content style={{ padding: '24px' }}>
                <Alert
                    message="Error"
                    description={`Failed to load projects data: ${error}`}
                    type="error"
                    showIcon
                />
            </Content>
        );
    }

    return (
        <Content style={{ padding: '24px' }}>
            <Title level={2}>Quản lý dự án</Title>
            <ProjectsForm initialData={projectsData} />
        </Content>
    );
};

export default ProjectsManagement;
