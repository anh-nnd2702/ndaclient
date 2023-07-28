import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Header.css";

const CandidateHeader = ({ notifications, handleClickNoti, onLogout, changeProfile, isLoggedIn }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [hasAvatar, setHasAvatar] = useState(false);
  const [isCand, setIsCand] = useState(false);
  const navigate = useNavigate();
  const [showNoti, setShowNoti] = useState(false);

  useEffect(() => {
    const storedCand = localStorage.getItem('isLoggedIn') === true || localStorage.getItem('isLoggedIn') === "true";
    setIsCand(storedCand);
    const storedFullName = localStorage.getItem('fullName');
    const storedAvatar = localStorage.getItem('avatar');
    if (storedFullName) {
      setFullName(storedFullName);
    }
    if (storedAvatar !== "" && storedAvatar !== null && storedAvatar !== 'null') {
      setAvatar({ storedAvatar });
      setHasAvatar(true);
    }
    else {
      setAvatar(``);
    }
  }, [isLoggedIn, changeProfile]);

  const handleClick = () => {
    setMobileMenu(!mobileMenu);
  }

  const handleLogout = async () => {
    await onLogout(navigate, false);
  }

  const handleClickNotiBell = () => {
    setShowNoti(!showNoti);
  }
  const handleClickNotiLink = (applyId, index) => {
    setShowNoti(false);
    navigate(`/candidateApplication/${applyId}`)
    handleClickNoti(index);
  }

  return (
    <div>
      {isCand && (
        <nav>
          <div className='menu'>
            <NavLink to="/" className="logo">
              <img id='appLogo' src="https://drive.google.com/uc?export=view&id=1uO7HR_nxudpgsJPRWcPj1Wdu9YVV7PCr" alt="App Logo" />
            </NavLink>
            <div>
              <div id='navbar' className={mobileMenu ? "#navbar active" : "#navbar"}>
                <div className='dropdown'>
                  <NavLink className="a_nav dropbtn" to="/" >Việc làm</NavLink>
                  <div className='dropdown-item'>
                    <NavLink to="/appliedJob" >Đã ứng tuyển</NavLink>
                    <NavLink to="/savedJob" >Đã lưu</NavLink>
                  </div>
                </div>
                <NavLink className="a_nav" to="/profile" >Hồ sơ</NavLink>
                <NavLink className="a_nav" to="/company" >Công ty</NavLink>
                <NavLink className="a_nav" to="/setting" >Cài đặt tìm việc</NavLink>
              </div>

              <div id="mobile" onClick={() => handleClick(mobileMenu)}>
                <i id="bar" className={mobileMenu ? 'fas fa-times' : 'fas fa-bars'} ></i>
              </div>
            </div>
          </div>

          <div className="candidate">

            <div className='candidate-info'>
              <div className="avatar-box">
                {hasAvatar ? (
                  <img className='avatar' src={avatar.storedAvatar} alt="Avatar" />
                ) : (
                  <img className='avatar' src="https://drive.google.com/uc?export=view&id=1TGmpHymRq3R-dq6eqYeIJfHgt461e6FE" alt="Default Avatar" />
                )}
              </div>
              <NavLink to="/profile"><p>{fullName}</p></NavLink>
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
                        <button className='to-view-apply' type='button' onClick={() => handleClickNotiLink(noti.applyId, index)}>Xem</button>
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

export default CandidateHeader;