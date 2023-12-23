import React from 'react';
import { getStatusDraftLabel, listInvoice } from './data';
import { Table } from 'antd';
import styled from 'styled-components';
import { ColumnsType } from 'antd/es/table';
import { DataType } from './types';



const InvoicePage = () => {

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên hóa đơn',
            dataIndex: 'title',
            key: 'title',
            width: 130
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
            render: (text: any) => {
                return <p className='content-item'>{text}</p>;
            },
            width: 130
        },
        {
            title: 'Ngày',
            dataIndex: 'time',
            key: 'time',
            width: 130
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 130,
            render: (text: any) => {
                const { label, color } = getStatusDraftLabel(text);
                return (
                    <p className='status-item' style={{ color: color }}>
                        {label}
                    </p>
                );
            },
        },
    ];

    return (
        <InvoicePageStyled>
            <Table columns={columns} dataSource={listInvoice} />
        </InvoicePageStyled>
    );
};

export default InvoicePage;

const InvoicePageStyled = styled.div`
.content-item {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
}
.ant-table-cell {
        width: 25%;
    }
.status-item {
font-size: 16px;
font-weight: 500;
}
`;