import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../validations/email.js';
import { validatePassword } from '../../validations/password.js';
import "./loginForm.css";

const SignUpCompanyForm = ({ onSignUp}) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPass, setIsValidPass] = useState(true);
    const [isMatchPass, setIsMatchPass] = useState(true);
  
    const navigate = useNavigate();
  
    const handleFullNameChange = (e) => {
      setFullName(e.target.value);
    };
  
    const handleEmailChange = (e) => {
      const newEmail = e.target.value;
      setEmail(newEmail);
      setIsValidEmail(validateEmail(newEmail));
    };
  
    const handlePasswordChange = (e) => {
      const newPass = e.target.value;
      setPassword(newPass)
      setIsValidPass(validatePassword(newPass));
    };
  
    const handleRetypePasswordChange = (e) => {
      const newRePass = e.target.value;
      setRetypePassword(newRePass);
      setIsMatchPass(newRePass === password);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();  
      try {
        const result = await onSignUp(fullName, email, password, true, navigate);
      } catch (error) {
        
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="form-signup">
        <div className='input-field'>
          <label>Tên công ty:</label>
          <input type="text" value={fullName} onChange={handleFullNameChange} required />
        </div>
        <div className='input-field'>
          <label>Email:{!isValidEmail && <p className='invalid-text'>Định dạng email không hợp lệ.</p>}</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div className='input-field'>
          <label>Mật khẩu:{!isValidPass && <p className='invalid-text'>Mật khẩu phải có ít nhất 8 kí tự, chứa cả chữ cái và số</p>}</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <div className='input-field'>
          <label>Nhập lại mật khẩu:{!isMatchPass && <p className='invalid-text'>Xác nhận mật khẩu không khớp</p>}</label>
          <input type="password" value={retypePassword} onChange={handleRetypePasswordChange} required />
        </div>
  
        <button type="submit" id='btnSignUp'>Đăng ký</button>
       </form>
    );
  };
  
  export default SignUpCompanyForm;