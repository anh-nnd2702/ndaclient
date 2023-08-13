import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import LoginForm from "../../components/auth/loginForm";
const AdminLogin = ({onLogin}) =>{
    const navigate = useNavigate();

    useEffect(() => {
      if (checkUserLoggedIn()) {
        navigate('/'); 
      }
      else if(checkHrLoggedIn()){
        navigate('/companyDashboard')
      }
      else if(checkAdminLogin()){
        navigate('/admin')
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

    const checkAdminLogin = () =>{
        const isLogInAdmin = localStorage.getItem('isAdmin');
        return isLogInAdmin === 'true'|| isLogInAdmin === true;
    }

    return (
        <div className='login-box'>
        <h1>Đăng nhập quản trị viên</h1>
        <img id='appLogoLogin' alt='appLogo' src="https://drive.google.com/uc?export=view&id=1uO7HR_nxudpgsJPRWcPj1Wdu9YVV7PCr"></img>
            <LoginForm onLogin={onLogin} isAminLogin={true}/>
        </div>

    )

}

export default AdminLogin;