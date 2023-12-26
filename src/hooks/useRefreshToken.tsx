import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// import { useAppDispatch } from '../store/hooks';
import storage from '../utils/sessionStorage';

type ShieldComponent = ((props: any) => JSX.Element) | React.LazyExoticComponent<(props: any) => JSX.Element>;

const useRefreshToken = () => {
    // const dispatch = useAppDispatch();
    // const token = authSelectors.getToken();
    const token = localStorage.getItem('tokenUser');
    // const loading = uiSelector.getRefreshTokenLoading();
    const loading = '';
    const location = useLocation();
    const refreshToken = () => {
        const href = window.location.href;
        const fileNamePart = location?.pathname !== '/' ? href.slice(href.search(location?.pathname)) : '';
        storage.pathname.set(fileNamePart);
        // dispatch(authActions.refreshToken({ pathname: fileNamePart }));
    };
    useEffect(() => { refreshToken(); }, []);
    const shield = (Component: ShieldComponent) => {
        // if (!token) return <Navigate to={'/sign-in'} replace />;
        if (!token) return <Navigate to={'/'} replace />;
        // return <Suspense><Component /></Suspense>;
        return <Component />;
    };

    return { loading, token, shield };
};

export default useRefreshToken;