import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./login.css";
import SignUpCompanyForm from '../../components/auth/signUpCompanyForm';
const SignupCompanyScene = ({onSignUp}) =>{
    const navigate = useNavigate();

    useEffect(() => {
      if (checkUserLoggedIn()) {
        navigate('/');
      }
    }, []);
  
    const checkUserLoggedIn = () => {
      const isLoggedInHr = localStorage.getItem('isLoggedInHr');
      return (isLoggedInHr === 'true'||isLoggedInHr === true);
    };

    return (
      <div>
        <div className='login-box'>
          <h1>Đăng ký tài khoản tuyển dụng</h1>
          <img id='appLogoLogin' alt='appLogo' src="https://drive.google.com/uc?export=view&id=1uO7HR_nxudpgsJPRWcPj1Wdu9YVV7PCr"></img>
          <div className='signup-company-option'>
            <p>Bạn là ứng viên tìm việc?</p>
            <NavLink to={"/signup"}>Đăng ký tại đây</NavLink>
          </div>
          <SignUpCompanyForm onSignUp={onSignUp}/>
          <div className='signup-option'>
            <p>Bạn đã có tài khoản?</p>
            <NavLink to={"/login"}>Đăng nhập tại đây</NavLink>
          </div>
        </div>
      </div>
    )
    
}

export default SignupCompanyScene;