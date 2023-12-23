import React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getStatusCustomerLabel, listCustomer } from './data';
import { ICustomer } from './types';

const CustomerPage = () => {

    const columns: ColumnsType<ICustomer> = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'name',
            key: 'name',
            width: 130
        },
        {
            title: 'Tên phòng',
            dataIndex: 'room',
            key: 'room',
            width: 130
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 130,
            render: (text: any) => {
                const { label, color } = getStatusCustomerLabel(text);
                return (
                    <p className='status-item' style={{ color: color }}>
                        {label}
                    </p>
                );
            },
        },
    ];

    return (
        <CustomerStyled>
            {/* <div>
                <Button>Thêm phòng</Button>
            </div> */}
            <div>
                <Table columns={columns} dataSource={listCustomer} />
            </div>
        </CustomerStyled>
    );
};

export default CustomerPage;

const CustomerStyled = styled.div`

`;