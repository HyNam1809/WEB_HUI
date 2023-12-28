import axios from 'axios';
import { IRoomData } from './types/room';
const DOMAIN = 'https://huionline.vn/';
const fetchData = async () => {
    try {
        const response = await axios.get(DOMAIN + 'api/rooms/100');
        return response.data.data as IRoomData[];
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

const addRoom = async (data: any) => {
    try {
        const response = await axios.post(DOMAIN + 'api/room/addroom', data, {
            maxBodyLength: Infinity,
        });
        return response.data;
    } catch (error) {
        console.error('Error adding room:', error);
        throw error;
    }
};

const jobRoom = async (data: any) => {
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: DOMAIN + 'api/room/actionroom',
        data: data,
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error('Error calling action room API:', error);
        throw error;
    }
};

const apisRoom = {
    listRoomData: fetchData,
    addRoom: addRoom,
    jobRoom: jobRoom
};

export default apisRoom;