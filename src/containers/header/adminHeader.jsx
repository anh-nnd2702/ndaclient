import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Header.css";

const AdminHeader = ({isAdmin, onLogout , notifications, handleClickNoti}) => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [isLoggedInAdmin, setIsLoggedInAdmin] = useState(false);
    const navigate = useNavigate();
    const [showNoti, setShowNoti] = useState(false);
    useEffect(() => {
        const loggedInAdmin = localStorage.getItem("isAdmin") === true || localStorage.getItem("isAdmin") === "true";
        setIsLoggedInAdmin(loggedInAdmin);
    }, [isAdmin]);

    const handleClick = () => {
        setMobileMenu(!mobileMenu);
    }

    const handleLogout = async () => {
        await onLogout(navigate);
    }
    const handleClickNotiBell = () => {
        setShowNoti(!showNoti);
    }
    const handleClickNotiLink = (applyId, index)=>{
        setShowNoti(false);
        //navigate(`/viewApplication/${applyId}`)
        handleClickNoti(index);
    }

    return (
        <div>
            {isLoggedInAdmin && (
                <nav>
                    <div className='menu'>
                        <NavLink to="/companyDashboard" className="logo">
                            <img id='appLogo' src="https://drive.google.com/uc?export=view&id=1uO7HR_nxudpgsJPRWcPj1Wdu9YVV7PCr" alt="App Logo" />
                        </NavLink>
                        <div>
                            <div id='navbar' className={mobileMenu ? "#navbar active" : "#navbar"}>
                                <NavLink className="a_nav" to="/admin" >Trang chủ</NavLink>
                                <NavLink className="a_nav" to="/reportJob" >Báo cáo</NavLink>
                                <NavLink className="a_nav" to="/company" >Nhà tuyển dụng</NavLink>
                            </div>

                            <div id="mobile" onClick={() => handleClick(mobileMenu)}>
                                <i id="bar" className={mobileMenu ? 'fas fa-times' : 'fas fa-bars'} ></i>
                            </div>
                        </div>
                    </div>

                    <div className='candidate'>
                        <div className='candidate-info'>
                            <div className="avatar-box">
                                <img className='avatar' src="https://drive.google.com/uc?export=view&id=1TGmpHymRq3R-dq6eqYeIJfHgt461e6FE" alt="Default Avatar" />
                            </div>
                            <p>Quản trị viên</p>
                            {/*<div>
                                <i className='fa-solid fa-bell notification-icon' onClick={handleClickNotiBell}></i>
                                {(notifications && notifications.length > 0) &&
                                    <span className="notification-count">{notifications.length}</span>
                                }
                            </div>*/}
                            <div className='btn-logout'>
                                <button id="logoutBtn" onClick={handleLogout}>Đăng xuất</button>
                            </div>
                            {showNoti && (
                                <div className='notification-popup'>
                                    {notifications && notifications.length > 0 ? (
                                        notifications.map((noti, index) => (
                                            <div key={index} className="notification-item">
                                                <span>{noti.message}</span>
                                                <button className='to-view-apply' type='button' onClick={()=>handleClickNotiLink(noti.applyId, index)}>Xem ngay</button>
                                            </div>
                                        ))
                                    ) : (
                                        <span>Bạn không có thông báo mới nào!</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            )
            }
        </div>
    )

}

export default AdminHeader;