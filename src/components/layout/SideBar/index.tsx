import React, { useState } from 'react';
import { PATH } from '../../../constants/path.enum';
import styles from './index.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
    setIsShowSidebar: any;
    isShowSidebar: boolean;
};

const SideBar = (props: Props) => {
    const { isShowSidebar, } = props;
    const [, setOpenSubSidebar] = useState(false);

    const getNavbar = () => {
        return [
            {
                text: 'Quản lý phòng',
                path: PATH.Room,
                // icon: <IconCalendar />,
            },
            {
                text: 'Quản lý khách hàng',
                path: PATH.Customer,
            },
            {
                text: 'Quản lý hóa đơn',
                path: PATH.Invoice,
            },
            {
                text: 'Thông tin cá nhân',
                path: PATH.Profile,
            },

        ];
    };

    const activeStyle = {
        background: '#FFFFFF',
        color: '#000000',
    };

    return (
        <>
            <aside
                className={`${styles.aside} ${isShowSidebar ? styles.aside_show : undefined}`}
            >
                <div className={styles.aside_inner}>
                    <div className={styles.aside_logo}>
                        <h1>Admin</h1>
                        <p>Hy Nam</p>
                    </div>
                    <ul className={styles.list_navbar}>
                        {getNavbar().map((nav) => {
                            const { text, path } = nav;
                            return (
                                <li key={path} className={`${styles.navbar_item}`} onClick={(e) => {
                                    e.stopPropagation();
                                }}>
                                    <NavLink
                                        reloadDocument={path === PATH.Room}
                                        to={path}
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                        className={({ isActive }) =>
                                            isActive ? styles.navbar_link_active : undefined
                                        }
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenSubSidebar(false);
                                        }}
                                    >
                                        <span>{text}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default SideBar;