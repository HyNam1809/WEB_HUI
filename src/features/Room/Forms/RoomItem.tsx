import React from 'react';
import { RoomItemProps } from '../Types';
import { Card, Space } from 'antd';
import styled from 'styled-components';
import { formatMoney } from '../../../utils/unit';
import { getSingleDateShortFormat } from '../../../utils/moment/getSingleDateShortFormat';
import moment from 'moment';

const RoomItem = (data: RoomItemProps, handleClick: any) => {
    const quantityUser = data.user_count ? data.user_count : 0;

    return (
        <StyledRoomsItem>
            <Space onClick={handleClick} direction="vertical" size={16}>
                <Card
                    title={
                        <div className='item-title-container'>
                            <span className='title'>{data.title}</span>
                            {quantityUser >= 30 && <span className='enough-people'>Đã đủ người</span>}
                        </div>
                    }
                    style={{ width: 400 }}
                >
                    <div className='card-row'>
                        <img className='image-room' src={data.avatar} alt="Room Avatar" />
                    </div>
                    <div className='card-row'>
                        <h3>Thời gian bắt đầu: <span>{getSingleDateShortFormat(moment(data.date_start))}</span></h3>
                    </div>
                    <div className='card-row'>
                        <h3>Thời gian bắt đầu: <span>{getSingleDateShortFormat(moment(data.date_end))}</span></h3>
                    </div>
                    <div className='card-row'>
                        <h3>Giá hụi: <span>{formatMoney(data.price_room)}</span></h3>
                    </div>
                    <div className='card-row'>
                        <h3>Phần trăm hoa hồng: <span>{data.commission_percentage}%</span></h3>
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

    .image-room {
        width: 100%;
        height: 200px;
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
            color: red;
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