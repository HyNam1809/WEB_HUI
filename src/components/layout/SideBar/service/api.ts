import axios from 'axios';
const DOMAIN = 'https://huionline.vn/';
const logOut = async (data: any) => {
    const tokenUser = localStorage.getItem('tokenUser');
    console.log(tokenUser);
    
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: DOMAIN + 'api/auth/logout',
        headers: { 
          'Accept': 'application/json', 
          'Authorization': `Bearer ${tokenUser}`
        },
        data : data
      };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error('Error calling action room API:', error);
        throw error;
    }
};

const apisLogOut = {
    logOut: logOut
};

export default apisLogOut;