import React, { useEffect, useState } from "react";
import { updateCandidate } from "../../apis/candidate";
import { updateAvatar } from "../../apis/avatar";
import { format } from "date-fns";
import { vi } from 'date-fns/locale';
import "./ProfileForm.css"
import { NavLink } from "react-router-dom";

const ProfileForm = ({ candidate, cityList, onProfileUpdate }) => {
    const [fullName, setFullName] = useState(candidate.fullName);
    const [phoneNumber, setPhoneNumber] = useState(candidate.phoneNumber || "");
    const [gender, setGender] = useState(candidate.gender || "");
    const [dateOfBirth, setDateOfBirth] = useState(candidate.dateOfBirth || "");
    const [address, setAddress] = useState(candidate.address || "");
    const [avatar, setAvatar] = useState(null);
    const [isSeeking, setIsSeeking] = useState(candidate.isSeeking || false);
    const [cityId, setCityId] = useState(candidate.cityId || 0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        setFullName(candidate.fullName);
        setPhoneNumber(candidate.phoneNumber);
        setGender(candidate.gender);
        setDateOfBirth(candidate.dateOfBirth);
        setAddress(candidate.address||"");
        setIsSeeking(candidate.isSeeking);
        setCityId(candidate.cityId);
    }, [candidate]);

    useEffect(() => {
        fetchAvatar();
    }, []);

    const fetchAvatar = () => {
        try {
            const avatarurl = localStorage.getItem('avatar');
            setAvatar(avatarurl);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };
    const formatDate = (date) => {
        return format(date, 'dd/MM-yyyy', { locale: vi });
      };
    const handleDateOfBirthChange = (e) => {
        const selectedDate = e.target.value;
        setDateOfBirth(selectedDate)
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        const reader = new FileReader();

        /*reader.onloadend = () => {
            setAvatar(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }*/
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64Url = reader.result;
              setAvatar(base64Url);
            };
            reader.readAsDataURL(file);
          }
    };

    const handleIsSeekingChange = (e) => {
        setIsSeeking(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await updateCandidate({
                fullName,
                phoneNumber,
                gender,
                dateOfBirth,
                address,
                isSeeking
            });
            localStorage.setItem('fullName', fullName)
            const isUpdated = true;
            onProfileUpdate({ isUpdated });
        } catch (error) {
            console.error(error);
        }

        setIsSubmitting(false);
    };

    const handleSubmitAvatar = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('avatar', selectedFile);

            const response = await updateAvatar(formData);

            // Xử lý phản hồi từ server
            const { message, avatar } = response;

            localStorage.setItem('avatar', avatar)
            const isUpdated = true;
            onProfileUpdate({ isUpdated });
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="profile-component">
            <h1 className="profile-title">Thông tin ứng viên</h1>
            <div className="form-box">
                <div>
                    <form onSubmit={handleSubmitAvatar} className="avatar-form">
                        <div className="input-box">
                            <label htmlFor="avatar">Ảnh đại diện:</label>
                            <div className="avatar-profile-box">
                                {avatar ? (
                                    <img src={avatar} alt="Avatar" />
                                ) : (
                                    <img src="https://drive.google.com/uc?export=view&id=1TGmpHymRq3R-dq6eqYeIJfHgt461e6FE" alt="Default Avatar" />
                                )}
                            </div>
                            <input
                                type="file"
                                id="avatar"
                                accept="image/*"
                                onChange={handleAvatarChange}
                            />
                        </div>
                        <button className="submit-btn" id="submitImg" type="submit" disabled={isSubmitting}>{isSubmitting ? <i className="fa fa-spinner fa-spin"></i> : "Lưu ảnh đại diện"}</button>
                    </form>
                    <div className="link-box">
                        <NavLink to={"/setting"} className="link-setting">
                            <i className="fa-solid fa-gear" />
                            Cài đặt tìm việc
                        </NavLink>
                    </div>

                </div>
                <form className="form-profile" onSubmit={handleSubmit}>
                    <div className="email-box">
                        <p>Email: {candidate.email}</p>
                    </div>
                    <div className="input-box">
                        <label htmlFor="fullName">Họ và tên:</label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={handleFullNameChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="phoneNumber">Số điện thoại:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="gender">Giới tính:</label>
                        <select id="gender" value={gender} onChange={handleGenderChange}>
                            <option value="0">Chọn giới tính</option>
                            <option value='2'>Nam</option>
                            <option value='1'>Nữ</option>
                        </select>
                    </div>
                    <div className="input-box">
                        <label htmlFor="isSeeking">Trạng thái tìm việc:</label>
                        <div className="seeking-box">
                            <input
                                className="checkbox-input"
                                type="checkbox"
                                id="isSeeking"
                                checked={isSeeking}
                                onChange={handleIsSeekingChange}
                            />
                            {isSeeking ?
                                (<p id="seekOn">Đang bật</p>) :
                                (<p id="seekOff">Đã tắt</p>)}
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="dateOfBirth">Ngày sinh:</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            value={dateOfBirth}
                            onChange={handleDateOfBirthChange}
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="address">Địa chỉ:</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={handleAddressChange}
                        ></input>
                    </div>
                    <button className="submit-btn" id="submitProfileBtn" type="submit" disabled={isSubmitting}>{isSubmitting ? <i className="fa fa-spinner fa-spin"></i> : "Lưu thông tin"}</button>
                </form>
            </div>
        </div>
    );
};

export default ProfileForm;
