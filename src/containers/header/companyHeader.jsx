import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Header.css";

const CompanyHeader = ({ notifications, handleClickNoti, onLogout, changeProfile, isLoggedInHr }) => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [isCompanyHr, setIsCompanyHr] = useState(false);
    const [logo, setLogo] = useState(null);
    const [companyId, setId] = useState("")
    const navigate = useNavigate();
    const [showNoti, setShowNoti] = useState(false);
    useEffect(() => {
        const storedHr = localStorage.getItem("isLoggedInHr") === true || localStorage.getItem("isLoggedInHr") === "true";
        const storedName = localStorage.getItem("companyName");
        const storedLogo = localStorage.getItem("logo");

        if (storedName) {
            setCompanyName(storedName);
        }

        if (storedHr) {
            setIsCompanyHr(true);
            setId(localStorage.getItem("companyId"))
        }
        else setIsCompanyHr(false);
        if (storedLogo) {
            setLogo(storedLogo);
        }
        else {
            setLogo("")
        }
    }, [isLoggedInHr, changeProfile]);

    const handleClick = () => {
        setMobileMenu(!mobileMenu);
    }

    const handleLogout = async () => {
        await onLogout(navigate, true);
    }
    const handleClickNotiBell = () => {
        setShowNoti(!showNoti);
    }
    const handleClickNotiLink = (applyId, index)=>{
        setShowNoti(false);
        navigate(`/viewApplication/${applyId}`)
        handleClickNoti(index);
    }

    return (
        <div>
            {isCompanyHr && (
                <nav>
                    <div className='menu'>
                        <NavLink to="/companyDashboard" className="logo">
                            <img id='appLogo' src="https://drive.google.com/uc?export=view&id=1uO7HR_nxudpgsJPRWcPj1Wdu9YVV7PCr" alt="App Logo" />
                        </NavLink>
                        <div>
                            <div id='navbar' className={mobileMenu ? "#navbar active" : "#navbar"}>
                                <NavLink className="a_nav" to="/companyDashboard" >Trang chủ</NavLink>
                                <NavLink className="a_nav" to="/findCv" >Tìm ứng viên</NavLink>
                                <NavLink className="a_nav" to="/newJob" >Đăng tin</NavLink>
                            </div>

                            <div id="mobile" onClick={() => handleClick(mobileMenu)}>
                                <i id="bar" className={mobileMenu ? 'fas fa-times' : 'fas fa-bars'} ></i>
                            </div>
                        </div>
                    </div>

                    <div className='candidate'>
                        <div className='candidate-info'>
                            <div className="avatar-box">
                                {logo !== "" ? (
                                    <img className='avatar' src={logo} alt="logo Img" />
                                ) : (
                                    <img className='avatar' src="https://drive.google.com/uc?export=view&id=1WaXr3NCH6M8_xdwwwYiNNXpgvoMjlFTl" alt="Default Logo" />
                                )}
                            </div>
                            <NavLink to="/companyProfile"><p>{companyName}</p></NavLink>
                            <div>
                                <i className='fa-solid fa-bell notification-icon' onClick={handleClickNotiBell}></i>
                                {(notifications && notifications.length > 0) &&
                                    <span className="notification-count">{notifications.length}</span>
                                }
                            </div>
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

export default CompanyHeader;