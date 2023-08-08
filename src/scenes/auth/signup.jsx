import React, { useEffect } from 'react';
import SignUpForm from '../../components/auth/signupForm';
import "./login.css"
import { NavLink, useNavigate } from 'react-router-dom';
const SignUpScene = ({ onSignUp }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (checkUserLoggedIn()) {
      navigate('/');
    }
  }, []);

  const checkUserLoggedIn = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn === 'true';
  };
  return (
    <div>
      <div className='login-box'>
        <h1>Đăng ký tài khoản mới</h1>
        <img id='appLogoLogin' alt='appLogo' src="https://drive.google.com/uc?export=view&id=1uO7HR_nxudpgsJPRWcPj1Wdu9YVV7PCr"></img>
        <div className='signup-company-option'>
          <p>Bạn là nhà tuyển dụng?</p>
          <NavLink to={"/signupCompany"}>Đăng ký tại đây</NavLink>
        </div>
        <SignUpForm onSignUp={onSignUp} />
        <div className='signup-option'>
          <p>Bạn đã có tài khoản?</p>
          <NavLink to={"/login"}>Đăng nhập tại đây</NavLink>
        </div>
      </div>
    </div>
  )
}
export default SignUpScene;