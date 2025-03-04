import React, { useEffect, useState, useRef } from 'react';
import { database } from '../../../firebase/config';
import { ref, onValue } from 'firebase/database';
import { Table, Input, Space, DatePicker, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

const LogManagement = () => {
    const [logs, setLogs] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [dateRange, setDateRange] = useState(null);
    const searchInput = useRef(null);

    useEffect(() => {
        const logsRef = ref(database, 'logs');
        onValue(logsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const logsArray = Object.entries(data).map(([key, value]) => ({
                    key,
                    ...value,
                }));
                setLogs(logsArray);
            }
        });
    }, []);

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                    background: '#1f1f1f',
                    borderRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => confirm()}
                    style={{
                        width: 188,
                        marginBottom: 8,
                        display: 'block',
                        background: '#141414',
                        color: '#fff',
                        borderColor: '#303030'
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                            background: '#1890ff'
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters()}
                        size="small"
                        style={{
                            width: 90,
                            color: '#fff',
                            background: '#141414',
                            borderColor: '#303030'
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : '#fff'
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
    });

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            ...getColumnSearchProps('username'),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            ...getColumnSearchProps('action'),
        },
        {
            title: 'Timestamp',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (timestamp) => moment(parseInt(timestamp)).format('YYYY-MM-DD HH:mm:ss'),
            sorter: (a, b) => parseInt(a.timestamp) - parseInt(b.timestamp),
        },
    ];

    const filteredLogs = dateRange && dateRange[0] && dateRange[1]
        ? logs.filter(log => {
            const logTimestamp = parseInt(log.timestamp);
            const startTimestamp = dateRange[0].startOf('day').valueOf();
            const endTimestamp = dateRange[1].endOf('day').valueOf();
            return logTimestamp >= startTimestamp && logTimestamp <= endTimestamp;
        })
        : logs;

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ color: '#fff' }}>System Logs</h1>
            <DatePicker.RangePicker
                onChange={(dates) => setDateRange(dates)}
                allowClear={true}
                className="dark-table"
                style={{ marginBottom: 16 }}
                showTime={false}
                format="YYYY-MM-DD"
            />
            <Table
                columns={columns}
                dataSource={filteredLogs}
                pagination={{ pageSize: 20 }}
                style={{
                    backgroundColor: '#141414',
                    color: '#fff'
                }}
                className="dark-table"
            />
        </div>
    );
};

export default LogManagement;
