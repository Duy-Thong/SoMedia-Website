import React, { useState } from 'react';
import { Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadToBlob } from '../../../utils/uploadHelpers';

const SlideModalForm = ({ initialData, onSubmit, mode }) => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(initialData?.src || '');
    const [loading, setLoading] = useState(false);

    const handleImageUpload = async (file) => {
        try {
            setLoading(true);
            const url = await uploadToBlob(file, 'active');
            setImageUrl(url);
            form.setFieldsValue({ src: url });
            message.success('Tải ảnh lên thành công!');
        } catch (error) {
            message.error('Lỗi khi tải ảnh lên!');
        } finally {
            setLoading(false);
        }
    };

    const onFinish = (values) => {
        onSubmit({
            ...values,
            id: initialData?.id || Date.now().toString(),
            src: imageUrl
        });
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialData}
        >
            <Form.Item
                name="alt"
                label="Tiêu đề"
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
            >
                <Input placeholder="Ví dụ: Picnic 2024" />
            </Form.Item>

            <Form.Item
                name="description"
                label="Mô tả"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
            >
                <Input placeholder="Ví dụ: Teambuilding 2024" />
            </Form.Item>

            <Form.Item
                name="src"
                label="Hình ảnh"
                rules={[{ required: true, message: 'Vui lòng tải lên hình ảnh!' }]}
            >
                <Upload
                    accept="image/*"
                    beforeUpload={(file) => {
                        handleImageUpload(file);
                        return false;
                    }}
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined />} loading={loading}>
                        Tải ảnh lên
                    </Button>
                </Upload>
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Preview"
                        style={{ width: '100%', marginTop: 8 }}
                    />
                )}
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                    {mode === 'add' ? 'Thêm' : 'Cập nhật'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SlideModalForm;
