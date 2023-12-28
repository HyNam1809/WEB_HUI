import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, DatePicker, DatePickerProps, Form, Input, InputNumber, Select, message } from 'antd';
import { Dayjs } from 'dayjs';
import apisRoom from '../services/api';

const QuickRoomPage = () => {
    const search = useLocation().search;
    const roomId = new URLSearchParams(search).get('roomId') || '';
    const [form] = Form.useForm();
    const [title, setTitle] = useState('');
    const [priceRoom, setPriceRoom] = useState<number | null>(null);
    const [commissionPercentage, setCommissionPercentage] = useState<number | null>(null);
    const [dateEnd, setDateEnd] = useState<Dayjs | null>(null);
    const navigate = useNavigate();
    const handleSubmit = async (values: any) => {
        const { title, price_room, commission_percentage, total_user, payment_time, date_room_end } = values;
        const formattedDateEnd = date_room_end.format('YYYY-MM-DD HH:mm:ss');

        const data = new FormData();
        data.append('title', title);
        data.append('price_room', price_room);
        data.append('commission_percentage', commission_percentage);
        data.append('payment_time', payment_time);
        data.append('date_room_end', formattedDateEnd);
        data.append('total_user', total_user);

        try {
            const result = await apisRoom.addRoom(data);
            if (result) {
                message.success(result.message);
                navigate(-1);
                return true;
            }
        } catch (error: any) {
            if (error.response) {
                message.error(error.response.data.message || 'Có lỗi xảy ra từ phía server');
            } else if (error.message) {
                message.error(error.message);
            } else {
                message.error('Có lỗi xảy ra');
            }
        }
    };

    const handleDateEndChange: DatePickerProps['onChange'] = (date: Dayjs | null) => {
        setDateEnd(date);
    };

    const handlePriceRoomChange = (value: number | null) => {
        setPriceRoom(value);
    };

    const handleCommissionPercentageChange = (value: number | null) => {
        setCommissionPercentage(value);
    };

    const cancelOnclick = () => {
        navigate(-1);
    };

    return (
        <DetailRoomPageStyled>
            <Form
                className='form-info'
                form={form}
                onFinish={handleSubmit}
                scrollToFirstError
                layout='vertical'>
                <div className='title-room'>
                    {
                        !roomId ?
                            <h1>Thêm phòng</h1> :
                            <h1>Sửa phòng: {roomId}</h1>
                    }
                </div>
                <div className='laybel'>
                    <p>Tên phòng</p>
                    <Form.Item
                        name={'title'}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên phòng!',
                            },
                        ]}
                    >
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={'Nhập tên phòng'}
                            autoFocus
                        />
                    </Form.Item>
                </div>

                <div className='laybel'>
                    <p>Giá hụi</p>
                    <Form.Item
                        name={'price_room'}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giá hụi!',
                            },
                        ]}
                    >
                        <InputNumber
                            value={priceRoom}
                            onChange={handlePriceRoomChange}
                            placeholder={'Nhập giá hụi'}
                            autoFocus
                        />
                    </Form.Item>
                </div>

                <div className='laybel'>
                    <p>Hoa hồng</p>
                    <Form.Item
                        name={'commission_percentage'}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập hoa hồng!',
                            },
                        ]}
                    >
                        <InputNumber
                            value={commissionPercentage}
                            onChange={handleCommissionPercentageChange}
                            placeholder={'Nhập hoa hồng'}
                            autoFocus
                        />
                    </Form.Item>
                </div>

                <div className='laybel'>
                    <p>Tổng người dùng</p>
                    <Form.Item
                        name={'total_user'}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số lượng người dùng!',
                            },
                        ]}
                    >
                        <InputNumber
                            min={2}
                            max={30}
                            value={commissionPercentage}
                            onChange={handleCommissionPercentageChange}
                            placeholder={'Nhập số lượng người dùng'}
                            autoFocus
                        />
                    </Form.Item>
                </div>

                <div className='laybel'>
                    <p>Thời gian thanh toán</p>
                    <Form.Item
                        name={'payment_time'}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập ngày bắt đầu!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Chọn thời gian thanh toán"
                            options={[
                                {
                                    value: 'End day',
                                    label: 'Cuối ngày',
                                },
                                {
                                    value: 'End of Month',
                                    label: 'Cuối tháng',
                                },
                            ]}
                        />
                    </Form.Item>
                </div>

                <div className='laybel'>
                    <p>Ngày kết thúc phòng</p>
                    <Form.Item
                        name={'date_room_end'}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập ngày kết thúc!',
                            },
                        ]}
                    >
                        <DatePicker
                            showTime
                            value={dateEnd}
                            onChange={handleDateEndChange}
                            placeholder={'Nhập tên ngày kết thúc'}
                            autoFocus
                        />
                    </Form.Item>
                </div>

                <div className='button-container'>
                    {
                        roomId ?
                            <Button htmlType='submit'>Lưu</Button> :
                            <Button htmlType='submit'>Thêm</Button>
                    }
                    <Button htmlType='reset'>Xóa</Button>
                    <Button onClick={cancelOnclick}>Quay lại</Button>
                    {
                        roomId ?
                            <Link to={`/private/Chat?roomId=${roomId}`}>
                                <Button>Chat</Button>
                            </Link> :
                            <></>
                    }

                </div>
            </Form>
        </DetailRoomPageStyled>
    );
};

export default QuickRoomPage;

const DetailRoomPageStyled = styled.div`
display: flex;
align-items: center;
justify-content: center;
.title-room {
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
        font-size: 56px;
        font-weight: 700;
    }
}
.ant-input-number {
    width: 100%;
}
.laybel {
    width: 100%;
    display: grid;
    gap: 4px;
    p {
        font-size: 16px;
        font-weight: 600;
    }
}
.ant-form {
    display: flex;
    justify-content: start;
    align-items: center;
    max-width: 1200px;
}
.button-container {
    display: flex;
    gap: 8px;
}

Button {
    &:hover {
        color: black !important;
        border-color: #FFF0E2 !important;
        background-color: #FFF0E2;
        opacity: 0.5;
    }
}
`;