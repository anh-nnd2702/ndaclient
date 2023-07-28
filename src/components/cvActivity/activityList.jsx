import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const ActivityList = ({ activityList, listLength, handleDeleteActivity, handleUpdateAct }) => {
    const [listActivity, setListActivity] = useState([]);
    useEffect(() => {
        setListActivity(activityList);
    }, [activityList, listLength])
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
            {listActivity.map((actItem, index) => (
                <div key={index} className="cv-item-div">
                    <div className="item-content">
                        <h2>{actItem.activityName}</h2>
                        <h3>{actItem.organization}</h3>
                        <p className="content-date">{fetchDate(actItem.startDate, actItem.endDate)}</p>
                        <p className="item-describe">{actItem.activityDescribe}</p>
                    </div>
                    <div className="cv-item-action">
                        <button className="remove-item-btn" type="button" onClick={() => handleDeleteActivity(index)}><i className="fa-solid fa-trash"></i></button>
                        <button className="update-item-btn" type="button" onClick={()=>handleUpdateAct(actItem, index)}><i className="fa-solid fa-pen"></i></button>
                        </div>
                </div>
            )
            )}
        </div>
    )
}

export default ActivityList;