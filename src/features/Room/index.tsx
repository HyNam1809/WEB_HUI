import { Button, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RoomItem from './Forms/RoomItem';
import { Link } from 'react-router-dom';
import axios from 'axios';
import apisRoom from './services/api';
import apisAuth from '../Auth/services/api';

const RoomPage = () => {
    const [listRoom, setListRoom] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // const data = new FormData();
        const tokenUser = localStorage.getItem('tokenUser');
        console.log(tokenUser);
        const fetchData = async () => {
            try {
                const getProfile = await apisAuth.getProfile(tokenUser);
                console.log(getProfile);
                
    
                const response = await axios.request(getProfile);
                localStorage.setItem('responseUser', JSON.stringify(response.data.data.id));
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiListRoom = await apisRoom.listRoomData();
                setListRoom(apiListRoom);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchData();
    }, [loading]);

    const storedResponseUser = localStorage.getItem('responseUser') || '';
    const responseUser = storedResponseUser.slice(1, -1);

    const handleClick = async (idRoom: any) => {
        try {
            const data = new FormData();
            data.append('room_id', idRoom);
            data.append('user_id', responseUser);

            const actionResponse = await apisRoom.jobRoom(data);
            if (actionResponse) {
                message.success(actionResponse.message);
                return true;
            } else {
                message.error('Vui lòng thử lại');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) {
        return <Spin />;
    }

    return (
        <RoomStyled>
            <div className='header-room'>
                <h1>Phòng chơi</h1>
                <Link to='/private/Quick-Room'>
                    <Button>Thêm phòng</Button>
                </Link>
            </div>
            <div className='room-item'>
                {listRoom.map((o: any, index: any) => (
                    // eslint-disable-next-line react/jsx-key
                    <div onClick={() => handleClick(o.id)}>
                        <Link key={index} to={`/private/Quick-Room?roomId=${o.id}`}>
                            <RoomItem key={index} {...o} />
                        </Link>
                    </div>

                ))}
            </div>
        </RoomStyled>
    );
};

export default RoomPage;

const RoomStyled = styled.div`
display: grid;
justify-content: center;
width: 100%;
gap: 20px;
.ant-card-bordered {
    border-radius: 12px !important;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
.header-room {
    display: flex;
    justify-content: space-between;
    align-items: end;
    max-width: 1200px;
    margin-bottom: 50px;
    h1 {
        font-size: 56px;
    }
}
.room-item {
    display: grid;
    gap: 20px;
    max-width: 1200px;
    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr;
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