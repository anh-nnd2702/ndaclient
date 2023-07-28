import React, { useEffect, useState } from "react";
import Rating from "react-rating";

const SkillList = ({ skillList, listLength, handleDeleteSkill, handleUpdateSkill }) => {
    const [listSkill, setListSkill] = useState([]);
    useEffect(() => {
        setListSkill(skillList);
    }, [skillList, listLength])

    return (
        <div className="cv-item-box">
            {listSkill.map((skillItem, index) => (
                <div key={index} className="cv-item-div">
                    <div className="item-skill-box">
                        <div className="item-skill-content">
                            <h3>{skillItem.skillName}: </h3>
                            <div className="rating-box">
                                <Rating
                                    initialRating={skillItem.skillLevel}
                                    emptySymbol={<i className="rate-icon fa-regular fa-star"></i>}
                                    fullSymbol={<i className="rate-icon fa-solid fa-star"></i>}
                                    readonly
                                />
                            </div>
                        </div>
                        <p className="item-describe">{skillItem.skillDescribe}</p>
                    </div>
                    <div className="cv-item-action">
                        <button className="remove-item-btn" type="button" onClick={() => handleDeleteSkill(index)}><i className="fa-solid fa-trash"></i></button>
                        <button className="update-item-btn" type="button" onClick={()=>handleUpdateSkill(skillItem, index)}><i className="fa-solid fa-pen"></i></button>
                        </div>
                </div>
            )
            )}
        </div>
    )
}

export default SkillList;