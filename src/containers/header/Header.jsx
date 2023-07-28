import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import "./Header.css";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const handleClick = () => {
    setMobileMenu(!mobileMenu);
  }

  return (
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
        <div>
          <NavLink to="/login">
            <button id="loginBtn">Đăng nhập</button>
          </NavLink>
          <NavLink to="/signup">
            <button id="signupBtn">Đăng ký</button>
          </NavLink>
        </div>

      </div>
    </nav>
  )
}

export default Header;
