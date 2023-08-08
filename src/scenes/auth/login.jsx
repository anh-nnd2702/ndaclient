import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/loginForm';
import "./login.css"
const LoginScene = ({onLogin}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (checkUserLoggedIn()) {
      navigate('/'); 
    }
    else if(checkHrLoggedIn()){
      navigate('/companyDashboard')
    }
  }, []);

  const checkHrLoggedIn = () => {
    const isLogInHr = localStorage.getItem('isLoggedInHr');
    return isLogInHr === 'true'|| isLogInHr === true;
  };

  const checkUserLoggedIn = () => {
    const isLogIn = localStorage.getItem('isLoggedIn');
    return isLogIn === 'true'|| isLogIn === true;
  };
  return (
    <div className='login-box'>
      <h1>Chào mừng bạn quay trở lại</h1>
      <img id='appLogoLogin' alt='appLogo' src="https://drive.google.com/uc?export=view&id=1uO7HR_nxudpgsJPRWcPj1Wdu9YVV7PCr"></img>
      <LoginForm onLogin={onLogin} isAminLogin={false}/>
      <div className='signup-option'>
        <p>Bạn chưa có tài khoản?</p>
        <NavLink to={"/signup"}>Đăng ký ngay</NavLink>
      </div>
    </div>
  );
};

export default LoginScene;
