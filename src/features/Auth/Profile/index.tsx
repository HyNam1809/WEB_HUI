import React from 'react';
import apisLogOut from '../../../components/layout/SideBar/service/api';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();
    
    const logoutUser = async () => {
        try {
            const data = new FormData();
            const apiLogOutPromise = apisLogOut.logOut(data);
            const apiLogOut = await apiLogOutPromise;
            if (apiLogOut) {
                message.success(apiLogOut.message);
                localStorage.removeItem('tokenUser');
                navigate('/');
            }
            return apiLogOut.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    return (
        <div>
            <Button onClick={logoutUser}>Đăng xuất</Button>
        </div>
    );
};

export default ProfilePage;