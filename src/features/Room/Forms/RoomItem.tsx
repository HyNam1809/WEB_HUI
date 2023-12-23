import React from 'react';
import { ItemCardRoom } from '../Types';
import { Card, Space } from 'antd';
import styled from 'styled-components';

const RoomItem = (data: ItemCardRoom) => {
    const quantityUser = data.user.length;
    return (
        <StyledRoomsItem>
            <Space direction="vertical" size={16}>
                <Card title={
                    <div className='item-title-container'>
                        <span className='title'>{data.title}</span>
                        <span className='enough-people'>{quantityUser < 30 ? '' : 'Đã đủ người'}</span>
                    </div>
                }
                    style={{ width: 300 }}>
                    <div className='card-row'>
                        <h3>Thời gian bắt đầu: <span>{data.start_time}</span></h3>
                    </div>
                    <div className='card-row'>
                        <h3>Thời gian kết thúc: <span>{data.end_time}</span></h3>
                    </div>
                    <div className='card-row'>
                        <h3>Giá hụi: <span>{data.total_money}</span></h3>
                    </div>
                    <div className='card-row'>
                        <h3>Số lượng người chơi: <span>{quantityUser}</span></h3>
                    </div>
                </Card>
            </Space>
        </StyledRoomsItem>
    );
};

export default RoomItem;

const StyledRoomsItem = styled.div`
.ant-space-vertical {
&:hover {
    box-shadow: 5px 5px 10px -5px;
    border-radius: 8px;
}
}
.item-title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
        font-size: 24px;
        font-weight: 600;
    }
    .enough-people {
        font-size: 16px;
        color: red
    }
}

.ant-card-body {
    display: grid;
    gap: 16px;

    .card-row {
        display: flex;
        justify-content: start;
        align-items: center;
        h3 {
            font-size: 16px;
            font-weight: 600;
            span {
                font-size: 16px;
                font-weight: 400;
            }
        }
    }
}
`;