import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin, Alert, Button, Empty } from 'antd';
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
                console.log("Attempting to fetch projects data...");
                const projectsRef = ref(database, 'dataportfolio');
                const snapshot = await get(projectsRef);

                if (snapshot.exists()) {
                    // Convert Firebase object to array if needed
                    const data = snapshot.val();
                    console.log("Raw data from Firebase:", data);
                    
                    let projectsArray = [];
                    if (Array.isArray(data)) {
                        projectsArray = data;
                    } else if (typeof data === 'object' && data !== null) {
                        projectsArray = Object.values(data);
                    }
                    
                    console.log("Processed projects array:", projectsArray);
                    setProjectsData(projectsArray);
                } else {
                    console.log("No projects data available in database");
                    setProjectsData([]);
                }
            } catch (error) {
                console.error("Error fetching projects data:", error);
                setError(`${error.name}: ${error.message}`);
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
                <Button 
                    type="primary" 
                    onClick={() => window.location.reload()}
                    style={{ marginTop: '16px' }}
                >
                    Thử lại
                </Button>
            </Content>
        );
    }

    return (
        <Content style={{ padding: '24px' }}>
            <Title level={2}>Quản lý dự án</Title>
            
            {projectsData.length > 0 ? (
                <ProjectsForm initialData={projectsData} />
            ) : (
                <div>
                    <Empty description="Không có dự án nào" />
                    <Button 
                        type="primary" 
                        style={{ marginTop: '16px' }}
                        onClick={() => console.log("Add new project clicked")}
                    >
                        Thêm dự án mới
                    </Button>
                </div>
            )}
        </Content>
    );
};

export default ProjectsManagement;
