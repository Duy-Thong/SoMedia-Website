import React from 'react';
import { Card, Input, Upload, Button, Space, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadToBlob } from '../../utils/uploadHelpers';
const ActivityItem = ({ activity, index, updateActivity, removeActivity }) => {
    const handleImageUpload = async (file) => {
        try {
            const url = await uploadToBlob(file, 'active');
            updateActivity(index, { ...activity, image: url });
            message.success('Tải ảnh lên thành công!');
            return url;
        } catch (error) {
            message.error('Lỗi khi tải ảnh lên!');
            console.error('Error uploading image:', error);
            return null;
        }
    };

    return (
        <Card
            style={{ background: '#1f1f1f', borderColor: '#303030' }}
            className="activity-item"
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                <Input
                    placeholder="Tiêu đề"
                    value={activity.title}
                    onChange={(e) => updateActivity(index, { ...activity, title: e.target.value })}
                    style={{ background: '#141414', borderColor: '#303030', color: '#fff' }}
                />
                <Input.TextArea
                    placeholder="Mô tả"
                    value={activity.description}
                    onChange={(e) => updateActivity(index, { ...activity, description: e.target.value })}
                    style={{ background: '#141414', borderColor: '#303030', color: '#fff' }}
                />
                <Upload
                    accept="image/*"
                    beforeUpload={async (file) => {
                        await handleImageUpload(file);
                        return false;
                    }}
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                </Upload>
                {activity.image && (
                    <img
                        src={activity.image}
                        alt={activity.title}
                        style={{ width: '100%', marginTop: 8 }}
                    />
                )}
            </Space>
        </Card>
    );
};

export default ActivityItem;
