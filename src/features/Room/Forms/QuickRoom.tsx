import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Button, DatePicker, DatePickerProps, Form, Input, InputNumber } from 'antd';
import { Dayjs } from 'dayjs';
import axios from 'axios';
import moment from 'moment';

const QuickRoomPage = () => {
    const search = useLocation().search;
    const roomId = new URLSearchParams(search).get('roomId') || '';
    const [form] = Form.useForm();
    const [title, setTitle] = useState('');
    const [priceRoom, setPriceRoom] = useState<number | null>(null);
    // const [avatarRoom, setAvatarRoom] = useState<any>();
    const [commissionPercentage, setCommissionPercentage] = useState<number | null>(null);
    const [dateStart, setDateStart] = useState<Dayjs | null>(null);
    const [dateEnd, setDateEnd] = useState<Dayjs | null>(null);

    const handleSubmit = async (values: any) => {
        const { title, price_room, avatar, commission_percentage, date_start, date_end } = values;
        const formattedDateStart = moment(date_start).format('YYYY-MM-DD HH:mm:ss');
        const formattedDateEnd = moment(date_end).format('YYYY-MM-DD HH:mm:ss');
        const data = new FormData();
        data.append('title', title);
        data.append('price_room', price_room);
        // data.append('avatar', avatar);
        data.append('commission_percentage', commission_percentage);
        data.append('date_start', formattedDateStart);
        data.append('date_end', formattedDateEnd);


        const config = await {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://huionline.vn/api/room/addroom',
            data: data
        };

        axios.request(config)
            .then((response: { data: any; }) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    const handleDateEndChange: DatePickerProps['onChange'] = (date: Dayjs | null) => {
        setDateEnd(date);
    };

    const handleDateStartChange: DatePickerProps['onChange'] = (date: Dayjs | null) => {
        setDateStart(date);
    };

    const handlePriceRoomChange = (value: number | null) => {
        setPriceRoom(value);
    };

    const handleCommissionPercentageChange = (value: number | null) => {
        setCommissionPercentage(value);
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

                {/* <div>
                    <p>Hình</p>
                    <Form.Item
                        name={'avatar'}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng thêm hình!',
                            },
                        ]}
                    >
                        <input
                            value={avatarRoom}
                            type='file'
                            onChange={(e) => setAvatarRoom(e.target.value)}
                            placeholder={'Thêm hình'}
                            autoFocus
                        />
                    </Form.Item>
                </div> */}

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
                    <p>Giờ bắt đầu</p>
                    <Form.Item
                        name={'date_start'}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giờ bắt đầu!',
                            },
                        ]}
                    >
                        <DatePicker
                            value={dateStart}
                            onChange={handleDateStartChange}
                            placeholder={'Nhập giờ bắt đầu'}
                            autoFocus
                        />
                    </Form.Item>
                </div>

                <div className='laybel'>
                    <p>Giờ kết thúc</p>
                    <Form.Item
                        name={'date_end'}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giờ kết thúc!',
                            },
                        ]}
                    >
                        <DatePicker
                            value={dateEnd}
                            onChange={handleDateEndChange}
                            placeholder={'Nhập tên giờ kết thúc'}
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
                    <Button htmlType='reset'>Hủy</Button>
                    <Link to={`/private/Chat?roomId=${roomId}`}>
                        <Button>Chat</Button>
                    </Link>
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