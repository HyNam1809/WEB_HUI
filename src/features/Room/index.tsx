import { Button, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RoomItem from './Forms/RoomItem';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { get } from 'lodash';

const RoomPage = () => {
    const [listRoom, setListRoom] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = new FormData();
        const tokenUser = localStorage.getItem('tokenUser');

        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://huionline.vn/api/auth/profile',
            headers: {
                'Authorization': `Bearer ${tokenUser}`,
            },
            data: data
        };

        axios.request(config)
            .then((response: { data: any; }) => {
                localStorage.setItem('responseUser', JSON.stringify(response.data.data.id));
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://huionline.vn/api/rooms/10');
                const apiListRoom = get(response, 'data.data', []);
                setListRoom(apiListRoom);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [loading]);

    const storedResponseUser = localStorage.getItem('responseUser') || '';
    const responseUser = storedResponseUser.slice(1, -1);
    console.log('responseUser', responseUser);

    const handleClick = async (idRoom: any) => {
        try {
            const data = new FormData();
            data.append('room_id', idRoom);
            data.append('user_id', responseUser);

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://huionline.vn/api/room/actionroom',
                data: data,
            };

            const response = await axios.request(config);
            console.log(JSON.stringify(response.data));
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
                <Link to='/private/Quick-Room'>
                    <Button>Thêm phòng</Button>
                </Link>
            </div>
            <div className='room-item'>
                {listRoom.map((o: any, index: any) => (
                    <Link key={index} to={`/private/Quick-Room?roomId=${o.id}`}>
                        <RoomItem handleClick={handleClick(o.id)} key={index} {...o} />
                    </Link>
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
    border: 1px solid #EF503A !important;
    border-radius: 12px !important;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
.header-room {
    display: flex;
    justify-content: end;
    align-items: center;
    max-width: 1200px;
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