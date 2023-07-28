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

  /*useEffect(()=>{
    if (checkUserLoggedIn()) {
      navigate('/'); 
    }
    else if(checkHrLoggedIn()){
      navigate('/companyDashboard')
    }
  },[isLoggedIn, isLoggedInHr])*/

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
      <img id='appLogoLogin' alt='appLogo' src="https://drive.google.com/uc?export=view&id=1vJ_eEMn2mcKKpjpwwrc2uRvMbwzscJ9T"></img>
      <LoginForm onLogin={onLogin}/>
      <div className='signup-option'>
        <p>Bạn chưa có tài khoản?</p>
        <NavLink to={"/signup"}>Đăng ký ngay</NavLink>
      </div>
    </div>
  );
};

export default LoginScene;
