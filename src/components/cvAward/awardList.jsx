import React, { useEffect, useState } from "react";
import { format } from "date-fns";
const AwardList = ({ awardList, listLength, handleDeleteAward, handleUpdateAward}) => {
    const [listAward, setListAward] = useState([]);
    useEffect(() => {
        setListAward(awardList);
    }, [awardList, listLength])

    return (
        <div className="cv-item-box">
            {listAward.map((aItem, index) => (
                <div key={index} className="cv-item-div">
                    <div className="item-content">
                        <h2>{aItem.awardTitle}</h2>
                        <h3>{aItem.organization}</h3>
                        <p className="content-date">{aItem.awardYear}</p>
                        <p className="item-describe">{aItem.awardDescribe}</p>
                    </div>
                    <div className="cv-item-action">
                        <button className="remove-item-btn" type="button" onClick={() => handleDeleteAward(index)}><i className="fa-solid fa-trash"></i></button>
                        <button className="update-item-btn" type="button" onClick={()=>handleUpdateAward(aItem, index)}><i className="fa-solid fa-pen"></i></button>
                    </div>
                </div>
            )
            )}
        </div>
    )
}

export default AwardList;