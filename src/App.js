import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { createHrSocketConnection, createCandSocketConnection, disconnectSocket, listenApplyNotifications, listenCompanyNotifications, checkConnectionStatus } from './utils/socket.js';
import { logout, signUp, login, signUpCompany, loginCompany, logoutHr } from './apis/auth';
import DOMAIN from './config';
import Header from './containers/header/Header';
import CandidateHeader from './containers/header/candidateHeader';
import CompanyHeader from './containers/header/companyHeader';
import LoginScene from './scenes/auth/login';
import AllJob from './scenes/allJob/allJob';
import ProfileScene from './scenes/profile/profile';
import AllCompany from './scenes/allcompany/company';
import SignUpScene from './scenes/auth/signup';
import ForgotPassScene from './scenes/auth/forgotpass';
import SettingScene from './scenes/candidateSetting/candidateSetting';
import JobScene from './scenes/jobDetail/jobDetail';
import CreateCvScene from './scenes/createCv/createCv';
import CompanyDashboard from './scenes/companyDashboard/dashboard';
import SignupCompanyScene from './scenes/auth/signupCompany';
import CreateJobScene from './scenes/createJob/createNewJob';
import FindCandidateCv from './scenes/findCandidate/finCv'
import JobApplicationScene from './scenes/jobApplications/jobApplication';
import ViewApplication from './scenes/viewApplication/viewApplication';
import ViewCv from './scenes/viewCv/viewCv';
import CandidateAppliedJob from './scenes/appliedJob/appliedJob';
import CandidateSavedJob from './scenes/savedJob/savedJob';
import CompanyProfileScene from './scenes/companyProfile/companyProfile'
import UpdateJobScene from './scenes/updateJob/updateJob';
import UpdateCvScene from './scenes/updateCv/updateCv';
import CandidateApplication from './scenes/viewApplication/candidateApplication';
import './App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChangedProfile, setIsChangedProfile] = useState(false);
  const [isLoggedInHr, setIsLoggedInHr] = useState(false);
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);
  const [companyNotifi, setCompanyNotifi] = useState([]);
  const [candidateNotifi, setCandidateNotifi] = useState([]);
  useEffect(() => {
    checkLoginStatus();
    checkLoginHrStatus();
    const companyId = localStorage.getItem('companyId'); // Lấy companyId từ localStorage
    const isConnected = checkConnectionStatus(); // Kiểm tra trạng thái kết nối
    if (isLoggedInHr && !isConnected) {
      const socket = createHrSocketConnection(DOMAIN, companyId);
      if (socket) {
        listenCompanyNotifications(socket, handleCompanyNotification);
        setSocket(socket);
        socketRef.current = socket;
      }
    }
    return () => {
      if (socketRef.current) {
        disconnectSocket(socketRef.current);
        socketRef.current = null;
      }
    };
  }, [isLoggedInHr]);

  useEffect(() => {
    checkLoginStatus();
    const candidateId = localStorage.getItem('candidateId');
    const isConnected = checkConnectionStatus();
    if (isLoggedIn && !isConnected) {
      const socket = createCandSocketConnection(DOMAIN, candidateId);
      if (socket) {
        listenApplyNotifications(socket, handleCandidateNotification);
        setSocket(socket);
        socketRef.current = socket;
      }
    }
    return () => {
      if (socketRef.current) {
        disconnectSocket(socketRef.current);
        socketRef.current = null;
      }
    };

  }, [isLoggedIn]);

  const checkLoginHrStatus = () => {
    const isLoggedInHr = localStorage.getItem('isLoggedInHr') === 'true';
    setIsLoggedInHr(isLoggedInHr);
  };

  const checkLoginStatus = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(isLoggedIn);
  };

  const handleCompanyNotification = (data) => {
    setCompanyNotifi((prevNotifi) => [...prevNotifi, data]);
    console.log(companyNotifi);
    console.log('Received notification:', data);
  };

  const handleCandidateNotification = (data) => {
    setCandidateNotifi((prevNotifi) => [...prevNotifi, data]);
    console.log(candidateNotifi);
    console.log('Received notification:', data);
  };

  const handleSignUp = async (fullName, email, password, isHr, navigate) => {
    try {
      if (isHr) {
        const companyName = fullName;
        const companyPass = password;
        const infor = await signUpCompany(companyName, email, companyPass);
        setIsLoggedInHr(true);
        navigate("/companyProfile");
        toast.success('Đăng kí thành công', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 800,
        });
      }
      else {
        const infor = await signUp(fullName, email, password);
        setIsLoggedIn(true);
        navigate(-1);
        toast.success('Đăng kí thành công', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 800,
        });
      }
    } catch (error) {
      toast.error(`Đăng ký thất bại: ${error}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  }

  const handleLogin = async (email, password, isHr, navigate) => {
    try {
      if (isHr) {
        const companyPass = password;
        const infor = await loginCompany(email, companyPass);
        navigate("/companyDashboard");
        toast.success('Đăng nhập thành công', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 800,
        });
        if (infor) {
          setIsLoggedInHr(true);
          return () => {
            disconnectSocket(socket);
          };
        }
      }
      else {
        const infor = await login(email, password);
        navigate('/');
        toast.success('Đăng nhập thành công', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 800,
        });
        if (infor) {
          setIsLoggedIn(true);
          return () => {
            disconnectSocket(socket);
          };
        }
      }

    } catch (error) {
      throw error;
    }
  }

  const handleChangeProfile = (isChanged) => {
    if (isChanged) {
      setIsChangedProfile(!isChangedProfile);
      toast.success('Thay đổi thông tin thành công!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  }

  const handleReadCompanyNoti = (index) => {
    if (index >= 0) {
      setCompanyNotifi(prevNotifi => {
        const updatedNotifi = [...prevNotifi];
        updatedNotifi.splice(index, 1);
        return updatedNotifi;
      });
    }
  }

  const handleReadCandidateNoti = (index) => {
    if (index >= 0) {
      setCandidateNotifi(prevNotifi => {
        const updatedNotifi = [...prevNotifi];
        updatedNotifi.splice(index, 1);
        return updatedNotifi;
      });
    }
  }

  const handleLogout = async (navigate, isHr) => {
    try {
      if (isHr) {
        const loggedout = await logoutHr();
        if (loggedout) {
          if (checkConnectionStatus()) {
            disconnectSocket(socket);
          }
          setIsLoggedInHr(false);
          toast.success('Bạn đã đăng xuất', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          navigate('/login');
        }
      }
      else {
        const loggedout = await logout();
        if (loggedout) {
          if (checkConnectionStatus()) {
            disconnectSocket(socket);
          }
          setIsLoggedIn(false);
          toast.success('Bạn đã đăng xuất', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          navigate('/login');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Có lỗi xảy ra trong quá trình đăng xuất', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  };

  return (
    <div className='app'>
      <Router>
        {isLoggedIn && <CandidateHeader notifications={candidateNotifi} handleClickNoti={handleReadCandidateNoti} onLogout={handleLogout} changeProfile={handleChangeProfile} isLoggedIn={isLoggedIn} />}
        {isLoggedInHr && <CompanyHeader notifications={companyNotifi} handleClickNoti={handleReadCompanyNoti} onLogout={handleLogout} changeProfile={handleChangeProfile} isLoggedInHr={isLoggedInHr} />}
        {(!isLoggedIn && !isLoggedInHr) && <Header />}
        <Routes>
          <Route exact path='/' element={<AllJob isHr={isLoggedInHr}/>} />
          <Route path='/login' element={<LoginScene onLogin={handleLogin}/>} />
          <Route path='/company' element={<AllCompany />} />
          <Route path='/setting' element={<SettingScene isLoggedIn={isLoggedIn} />} />
          <Route path='/signup' element={<SignUpScene onSignUp={handleSignUp} />} />
          <Route path='/forgotpassword' element={<ForgotPassScene />} />
          <Route exact path='/job/:jobId' element={<JobScene isLoggedIn={isLoggedIn} />} />
          <Route path='/companyDashboard' element={<CompanyDashboard isLoggedInHr={isLoggedInHr} />} />
          <Route path='/profile' element={<ProfileScene isLoggedIn={isLoggedIn} onChangeProfile={handleChangeProfile} />} />
          <Route path='/signupCompany' element={<SignupCompanyScene onSignUp={handleSignUp} />} />
          <Route path='/createCv' element={<CreateCvScene isLoggedIn={isLoggedIn} />}></Route>
          <Route path='/newJob' element={<CreateJobScene isLoggedInHr={isLoggedInHr} />} />
          <Route path='/findCv' element={<FindCandidateCv isLoggedInHr={isLoggedInHr} />} />
          <Route path='/jobApplications/:jobId' element={<JobApplicationScene isLoggedInHr={isLoggedInHr} />} />
          <Route path='/viewApplication/:applyId' element={<ViewApplication />} />
          <Route path='/viewCv/:cvId' element={<ViewCv />} />
          <Route path='/savedJob' element={<CandidateSavedJob isLoggedIn={isLoggedIn} />} />
          <Route path='/appliedJob' element={<CandidateAppliedJob isLoggedIn={isLoggedIn} />} />
          <Route path='/companyProfile' element={<CompanyProfileScene isLoggedInHr={isLoggedInHr} onChangeProfile={handleChangeProfile} />} />
          <Route path='/updateJob/:jobId' element={<UpdateJobScene isLoggedInHr={isLoggedInHr} />} />
          <Route path='/updateCv/:cvId' element={<UpdateCvScene isLoggedIn={isLoggedIn} />} />
          <Route path='candidateApplication/:applyId' element={<CandidateApplication isLoggedIn={isLoggedIn} />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App;
