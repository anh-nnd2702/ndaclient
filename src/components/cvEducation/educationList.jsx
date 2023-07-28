import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const EducationList = ({ eduList, listLength, handleDeleteEducation, handleUpdateEdu }) => {
    const [listEdu, setListEdu] = useState([]);
    useEffect(() => {
        setListEdu(eduList);
    }, [eduList, listLength])

    const fetchDate = (startTime, endTime) =>{
        const textStart = format(new Date(startTime), "dd/MM/yyyy")
        if(startTime==endTime){
            return `Từ ${textStart} đến hiện tại`;
        }
        else{
            const textEnd = format(new Date(endTime), "dd/MM/yyyy")
            return `Từ ${textStart} đến ${textEnd}`
        }
    }
    return (
        <div className="cv-item-box">
            {listEdu.map((eduItem, index) => (
                <div key={index} className="cv-item-div">
                    <div className="item-content">
                        <h2>{eduItem.schoolName} </h2>
                        <h3>Khoa/Ngành: {eduItem.major}</h3>
                        <p className="content-date">
                            {fetchDate(eduItem.startDate, eduItem.endDate)}
                        </p>
                        <p className="item-describe">{eduItem.eduDescribe}</p>
                    </div>
                    <div className="cv-item-action">
                        <button className="remove-item-btn" type="button" onClick={() => handleDeleteEducation(index)}><i className="fa-solid fa-trash"></i></button>
                        <button className="update-item-btn" type="button" onClick={()=>handleUpdateEdu(eduItem, index)}><i className="fa-solid fa-pen"></i></button>
                    </div>
                </div>
            )
            )}
        </div>
    )
}

export default EducationList;