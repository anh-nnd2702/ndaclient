import React, { useState } from "react";
import { useEffect } from "react";

const EducationForm = ({ onSubmitEdu, onCancel, currentEducation, eduLevelList }) => {
    const [schoolName, setSchoolName] = useState(currentEducation.schoolName || "");
    const [eduLevelId, setEduLevelId] = useState(currentEducation.eduLevelId || 0);
    const [major, setMajor] = useState(currentEducation.major || "");
    const [startDate, setStartDate] = useState(currentEducation.startDate || "");
    const [endDate, setEndDate] = useState(currentEducation.endDate || "");
    const [eduDescribe, setEduDescribe] = useState(currentEducation.eduDescribe || "");
    const [isNotGrade, setIsNotGrade] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    useEffect(() => {
        if (JSON.stringify(currentEducation) === '{}') {
            setIsNotGrade(false);
        }
        else {
            setIsUpdate(true);
            setIsNotGrade(currentEducation.startDate === currentEducation.endDate);
        }
    }, [currentEducation]);

    const handleSubmitEdu = (e) => {
        e.preventDefault();
        const educationInfo = {
            schoolName,
            eduLevelId,
            major,
            startDate,
            endDate: isNotGrade ? (startDate) : (endDate),
            eduDescribe
        };
        if (!isUpdate) {
            onSubmitEdu(educationInfo, -1);
            resetAllField();
        }
        else {
            onSubmitEdu(educationInfo, currentEducation.index)
        }
    };

    const resetAllField = () => {
        setSchoolName("");
        setEduLevelId(0);
        setMajor("");
        setStartDate("");
        setEndDate("");
        setEduDescribe("")
    }

    const handleCancel = (e) => {
        e.preventDefault();
        onCancel();
    }

    const handleNotGrade = (e) => {
        setIsNotGrade(e.target.checked);
    }

    return (
        <div className="pop-up-box">
            <h2>Nhập học vấn của bạn</h2>
            <form className="form-popup">
                <div className="popup-input-box">
                    <label htmlFor="schoolName">Tên trường:</label>
                    <input
                        type="text"
                        id="schoolName"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        required
                    />
                </div>
                <div className="popup-input-box">
                    <label htmlFor="eduLevel">Bậc đào tạo:</label>
                    <select id="eduLevel"
                        value={eduLevelId}
                        onChange={(e) => setEduLevelId(e.target.value)}>
                        {eduLevelList.map((eduLevel) => (
                            <option key={eduLevel.eduLevelId} value={eduLevel.eduLevelId}>
                                {eduLevel.eduLevelName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="popup-input-box">
                    <label htmlFor="major">Khoa/ Chuyên ngành:</label>
                    <input
                        type="text"
                        id="major"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        required
                    />
                </div>
                <div className="popup-input-box">
                    <label htmlFor="startDate">Ngày bắt đầu:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="popup-input-box">
                    <label htmlFor="endDate">Ngày tốt nghiệp:</label>
                    <input
                        disabled={isNotGrade}
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className="popup-check-box">
                    <label htmlFor="isNotGrade">Chưa tốt nghiệp:</label>
                    <input
                        type="checkbox"
                        id="isNotGrade"
                        checked={isNotGrade}
                        onChange={handleNotGrade}
                    />
                </div>
                <div className="popup-input-box">
                    <label htmlFor="eduDescribe">Chi tiết:</label>
                    <textarea
                        id="eduDescribe"
                        value={eduDescribe}
                        onChange={(e) => setEduDescribe(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button className="popup-add-btn" type="button" onClick={handleSubmitEdu}>Lưu</button>
                <button className="popup-cancel-btn" type="button" onClick={handleCancel}>Hủy</button>
            </form>
        </div>
    );
};

export default EducationForm;
