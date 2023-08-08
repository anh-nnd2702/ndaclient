import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import "./login.css";
import { validateEmail } from '../../validations/email.js';
import { hrChangePasswordRequest, candidateChangePasswordRequest } from "../../apis/auth.js"
const ForgotPassScene = () => {
    const [email, setEmail] = useState("");
    const [isHr, setIsHr] = useState("");
    const [error, setError] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsValidEmail(validateEmail(newEmail));
    };

    const handleSubmitEmail = async () => {
        setIsSubmitting(true);
        if (!isValidEmail) {
            throw new Error("email invalid")
        }
        setError('');
        try {
            let result = false;
            if (isHr) {
                result = await hrChangePasswordRequest(email);
            }
            else {
                result = await candidateChangePasswordRequest(email);
            }

            if (result) {
                window.alert("Vui lòng kiểm tra email của bạn!")
            }
            else {
                setError(
                    'Gửi email không thành công. Vui lòng kiểm tra lại thông tin!'
                );
            }
        } catch (error) {
            setError(
                'Gửi email không thành công. Vui lòng kiểm tra lại thông tin!'
            );
        }
        finally{
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Đặt lại mật khẩu</h2>
            {error && <p className="error invalid-text">{error}</p>}
            <div className='input-field'>
                <label>Email đã đăng ký: {!isValidEmail && <p className='invalid-text'>Định dạng email không hợp lệ.</p>}</label>
                <input type="email" value={email} onChange={handleEmailChange} required />
            </div>
            <div>
                <label style={{ marginLeft: "30px", paddingLeft: "30px" }}><input
                    type="checkbox"
                    checked={isHr}
                    onChange={(e) => setIsHr(e.target.checked)}
                ></input>Tôi là nhà tuyển dụng</label>
            </div>
            <button type="button" onClick={() => handleSubmitEmail()}disabled={isSubmitting}>{isSubmitting ? <i className="fa fa-spinner fa-spin"></i> : "Gửi email đổi mật khẩu"}</button>
        </div>
    )
}
export default ForgotPassScene;