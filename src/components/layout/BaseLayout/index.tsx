import { ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../SideBar';
import styles from './index.module.scss';
import React, { useEffect, useRef, useState } from 'react';
// import ModalConfirm, { ModalConfirmRef } from '../components/common/Modal/ModalConfirm';
import storage from '../../../utils/sessionStorage';
// import authActions from 'features/auth/services/actions';
import ModalConfirm from '../../common/Modal/ModalConfirm';

type IconType = 'delete';
type IConfigs = { title: string, msg: string, submit: any, icon?: JSX.Element | null | IconType };
export type ModalConfirmRef = {
    show: (configs: IConfigs) => void
    hide: () => void;
  }

const BaseLayout = () => {
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const isConfirmDevice = storage.isConfirmDevice.get();
  const modalConfirmRef = useRef<ModalConfirmRef>(null);

  useEffect(() => {
    if(isConfirmDevice) {
      modalConfirmRef.current?.show({
        title: 'Force Logout',
        msg: 'Sorry, you have been logged out of your account because another device has logged in.',
        submit: async () => {
        //   dispatch(authActions.logout.fetch());
        },
      });
    }
  },[isConfirmDevice]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'var(--color-primary)',
          fontFamily: '"Inter", sans-serif',
        },
      }}
    >
      <div className='container'>
        <Header />
        <main className={styles.private_content}>
          <Sidebar
            setIsShowSidebar={setIsShowSidebar}
            isShowSidebar={isShowSidebar}
          />
          <div className={`private-wrapper ${isShowSidebar && 'is-show-sidebar'}`}>
            <div className={styles.content_inner}>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
      <ModalConfirm ref={modalConfirmRef} showClose={false} />
    </ConfigProvider>
  );
};

export default BaseLayout;
