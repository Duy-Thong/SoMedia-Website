import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin, Alert, Button, Empty, Row, Col, Space } from 'antd';
import { Link } from 'react-router-dom';
import ProjectsForm from '../../../components/admin/ProjectsForm';
import database from '../../../firebase/config';
import { ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

const ProjectsManagement = () => {
    const navigate = useNavigate(); // Add this
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
            <Content className="bg-gray-950 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="bg-gray-900 p-6 sm:p-8 md:p-12 rounded-xl shadow-xl text-center w-full max-w-2xl">
                    <Spin size="large" />
                    <p className="text-gray-400 mt-4 text-base sm:text-lg">Loading projects data...</p>
                </div>
            </Content>
        );
    }

    if (error) {
        return (
            <Content className="bg-gray-950 min-h-screen p-4 sm:p-6 md:p-8 flex items-center justify-center">
                <div className="bg-gray-900 p-6 sm:p-8 md:p-10 rounded-xl shadow-xl w-full max-w-3xl">
                    <Alert
                        message="Error"
                        description={`Failed to load projects data: ${error}`}
                        type="error"
                        showIcon
                        className="mb-4 sm:mb-6"
                    />
                    <div className="text-center">
                        <Button
                            size="large"
                            type="primary"
                            onClick={() => window.location.reload()}
                            className="mt-3 sm:mt-4 bg-blue-600 hover:bg-blue-700 px-4 sm:px-8 py-1 sm:py-2 h-auto"
                        >
                            Thử lại
                        </Button>
                    </div>
                </div>
            </Content>
        );
    }

    return (
        <Content className="bg-gray-950">
            <div className="p-3 sm:p-4 md:p-6">
                {projectsData.length > 0 ? (
                    <div className="bg-gray-900 p-4 sm:p-6 md:p-8 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
                        <ProjectsForm initialData={projectsData} />
                    </div>
                ) : (
                    <div className="bg-gray-900 p-6 sm:p-8 md:p-10 rounded-xl shadow-xl text-center transition-all duration-300 hover:shadow-2xl">
                        <Empty
                            description={<span className="text-gray-400 text-base sm:text-lg">Không có dự án nào</span>}
                            imageStyle={{ filter: 'invert(0.8)', opacity: 0.8 }}
                            className="my-8 sm:my-12"
                        />
                        <Button
                            type="primary"
                            size="large"
                            className="mt-3 sm:mt-4 bg-green-600 hover:bg-green-700 border-none px-4 sm:px-8 py-1 sm:py-2 h-auto text-sm sm:text-base"
                        >
                            Thêm dự án mới
                        </Button>
                    </div>
                )}
            </div>
        </Content>
    );
};

export default ProjectsManagement;
