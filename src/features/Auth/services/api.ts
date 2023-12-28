import axios from 'axios';
import fetch from '../../../services/request';

export const login = (body: any) => {

  return fetch({
    method: 'post',
    url: '/api/auth/login',
    body: body,

  });
};

export const getProfile = async (tokenUser: any) => {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://huionline.vn/api/auth/profile',
      headers: {
        'Authorization': `Bearer ${tokenUser}`,
      },
    };

    const response = await axios.request(config);
    localStorage.setItem('responseUser', JSON.stringify(response.data.data.id));
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const apisAuth = {
  login,
  getProfile
};

export default apisAuth;
