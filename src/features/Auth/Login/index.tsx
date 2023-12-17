import React, { useMemo, useState } from 'react';
import style from '../styles/index.module.scss';
import { Button, Form, message } from 'antd';
import { IStaffFormInput } from '../../../assets/Types/Input/Infex';
import { get } from 'lodash';
import StaffFormContent from '../../../components/common/Imput';
import styled from 'styled-components';

const LoginPage = () => {
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
            label: 'Tài khoản',
            name: 'userName',
            placeholder: 'Nhập tài khoản',
            type: 'text',
            rules: [
                {
                    validator(_, value,) {
                        if (!value?.trim()) return Promise.reject(new Error('Vui lòng nhập tài khoản'));
                        return Promise.resolve();
                    },
                },
            ],
            ...getFeedback(get(errors, ['full_name'])),
        },
        {
            label: 'Mật khẩu',
            name: 'password',
            placeholder: 'Nhập mật khẩu',
            type: 'password',
            rules: [
                // {
                //     validator(_, value,) {
                //         if (!value?.trim()) return Promise.reject(new Error('Vui lòng nhập mật khẩu'));
                //         return Promise.resolve();
                //     },
                // },
            ],
            ...getFeedback(get(errors, ['password'])),
        },
    ], [errors]);

    const handleSubmit = () => {
        message.success('Login Success');
    };
    return (
        <LoginPageStyled>
            <div className={style.container}>
                <div className={style.bg_login}>
                </div>
                <div className={style.form}>
                    <Form
                        className='form-info'
                        form={form}
                        onFinish={handleSubmit}
                        scrollToFirstError
                        layout='vertical'>
                        <div className={style.titleLogin}>
                            <h1>Đăng nhập Admin</h1>
                        </div>
                        <StaffFormContent inputs={inputs} />
                        <Button htmlType='submit'>Đăng nhập</Button>
                    </Form>
                </div>
            </div>
        </LoginPageStyled>
    );
};

export default LoginPage;

const LoginPageStyled = styled.div`
.ant-form {
    width: 100%;
    height: 500px;
}

.ant-form-item-label >label {
    font-size: 18px;
    font-weight: 500;
}

.ant-input-affix-wrapper {
   height: 66px;
   display: flex;
   align-items: center;
   .ant-input {
    width: 100%;
    height: 60px;
    padding: 8px 8px !important;
}
}

.ant-input {
    width: 100%;
    height: 66px;
    padding: 8px 16px !important;
}

.ant-btn-default {
    width: 100%;
    height: 56px;
    font-size: 16px;
    font-weight: 500;
    background: #EF503A;
    color: #FFFFFF;
    &:not(:disabled):not(.ant-btn-disabled):hover {
        background: #FFF0E2;
        border: 1px solid transparent;
        color: #FFFFFF;
    }
}
`;