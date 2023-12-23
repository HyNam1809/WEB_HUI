import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import StaffFormContent, { IStaffFormInput } from '../../../components/common/Imput';
import { Button, Form } from 'antd';
import { get } from 'lodash';

const QuickRoomPage = () => {
    const search = useLocation().search;
    const roomId = new URLSearchParams(search).get('roomId') || '';
    const [form] = Form.useForm();

    const [errors,] = useState<any>();

    const getFeedback = (text: string) => {
        if (!text) return {};
        return ({
            validateStatus: text ? 'error' : undefined,
            help: text ? text : undefined,
        });
    };

    const inputs: IStaffFormInput[] = useMemo(() => [
        {
            label: 'Tên phòng',
            name: 'title',
            placeholder: 'Nhập tên phòng',
            type: 'text',
            rules: [
                {
                    validator(_, value,) {
                        if (!value?.trim()) return Promise.reject(new Error('Vui lòng nhập tên phòng'));
                        return Promise.resolve();
                    },
                },
            ],
            ...getFeedback(get(errors, ['title'])),
        },
        {
            label: 'Giá hụi',
            name: 'total_money',
            placeholder: 'Nhập giá hụi',
            type: 'number',
            rules: [
                {
                    validator(_, value,) {
                        if (!value?.trim()) return Promise.reject(new Error('Vui lòng nhập giá hụi'));
                        return Promise.resolve();
                    },
                },
            ],
            ...getFeedback(get(errors, ['total_money'])),
        },
        {
            label: 'Thời gian bắt đầu',
            name: 'start_time',
            placeholder: 'DD-MM-YYY',
            type: 'date',
            // rules: [
            //     {
            //         validator(_, value,) {
            //             if (!value?.trim()) return Promise.reject(new Error('Vui lòng nhập thời gian bắt đầu'));
            //             return Promise.resolve();
            //         },
            //     },
            // ],
            ...getFeedback(get(errors, ['start_time'])),
        },
        {
            label: 'Thời gian kết thức',
            name: 'end_time',
            placeholder: 'Nhập tài khoản',
            type: 'date',
            // rules: [
            //     {
            //         validator(_, value,) {
            //             if (!value?.trim()) return Promise.reject(new Error('Vui lòng nhập thời gian kết thúc'));
            //             return Promise.resolve();
            //         },
            //     },
            // ],
            ...getFeedback(get(errors, ['end_time'])),
        },
        {
            label: 'Số lượng khách hàng',
            name: 'quantity',
            placeholder: 'Nhập số lượng khách hàng',
            type: 'number',
            rules: [
                {
                    validator(_, value,) {
                        if (!value?.trim()) return Promise.reject(new Error('Vui lòng nhập số lượng khách hàng'));
                        return Promise.resolve();
                    },
                },
            ],
            ...getFeedback(get(errors, ['quantity'])),
        },
    ], [errors]);

    return (
        <DetailRoomPageStyled>
            <Form
                className='form-info'
                form={form}
                // onFinish={handleSubmit}
                scrollToFirstError
                layout='vertical'>
                <div className='title-room'>
                    {
                        !roomId ?
                            <h1>Thêm phòng</h1> :
                            <h1>Sửa phòng: {roomId}</h1>
                    }
                </div>
                <StaffFormContent inputs={inputs} />
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