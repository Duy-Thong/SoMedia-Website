import React, { useState } from 'react';
import { Form, Input, Button, Card, Switch, DatePicker, message, Space, Typography } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import database from '../../firebase/config';
import { ref, set } from 'firebase/database';

const { TextArea } = Input;
const { Title } = Typography;

const RecruitmentForm = ({ initialData = {} }) => {
    const [form] = Form.useForm();
    const [saving, setSaving] = useState(false);
    
    const defaultSettings = {
        isActive: false,
        title: 'Tuyển thành viên mới',
        description: 'Chúng tôi đang tìm kiếm những thành viên nhiệt huyết!',
        openDate: '',
        closeDate: '',
        requirements: [''],
        positions: [{ name: '', description: '', slots: 1 }],
        ...initialData
    };
    
    const handleSave = async (values) => {
        try {
            setSaving(true);
            // Format dates to ISO string if they exist
            const formattedValues = {
                ...values,
                openDate: values.openDate ? values.openDate.format('YYYY-MM-DD') : '',
                closeDate: values.closeDate ? values.closeDate.format('YYYY-MM-DD') : '',
            };
            
            const recruitmentRef = ref(database, 'recruitmentData/settings');
            await set(recruitmentRef, formattedValues);
            message.success('Cập nhật thông tin tuyển thành viên thành công!');
        } catch (error) {
            console.error('Error saving recruitment data:', error);
            message.error('Lỗi khi lưu dữ liệu: ' + error.message);
        } finally {
            setSaving(false);
        }
    };
    
    return (
        <Form 
            form={form}
            layout="vertical"
            initialValues={{
                ...defaultSettings,
                openDate: defaultSettings.openDate ? dayjs(defaultSettings.openDate) : null,
                closeDate: defaultSettings.closeDate ? dayjs(defaultSettings.closeDate) : null,
            }}
            onFinish={handleSave}
        >
            <Card title="Cài đặt tuyển thành viên" className="settings-card">
                <Form.Item 
                    name="isActive" 
                    label="Kích hoạt tuyển thành viên" 
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                
                <Form.Item 
                    name="title" 
                    label="Tiêu đề"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                >
                    <Input placeholder="Ví dụ: Tuyển thành viên mới" />
                </Form.Item>
                
                <Form.Item 
                    name="description" 
                    label="Mô tả"
                >
                    <TextArea 
                        rows={4} 
                        placeholder="Mô tả chi tiết về đợt tuyển thành viên" 
                    />
                </Form.Item>
                
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Form.Item 
                        name="openDate" 
                        label="Ngày bắt đầu"
                        style={{ flex: 1 }}
                    >
                        <DatePicker 
                            style={{ width: '100%' }} 
                            format="DD/MM/YYYY"
                            placeholder="Chọn ngày bắt đầu" 
                        />
                    </Form.Item>
                    
                    <Form.Item 
                        name="closeDate" 
                        label="Ngày kết thúc"
                        style={{ flex: 1 }}
                    >
                        <DatePicker 
                            style={{ width: '100%' }} 
                            format="DD/MM/YYYY"
                            placeholder="Chọn ngày kết thúc" 
                        />
                    </Form.Item>
                </div>
                
                <Title level={5}>Yêu cầu chung</Title>
                <Form.List name="requirements">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space 
                                    key={key} 
                                    style={{ display: 'flex', marginBottom: 8 }} 
                                    align="baseline"
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name]}
                                        style={{ width: '100%', marginBottom: 8 }}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập yêu cầu hoặc xóa trường này',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Ví dụ: Yêu cầu về kỹ năng" />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    ) : null}
                                </Space>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                >
                                    Thêm yêu cầu
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                
                <Title level={5}>Vị trí tuyển dụng</Title>
                <Form.List name="positions">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Card 
                                    key={key} 
                                    size="small" 
                                    style={{ marginBottom: 16 }}
                                    title={`Vị trí ${name + 1}`}
                                    extra={
                                        fields.length > 1 ? (
                                            <Button 
                                                danger
                                                type="text"
                                                onClick={() => remove(name)}
                                                icon={<MinusCircleOutlined />}
                                            >
                                                Xóa
                                            </Button>
                                        ) : null
                                    }
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'name']}
                                        label="Tên vị trí"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập tên vị trí',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Ví dụ: Nhân viên Graphic Design" />
                                    </Form.Item>
                                    
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'description']}
                                        label="Mô tả vị trí"
                                    >
                                        <TextArea rows={3} placeholder="Mô tả công việc, yêu cầu cụ thể..." />
                                    </Form.Item>
                                    
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'slots']}
                                        label="Số lượng"
                                        initialValue={1}
                                    >
                                        <Input type="number" min={1} />
                                    </Form.Item>
                                </Card>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                >
                                    Thêm vị trí tuyển dụng
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Card>
            
            <Button
                type="primary"
                htmlType="submit"
                loading={saving}
                style={{ marginTop: '20px' }}
            >
                Lưu thay đổi
            </Button>
        </Form>
    );
};

export default RecruitmentForm;
