import React, { useEffect, useState } from 'react';
import style from '../styles/index.module.scss';
import { Form, Input, message } from 'antd';
import styled from 'styled-components';
import { useSetLoadingPage } from '../../../services/UI/LoadingPage';
import apisAuth from '../services/api';
import { useAppDispatch } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';
import actions from '../services/actions';
import { get } from 'lodash';
import { LeftBgLogin } from '../../../assets/svg';
const LoginPage = () => {
    const [form] = Form.useForm();
    const setIsLoading = useSetLoadingPage();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const setToken = (_token: string) => {
        dispatch(actions.setToken(_token));
    };
    

    const login = async (values: any) => {
        const { email, password } = values;
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        try {
            const res = await apisAuth.login(data);

            const resData = res?.data?.data;
            setToken(resData?.access_token ?? '');

            const token = get(res, 'data.access_token', '');
            localStorage.setItem('tokenUser', token);

            const msg = get(res, 'data.message', '');
            if (msg) {
                message.success(msg);
                navigate(
                    '/private/room'
                );
                return true;
            }

        } catch (error) {
            const message = get(
                error,
                'response.data.error.message',
                'Đăng nhập thất bại !'
            );
            setError(message);
            dispatch(actions.login.fail({}));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // const currToken = storage.token.get();
        const currToken = localStorage.getItem('tokenUser');
        if (currToken) {
            navigate('/private/room');
        } else {
            // setPageDisplay(true);
        }
    }, []);

    return (
        <>
            {/* {pageDisplay ? ( */}
                <LoginPageStyled>
                    <div className={style.container}>
                        <div className={style.form_container}>
                            <div className={style.bg_login}>
                                <LeftBgLogin />
                            </div>
                            <div className={style.form}>
                                <Form
                                    onFinish={login}
                                    className='modal-form'
                                    layout='vertical'
                                    form={form}
                                >
                                    <h1 className={style.titleLogin}>Admin Đăng Nhập</h1>
                                    <Form.Item
                                        name={'email'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập email!',
                                            },
                                            {
                                                type: 'email',
                                                message: 'Vui lòng nhập đúng định dạng email!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type='email'
                                            placeholder={'Nhập Email'}
                                            autoFocus
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name={'password'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập mật khẩu',
                                            },
                                        ]}
                                    >
                                        <Input
                                            type='password'
                                            placeholder={
                                                'Nhập mật khẩu'
                                            }
                                        />
                                    </Form.Item>
                                    {!!error && (
                                        <p
                                            style={{
                                                color: 'var(--color-red)',
                                                padding: '0 0 16px',
                                            }}
                                        >
                                            {error}
                                        </p>
                                    )}

                                    <button
                                        className='btn-submit'
                                        type='submit'
                                    >
                                        Đăng nhập
                                    </button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </LoginPageStyled>
            {/* ) : null} */}
        </>
    );
};

export default LoginPage;

const LoginPageStyled = styled.div`
.ant-form {
    width: 100%;
    height: 500px;
    align-items: center;
    justify-content: center;
    padding: 0 50px;
}

.ant-form-item-label >label {
    font-size: 18px;
    font-weight: 500;
}

.ant-input-affix-wrapper {
   height: 66px;
   display: flex;
   align-items: center;
   &:focus {
        border-color: transparent;
        box-shadow: none !important;
        border: 1px solid #000000;
    }
   .ant-input {
    width: 100%;
    height: 60px;
    padding: 8px 8px !important;
    &:focus {
        border-color: transparent;
        box-shadow: none !important;
        border: 0px solid #000000;
    }
}
}

.ant-input {
    width: 100%;
    height: 66px;
    padding: 8px 16px !important;
    &:focus {
        border-color: transparent;
        box-shadow: none !important;
        border: 1px solid #000000;
    }
}

button {
    width: 100%;
    height: 56px;
    font-size: 16px;
    font-weight: 500;
    background: #EF503A;
    color: #FFFFFF;
    transition: all 0.3s ease-in;
    &:not(:disabled):not(.ant-btn-disabled):hover {
        background: #FFF0E2;
        border: 1px solid transparent;
        color: #FFFFFF;
    }
}
`;

