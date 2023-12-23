import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
import RoomItem from './Forms/RoomItem';
import { dataRoom } from './Data/Data';
import { Link } from 'react-router-dom';

const RoomPage = () => {

    return (
        <RoomStyled>
            <div className='header-room'>
                <Link to={'/private/Quick-Room'}>
                    <Button>Thêm phòng</Button>
                </Link>
            </div>
            <div className='room-item'>
                {dataRoom.map((o, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <Link to={`/private/Quick-Room?roomId=${o.id}`}>
                        <RoomItem key={index} {...o} />
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
.header-room {
    display: flex;
    justify-content: end;
    align-items: center;
    max-width: 1400px;
}
.room-item {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 20px;
    max-width: 1400px;
    justify-content: center;
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