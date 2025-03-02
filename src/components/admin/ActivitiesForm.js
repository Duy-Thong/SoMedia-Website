import React, { useState } from 'react';
import { Form, Button, Card, message, Spin, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ActivityItem from './ActivityItem';
import database from '../../firebase/config';
import { ref, set } from 'firebase/database';

const ActivitiesForm = ({ initialData = [] }) => {
    const [activities, setActivities] = useState(initialData);
    const [saving, setSaving] = useState(false);
    const [form] = Form.useForm();

    const handleSave = async () => {
        try {
            setSaving(true);
            const activitiesRef = ref(database, 'activitiesData');
            await set(activitiesRef, activities);
            message.success('Cập nhật hoạt động thành công!');
        } catch (error) {
            console.error('Error saving activities:', error);
            message.error('Lỗi khi lưu dữ liệu: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    const addActivity = () => {
        const newActivity = {
            description: '',
            img: '',
            time: ''
        };
        setActivities([...activities, newActivity]);
    };

    const updateActivity = (index, updatedActivity) => {
        const updatedActivities = [...activities];
        updatedActivities[index] = updatedActivity;
        setActivities(updatedActivities);
    };

    const removeActivity = (index) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa hoạt động này?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                const updatedActivities = activities.filter((_, i) => i !== index);
                setActivities(updatedActivities);
                message.success('Đã xóa hoạt động');
            }
        });
    };

    return (
        <Form form={form} layout="vertical">
            <Card title="Danh sách hoạt động" className="activities-card">
                {activities.map((activity, index) => (
                    <ActivityItem
                        key={index}
                        activity={activity}
                        index={index}
                        updateActivity={updateActivity}
                        removeActivity={removeActivity}
                    />
                ))}
                <Button
                    type="dashed"
                    onClick={addActivity}
                    block
                    icon={<PlusOutlined />}
                    style={{ marginTop: '20px' }}
                >
                    Thêm hoạt động
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

export default ActivitiesForm;
