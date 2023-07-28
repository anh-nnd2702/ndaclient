import React, { useEffect, useState } from "react";
import { format } from "date-fns";
const ExperienceList = ({ expList, listLength, handleDeleteExp, handleUpdateExp }) => {
    const [listExp, setListExp] = useState([]);
    useEffect(() => {
        setListExp(expList);
    }, [expList, listLength]);

    const fetchDate = (startTime, endTime) => {
        const textStart = format(new Date(startTime), "dd/MM/yyyy")
        if (startTime == endTime) {
            return `Từ ${textStart} đến hiện tại`;
        }
        else {
            const textEnd = format(new Date(endTime), "dd/MM/yyyy")
            return `Từ ${textStart} đến ${textEnd}`
        }
    }
    return (
        <div className="cv-item-box">
            {listExp.map((expItem, index) => (
                <div key={index} className="cv-item-div">
                    <div className="item-content">
                        <h2>{expItem.companyName}</h2>
                        <h3>{expItem.position}</h3>
                        <p className="content-date">{fetchDate(expItem.startDate, expItem.endDate)}</p>
                        <p className="item-describe">{expItem.experDescribe}</p>
                    </div>
                    <div className="cv-item-action">
                        <button className="remove-item-btn" type="button" onClick={() => handleDeleteExp(index)}><i className="fa-solid fa-trash"></i></button>
                        <button className="update-item-btn" type="button" onClick={()=>handleUpdateExp(expItem, index)}><i className="fa-solid fa-pen"></i></button>
                    </div>
                </div>
            )
            )}
        </div>
    )
}

export default ExperienceList;