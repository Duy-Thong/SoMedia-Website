import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin, Alert, Button, Empty, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
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
            <Content className="bg-gray-900 p-6 text-center">
                <Spin size="large" />
                <p className="text-gray-300 mt-2">Loading projects data...</p>
            </Content>
        );
    }

    if (error) {
        return (
            <Content className="bg-gray-900 p-6">
                <Alert
                    message="Error"
                    description={`Failed to load projects data: ${error}`}
                    type="error"
                    showIcon
                />
                <Button
                    type="primary"
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-blue-600 hover:bg-blue-700"
                >
                    Thử lại
                </Button>
            </Content>
        );
    }

    return (
        <Content className="bg-gray-900 !p-20 !pt-12">
            <Row className="mb-6 mt-6" align="middle">
                <Col span={8}>
                    <Title level={2} className="text-white m-0">Quản lý dự án</Title>
                </Col>
                <Col span={8} className="text-right">
                    
                    <Link to="/admin/dashboard">
                        <Button type="primary" className="bg-gray-700 hover:bg-gray-600">
                            Quay về Dashboard
                        </Button>
                    </Link>
                </Col>
            </Row>

            {projectsData.length > 0 ? (
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
                    <ProjectsForm initialData={projectsData} />
                </div>
            ) : (
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
                    <Empty
                        description={<span className="text-gray-300">Không có dự án nào</span>}
                        imageStyle={{ filter: 'invert(0.8)' }}
                    />
                </div>
            )}
        </Content>
    );
};

export default ProjectsManagement;
