import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validatePassword } from '../../validations/password.js';
import { candidateUpdatePassword } from '../../apis/auth.js';
import "./login.css";

const ResetPassword = ({ }) => {
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [isValidPass, setIsValidPass] = useState(true);
    const [isMatchPass, setIsMatchPass] = useState(true);
    const token = useParams()

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
            const result = await candidateUpdatePassword(token.token, password)
            window.alert(result.data.message)
        } catch (error) {
            console.log(error);
            window.alert("Đã có lỗi xảy ra khi cập nhật mật khẩu!")
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-signup">
                <div className='input-field'>
                    <label>Mật khẩu mới:{!isValidPass && <p className='invalid-text'>Mật khẩu phải có ít nhất 8 kí tự, chứa cả chữ cái và số</p>}</label>
                    <input type="password" value={password} onChange={handlePasswordChange} required />
                </div>
                <div className='input-field'>
                    <label>Nhập lại mật khẩu:{!isMatchPass && <p className='invalid-text'>Xác nhận mật khẩu không khớp</p>}</label>
                    <input type="password" value={retypePassword} onChange={handleRetypePasswordChange} required />
                </div>
                <button type="submit" id='btnSignUp'>Đổi mật khẩu</button>
            </form>
        </div>
    );
};

export default ResetPassword;