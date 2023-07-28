import React, { useState, useEffect } from "react";
import Rating from "react-rating";

const SkillForm = ({ onSubmitSkill, onCancel, currentSkill }) => {
    const [skillName, setSkillName] = useState(currentSkill.skillName||"");
    const [skillLevel, setSkillLevel] = useState(currentSkill.skillLevel|| 0);
    const [skillDescribe, setSkillDescribe] = useState(currentSkill.skillDescribe||"");
    const [levelP, setLevelP] = useState("")
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        if (JSON.stringify(currentSkill) === '{}') {
            setIsUpdate(false);
        }
        else {
            setIsUpdate(true);
        }
    }, [currentSkill])

    const ratingOnChange = (value) => {
        setSkillLevel(value);
        if (value === 0) {
            setLevelP("");
        }
        else if (value === 1) {
            setLevelP("Mới biết/ mới học")
        }
        else if (value === 2) {
            setLevelP("Đã học/ biết cơ bản")
        }
        else if (value === 3) {
            setLevelP("Đã thực hành/ nâng cao")
        }
        else if (value === 4) {
            setLevelP("Đã sử dụng trong công việc/ dự án")
        }
        else if (value === 5) {
            setLevelP("Đã sử dụng thành thạo")
        }
    }

    const handleSubmitSkill = (e) => {
        e.preventDefault();
        const skillInfo = {
            skillName,
            skillLevel,
            skillDescribe,
        };
        if (!isUpdate) {
            onSubmitSkill(skillInfo, -1);
            resetAllFields();
        }
        else {
            onSubmitSkill(skillInfo, currentSkill.index)
        }
    };

    const resetAllFields = () => {
        setSkillName("");
        setSkillLevel(0);
        setSkillDescribe("");
    };

    const handleCancel = (e) => {
        e.preventDefault();
        onCancel();
    };

    return (
        <div className="pop-up-box">
            <h2>Kỹ năng của bạn</h2>
            <form className="form-popup">
                <div className="popup-input-box">
                    <label htmlFor="skillName">Tên kỹ năng:</label>
                    <input
                        type="text"
                        id="skillName"
                        value={skillName}
                        onChange={(e) => setSkillName(e.target.value)}
                        required
                    />
                </div>
                <div className="popup-input-box">
                    <label htmlFor="skillLevel">Mức thành thạo:</label>
                    <Rating
                        name="skillLevel"
                        initialRating={skillLevel}
                        onChange={(value) => ratingOnChange(value)}
                        emptySymbol={<i className="rate-icon fa-regular fa-star"></i>}
                        fullSymbol={<i className="rate-icon fa-solid fa-star"></i>}
                    />
                    <p className="rate-level-p">{levelP}</p>
                </div>
                <div className="popup-input-box">
                    <label htmlFor="skillDescribe">Mô tả thêm về kỹ năng:</label>
                    <textarea
                        id="skillDescribe"
                        value={skillDescribe}
                        onChange={(e) => setSkillDescribe(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button className="popup-add-btn" type="button" onClick={handleSubmitSkill}>
                    Lưu
                </button>
                <button className="popup-cancel-btn" type="button" onClick={handleCancel}>
                    Hủy
                </button>
            </form>
        </div>
    );
};

export default SkillForm;
