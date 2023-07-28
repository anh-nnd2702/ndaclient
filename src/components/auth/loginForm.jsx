import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../validations/email.js';
import "./loginForm.css"
const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isHr, setIsHr] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await onLogin(email, password, isHr, navigate);
    } catch (error) {
      console.log(error)
      setError(
        'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-login">
      <div className='validate-box'>
        {error && <p className="error invalid-text">{error}</p>}
      </div>
      <div className='input-field'>
        <label>Email: {!isValidEmail && <p className='invalid-text'>Định dạng email không hợp lệ.</p>}</label>
        <input type="email" value={email} onChange={handleEmailChange} required />
      </div>
      <div className='input-field'>
        <label>Mật khẩu:</label>
        <input type="password" value={password} onChange={handlePasswordChange} required />
        <div className='forgotpass-box'>
          <NavLink to="/forgotpassword">Quên mật khẩu</NavLink>
        </div>
      </div>
      <div>
        <label style={{marginLeft: "30px", paddingLeft:"30px"}}><input
          type="checkbox"
          checked={isHr}
          onChange={(e) => setIsHr(e.target.checked)}
        ></input>Tôi là nhà tuyển dụng</label>
      </div>

      <button type="submit" id='btnLogin'>Đăng nhập</button>
    </form>
  );
};

export default LoginForm;
