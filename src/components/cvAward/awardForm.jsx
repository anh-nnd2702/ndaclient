import React, { useState, useEffect } from "react";

const AwardForm = ({ onSubmitAward, onCancel, currentAward }) => {
    const [awardTitle, setAwardTitle] = useState(currentAward.awardTitle || "");
    const [organization, setOrganization] = useState(currentAward.organization || "");
    const [awardYear, setAwardYear] = useState(currentAward.awardYear || 2023);
    const [awardDescribe, setAwardDescribe] = useState(currentAward.awardDescribe || "");
    const [isUpdate, setIsUpdate] = useState(false);
    const [validatext, setValidatext] = useState("");
    useEffect(() => {
        if (JSON.stringify(currentAward) === '{}') {
            setIsUpdate(false);
        }
        else {
            setIsUpdate(true);
        }
    }, [currentAward])

    const handleSubmitAward = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const awardInfor = {
                awardTitle,
                organization,
                awardYear,
                awardDescribe,
            };
            if (!isUpdate) {
                onSubmitAward(awardInfor, -1);
                resetAllFields();
            }
            else {
                onSubmitAward(awardInfor, currentAward.index)
            }
        }
    };

    let allYears = [];
    let thisYear = (new Date()).getFullYear();
    for (let x = 0; x <= 60; x++) {
        allYears.push(thisYear - x)
    }

    const resetAllFields = () => {
        setAwardTitle("");
        setOrganization("");
        setAwardYear("");
        setAwardDescribe("");
    };

    const handleCancel = (e) => {
        e.preventDefault();
        onCancel();
    };

    const validateForm = () => {
        if (awardTitle === "" || organization === "") {
            setValidatext("Vui lòng điền đủ tên giải thưởng, tổ chức trao tặng");
            return false;
        }
        else return true;
    }

    return (
        <div className="pop-up-box">
            <h2>Giải thưởng/ Danh hiệu</h2>
            <form className="form-popup">
                <span className="valid-text">{validatext}</span>
                <div className="popup-input-box">
                    <label htmlFor="awardTitle">Tên giải thưởng/ danh hiệu:</label>
                    <input
                        type="text"
                        id="awardTitle"
                        value={awardTitle}
                        onChange={(e) => setAwardTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="popup-input-box">
                    <label htmlFor="organization">Tổ chức cấp/trao tặng:</label>
                    <input
                        type="text"
                        id="organization"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        required
                    />
                </div>
                <div className="popup-input-box">
                    <label htmlFor="awardYear">Năm được cấp/ trao tặng:</label>
                    <select id="awardYear"
                        value={awardYear}
                        onChange={(e) => setAwardYear(e.target.value)}>
                        {allYears.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="popup-input-box">
                    <label htmlFor="awardDescribe">Mô tả thêm về danh hiệu/giải thưởng:</label>
                    <textarea
                        id="awardDescribe"
                        value={awardDescribe}
                        onChange={(e) => setAwardDescribe(e.target.value)}
                    ></textarea>
                </div>
                <button className="popup-add-btn" type="button" onClick={handleSubmitAward}>
                    Lưu
                </button>
                <button className="popup-cancel-btn" type="button" onClick={handleCancel}>
                    Hủy
                </button>
            </form>
        </div>
    );
};

export default AwardForm;
