import React, { useState, useEffect } from "react";

const ExperienceForm = ({ onSubmitExperience, onCancel, currentExp }) => {
    const [companyName, setCompanyName] = useState(currentExp.companyName || "");
    const [position, setPosition] = useState(currentExp.position || "");
    const [startDate, setStartDate] = useState(currentExp.startDate || "");
    const [endDate, setEndDate] = useState(currentExp.endDate || "");
    const [experDescribe, setExperDescribe] = useState(currentExp.experDescribe || "");
    const [isNotEnd, setIsNotEnd] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [validatext, setValidatext] = useState("");

    useEffect(() => {
        if (JSON.stringify(currentExp) === '{}') {
            setIsNotEnd(false);
        }
        else {
            setIsUpdate(true);
            setIsNotEnd(currentExp.startDate === currentExp.endDate);
        }
    }, [currentExp])

    const handleSubmitExperience = (e) => {
        e.preventDefault();
        if (isNotEnd) {
            setEndDate(startDate);
        }
        if (validateForm()) {
            const experienceInfo = {
                companyName,
                position,
                startDate,
                endDate: isNotEnd ? (startDate) : (endDate),
                experDescribe,
            };
            if (!isUpdate) {
                onSubmitExperience(experienceInfo, -1);
                resetAllFields();
            }
            else {
                onSubmitExperience(experienceInfo, currentExp.index)
            }
        }
    };

    const resetAllFields = () => {
        setCompanyName("");
        setPosition("");
        setStartDate("");
        setEndDate("");
        setExperDescribe("");
    };

    const handleCancel = (e) => {
        e.preventDefault();
        onCancel();
    };

    const validateForm = () => {
        if (companyName === "" || position === "" || startDate === "" || (endDate === "" && !isNotEnd)) {
            setValidatext("Vui lòng điền đủ công ty, chức vụ, ngày bắt đầu và kết thúc");
            return false;
        }
        else return true;
    }

    return (
        <div className="pop-up-box">
            <h2>Kinh nghiệm của bạn</h2>
            <form className="form-popup">
                <span className="valid-text">{validatext}</span>
                <div className="popup-input-box">
                    <label htmlFor="companyName">Tên công ty/ tổ chức:</label>
                    <input
                        type="text"
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </div>
                <div className="popup-input-box">
                    <label htmlFor="position">Vị trí/ chức vụ:</label>
                    <input
                        type="text"
                        id="position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                    />
                </div>
                <div className="popup-input-box">
                    <label htmlFor="startDate">Ngày bắt đầu:</label>
                    <input
                        type="date"
                        id="startDate"
                        defaultValue={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className="popup-input-box">
                    <label htmlFor="endDate">Ngày kết thúc:</label>
                    <input
                        disabled={isNotEnd}
                        type="date"
                        id="endDate"
                        defaultValue={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className="popup-check-box">
                    <label htmlFor="isNotEnd">Tôi đang làm việc ở đây:</label>
                    <input
                        type="checkbox"
                        id="isNotEnd"
                        checked={isNotEnd}
                        onChange={(e) => { setIsNotEnd(e.target.checked) }}
                    />
                </div>
                <div className="popup-input-box">
                    <label htmlFor="experDescribe">Mô tả thêm về công việc:</label>
                    <textarea
                        id="experDescribe"
                        value={experDescribe}
                        onChange={(e) => setExperDescribe(e.target.value)}
                    ></textarea>
                </div>
                <button className="popup-add-btn" type="button" onClick={handleSubmitExperience}>
                    Lưu
                </button>
                <button className="popup-cancel-btn" type="button" onClick={handleCancel}>
                    Hủy
                </button>
            </form>
        </div>
    );
};

export default ExperienceForm;
