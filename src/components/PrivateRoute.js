import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, database, dbRef, dbGet } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const PrivateRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    // User is signed in, now check if they're an admin
                    const userSnapshot = await dbGet(dbRef(database, `users/${user.uid}`));

                    if (userSnapshot.exists()) {
                        const userData = userSnapshot.val();
                        if (userData.role === 'admin') {
                            setIsAdmin(true);
                            setIsAuthenticated(true);
                        } else {
                            message.error('Bạn không có quyền truy cập trang này');
                            setIsAdmin(false);
                            setIsAuthenticated(false);
                        }
                    } else {
                        message.error('Không tìm thấy thông tin người dùng');
                        setIsAdmin(false);
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error('Error checking admin status:', error);
                    message.error('Lỗi xác thực quyền truy cập');
                    setIsAdmin(false);
                    setIsAuthenticated(false);
                }
            } else {
                // User is not signed in
                setIsAuthenticated(false);
                setIsAdmin(false);
            }
            setIsLoading(false);
        });

        // Cleanup subscription
        return () => checkAuth();
    }, []);

    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} tip="Đang kiểm tra quyền truy cập..." />
            </div>
        );
    }

    if (!isAuthenticated || !isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default PrivateRoute;
