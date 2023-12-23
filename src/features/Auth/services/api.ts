import fetch from '../../../services/request';

export const login = (body: any) => {
    return fetch({
      method: 'post',
      url: 'api/login',
      body,
    });
  };

  const apisAuth = {
    login,
  };
  
  export default apisAuth;
  