import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const CertificateList = ({ certList, listLength, handleDeleteCertificate, handleUpdateCert }) => {
    const [listCert, setListCert] = useState([]);
    useEffect(() => {
        setListCert(certList);
    }, [certList, listLength])
    const fetchDate = (startTime, endTime) => {
        const textStart = format(new Date(startTime), "dd/MM/yyyy")
        if (startTime == endTime) {
            return `Ngày cấp: ${textStart} - không hết hạn`;
        }
        else {
            const textEnd = format(new Date(endTime), "dd/MM/yyyy")
            return `Ngày cấp: ${textStart} - Ngày hết hạn: ${textEnd}`
        }
    }
    return (
        <div className="cv-item-box">
            {listCert.map((certItem, index) => (
                <div key={index} className="cv-item-div">
                    <div className="item-content">
                        <h2>{certItem.certTitle}</h2>
                        <h3>{certItem.organization}</h3>
                        <p className="content-date">{fetchDate(certItem.certDate, certItem.expireDate)}</p>
                        <p className="item-describe">{certItem.certDescribe}</p>
                    </div>
                    <div className="cv-item-action">
                        <button className="remove-item-btn" type="button" onClick={() => handleDeleteCertificate(index)}><i className="fa-solid fa-trash"></i></button>
                        <button className="update-item-btn" type="button" onClick={()=>handleUpdateCert(certItem, index)}><i className="fa-solid fa-pen"></i></button>
                    </div>
                </div>
            )
            )}
        </div>
    )
}

export default CertificateList;