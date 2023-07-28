import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const ProjectList = ({ prjList, listLength, handleDeletePrj, handleUpdatePrj }) => {
    const [listPrj, setListPrj] = useState([]);
    useEffect(() => {
        setListPrj(prjList);
    }, [prjList, listLength])

    const fetchDate = (startTime, endTime) => {
        const textStart = format(new Date(startTime), "dd/MM/yyyy")
        if (startTime === endTime) {
            return `Từ ${textStart} đến hiện tại`;
        }
        else {
            const textEnd = format(new Date(endTime), "dd/MM/yyyy")
            return `Từ ${textStart} đến ${textEnd}`
        }
    }

    const fetchTeamSize = (teamSize) =>{
        const sizeP = teamSize==1?(`Dự án cá nhân`):(`Số thành viên: ${teamSize}`)
        return sizeP;
    }

    return (
        <div className="cv-item-box">
            {listPrj.map((prjItem, index) => (
                <div key={index} className="cv-item-div">
                    <div className="item-content">
                        <h2>{prjItem.prjName}</h2>
                        <p className="content-date">{fetchDate(prjItem.startDate, prjItem.endDate)}</p>
                        <h4>{fetchTeamSize(prjItem.teamSize)}</h4>
                        <h4>Vai trò/ vị trí: {prjItem.prjPosition}</h4>
                        <p className="item-describe">{prjItem.prjDescribe}</p>
                    </div>
                    <div className="cv-item-action">
                        <button className="remove-item-btn" type="button" onClick={() => handleDeletePrj(index)}><i className="fa-solid fa-trash"></i></button>
                        <button className="update-item-btn" type="button" onClick={() => handleUpdatePrj(prjItem, index)}><i className="fa-solid fa-pen"></i></button>
                        </div>
                </div>
            )
            )}
        </div>
    )
}

export default ProjectList;