import React, { useState } from 'react';
import style from '../styles/index.module.scss';
import { Form, Input, message } from 'antd';
import styled from 'styled-components';
import { useSetLoadingPage } from '../../../services/UI/LoadingPage';
// import apisAuth from '../services/api';
// import storage from '../../../utils/sessionStorage';
// import { useAppDispatch } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';
// import actions from '../services/actions';
import { get } from 'lodash';
import axios from 'axios';
// import axios from 'axios';
const LoginPage = () => {
    const [form] = Form.useForm();
    const setIsLoading = useSetLoadingPage();
    const [error,] = useState('');
    const [email, setEmail] = useState('');
    // const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const [pageDisplay, setPageDisplay] = useState(false);
    // const modalConfirmRef = useRef<any>(null);

    // const setToken = (_token: string) => {
    //     dispatch(actions.setToken(_token));
    // };

    // const setupLogin = (resData: any) => {
    //     // setToken(resData?.access_token ?? '');
    //     // const merchant_code = resData?.user?.merchant?.merchant_code;
    //     // storage.merchantCode.set(merchant_code);
    //     // storage.isConfirmDevice.set('');
    //     // storage.merchantName.set(resData?.user?.merchant?.merchant_name);
    //     // storage.merchantId.set(resData?.user?.merchant?.merchant_id);
    //     // dispatch(actions.login.success(resData));

    //     navigate(
    //         '/private/room'
    //     );
    // };

    // useEffect(() => {
    //     const data = new FormData();
    //     data.append('email', 'admin123@gmail.com');
    //     data.append('password', 'admin123');

    //     const config = {
    //         method: 'post',
    //         maxBodyLength: Infinity,
    //         url: 'https://reeltimechat.000webhostapp.com/api/auth/login',
    //         data: data
    //     };

    //     axios.request(config)
    //         .then((response: { data: any; }) => {
    //             console.log(JSON.stringify(response.data));
    //         })
    //         .catch((error: any) => {
    //             console.log(error);
    //         });
    // }, []);

    const login = async (values: any) => {
        const { email, password } = values;
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);

        const config = await {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://huionline.vn/api/auth/login',
            data: data
        };

        axios.request(config)
            .then((response: { data: any; }) => {
                const token = get(response, 'data.access_token', '');
                localStorage.setItem('tokenUser', token);
                const msg = get(response, 'data.message', '');
                if (msg) {
                    message.success(msg);
                    navigate(
                        '/private/room'
                    );
                    return true;
                }
            })
            .catch((error: any) => {
                console.log(error);
            });
        setIsLoading(true);
        // try {
        //     // const res = await apisAuth.login(data);
        //     const token = get(res, 'data.access_token', '');
        //     localStorage.setItem('tokenUser', token);
        //     const msg = get(res, 'data.message', '');
        //     if (msg) {
        //         message.success(msg);
        //         navigate(
        //             '/private/room'
        //         );
        //         return true;
        //     }

        // } catch (error) {
        //     const message = get(
        //         error,
        //         'response.data.error.message',
        //         'Một lỗi đã xảy ra. Vui lòng thử lại !'
        //     );
        //     setError(message);
        //     dispatch(actions.login.fail({}));
        // } finally {
        //     setIsLoading(false);
        // }
    };

    // useEffect(() => {
    //     const currToken = storage.token.get();
    //     if (currToken) {
    //         navigate('/private/room');
    //     } else {
    //         setPageDisplay(true);
    //     }
    // }, []);

    return (
        <LoginPageStyled>
            <div className={style.container}>
                <div className={style.bg_login}>
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
                                    message: 'Vui lòng nhập password',
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
        </LoginPageStyled>
    );
};

export default LoginPage;

const LoginPageStyled = styled.div`
.ant-form {
    width: 100%;
    height: 500px;
    align-items: center;
    justify-content: center;
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