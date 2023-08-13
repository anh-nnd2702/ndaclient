import React, { useState, useEffect } from "react";

const ActivityForm = ({ onSubmitActivity, onCancel, currentAct }) => {
    const [activityName, setActivityName] = useState(currentAct.activityName || "");
    const [organization, setOrganization] = useState(currentAct.organization || "");
    const [startDate, setStartDate] = useState(currentAct.startDate || "");
    const [endDate, setEndDate] = useState(currentAct.endDate || "");
    const [activityDescribe, setActivityDescribe] = useState(currentAct.activityDescribe || "");
    const [isNotEnd, setIsNotEnd] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [validatext, setValidatext] = useState("");

    useEffect(() => {
        if (JSON.stringify(currentAct) === '{}') {
            setIsNotEnd(false);
        }
        else {
            setIsUpdate(true);
            setIsNotEnd(currentAct.startDate === currentAct.endDate);
        }
    }, [currentAct]);

    const handleSubmitActivity = (e) => {
        e.preventDefault();
        if(isNotEnd){
            setEndDate(startDate);
        }
        if (validateForm()) {
            const activityInfo = {
                activityName,
                organization,
                startDate,
                endDate: isNotEnd? startDate: endDate,
                activityDescribe,
            };
            if (!isUpdate) {
                onSubmitActivity(activityInfo, -1);
                resetAllFields();
            }
            else {
                onSubmitActivity(activityInfo, currentAct.index)
            }
        }
    };

    const resetAllFields = () => {
        setActivityName("");
        setOrganization("");
        setStartDate("");
        setEndDate("");
        setActivityDescribe("");
    };

    const handleCancel = (e) => {
        e.preventDefault();
        onCancel();
    };

    const validateForm = () => {
        if (activityName === "" || organization === "" || startDate === ""||(endDate===""&&!isNotEnd)) {
            setValidatext("Vui lòng điền đủ tên hoạt động, tổ chức, ngày bắt đầu và kết thúc");
            return false;
        }
        else return true;
    }

    return (
        <div className="pop-up-box">
            <h2>Hoạt động xã hội</h2>
            <form className="form-popup">
                <span className="valid-text">{validatext}</span>
                <div className="popup-input-box">
                    <label htmlFor="activityName">Tên hoạt động:</label>
                    <input
                        type="text"
                        id="activityName"
                        value={activityName}
                        onChange={(e) => setActivityName(e.target.value)}
                        required
                    />
                </div>
                <div className="popup-input-box">
                    <label htmlFor="organization">Tên tổ chức:</label>
                    <input
                        type="text"
                        id="organization"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
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
                    <label htmlFor="isNotEnd">Tôi đang hoạt động ở đây:</label>
                    <input
                        type="checkbox"
                        id="isNotEnd"
                        checked={isNotEnd}
                        onChange={(e) => { setIsNotEnd(e.target.checked) }}
                    />
                </div>
                <div className="popup-input-box">
                    <label htmlFor="activityDescribe">Mô tả thêm về hoạt động này:</label>
                    <textarea
                        id="activityDescribe"
                        value={activityDescribe}
                        onChange={(e) => setActivityDescribe(e.target.value)}
                    ></textarea>
                </div>
                <button className="popup-add-btn" type="button" onClick={handleSubmitActivity}>
                    Lưu
                </button>
                <button className="popup-cancel-btn" type="button" onClick={handleCancel}>
                    Hủy
                </button>
            </form>
        </div>
    );
};

export default ActivityForm;
