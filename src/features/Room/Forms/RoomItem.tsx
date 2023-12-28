import React from 'react';
import { RoomItemProps } from '../Types';
import { Card, Space } from 'antd';
import styled from 'styled-components';
import { formatMoney } from '../../../utils/unit';
import { getSingleDateShortFormat } from '../../../utils/moment/getSingleDateShortFormat';
import moment from 'moment';

const RoomItem = (data: RoomItemProps) => {
    const quantityUser = data.user_count ? data.user_count : 0;
    const paymentTime = data.payment_time === 'End of Month' ? 'Cuối tháng' : 'Cuối ngày';
    return (
        <StyledRoomsItem>
            <Space direction="vertical" size={16}>
                <Card
                    title={
                        <div className='item-title-container'>
                            <span className='title'>{data.title}</span>
                            {quantityUser >= data.total_user && <span className='enough-people'>Đã đủ người</span>}
                        </div>
                    }
                    style={{ width: 350 }}
                >
                    {/* <div className='card-row'>
                        {
                            data.avatar ?
                                <img className='image-room' src={data.avatar} alt="Room Avatar" /> :
                                <p className='avatar-room'>{data.title.charAt(0)}</p>
                        }

                    </div> */}
                    <div className='card-row'>
                        <h3>Thời gian thanh toán: <span>{paymentTime}</span></h3>
                    </div>
                    <div className='card-row'>
                        <h3>Kết thúc phòng: <span>{getSingleDateShortFormat(moment(data.date_room_end))}</span></h3>
                    </div>
                    <div className='card-row'>
                        <h3>Giá hụi: <span>{formatMoney(data.price_room)}</span></h3>
                    </div>
                    <div className='card-row'>
                        <h3>Phần trăm hoa hồng: <span>{data.commission_percentage}%</span></h3>
                    </div>
                    <div className='card-row'>
                        <h3>Số lượng người chơi: <span>{quantityUser}/{data.total_user}</span></h3>
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
        border-radius: 16px;
    }

    .avatar-room {
        width: 100%;
        height: 200px;
        border-radius: 50%;
        background-color: #EF503A;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 80px;
        font-weight: 700;
        color: #FFFFFF;
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