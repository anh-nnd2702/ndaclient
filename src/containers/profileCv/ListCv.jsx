import React, { useEffect, useState } from "react";
import { updateCandidate } from "../../apis/candidate";
import { updateAvatar, getAvatar } from "../../apis/avatar";
import { format } from "date-fns";
import "./ListCv.css"
import { NavLink } from "react-router-dom";
import { deleteCvById } from "../../apis/cv";

const ListCv = ({ cvList, handleSetMainCv, onDeleteCv }) => {
    const [listCv, setListCv] = useState([]);
    useEffect(() => {
        setListCv(cvList);
    }, [cvList])

    const handleMainCv = (cvId) => {
        handleSetMainCv(cvId)
    }

    /*const formatModifiedTime = (modifiedTime) => {
        return format(new Date(modifiedTime), "dd/MM/yyyy");
    }*/
    function formatModifiedTime(modifiedDate) {
        const date = new Date(modifiedDate);
        
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
      
        const formattedDate = `${day}/${month}/${year} lúc ${hours}:${minutes}`;
        return formattedDate;
      }

    if (listCv.length === 0) {
        return (
            <div className="cv-list-container">
                <div className="cv-list-header">
                    <h1 className="profile-title">Bạn chưa tạo CV nào!</h1>
                    <NavLink className="create-cv-link" to="/createCv">
                        Tạo CV mới <i className="fa-solid fa-square-plus icon-plus"></i>
                    </NavLink>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="cv-list-container">
                <div className="cv-list-header">
                    <h1>CV của bạn</h1>
                    <NavLink className="create-cv-link" to="/createCv">
                        Tạo CV mới <i className="fa-solid fa-square-plus icon-plus"></i>
                    </NavLink>

                </div>
                <div className="list-cv-comtainer">
                    {listCv.map((cv, index) => (
                        <div className="cv-item" key={index}>
                            <div className="cv-item-head">
                                <NavLink to={`/viewCv/${cv.cvId}`}><h2>{cv.cvTitle}</h2></NavLink>
                                {cv.isMainCv ? (
                                    <div className="main-cv-box"><i className="fa-solid fa-star"></i>   CV chính</div>
                                ) : (
                                    <button id="setMainCv" type="button" onClick={() => handleMainCv(cv.cvId)}>Đặt làm CV chính</button>
                                )}
                            </div>
                            <div className="cv-item-content">
                                <h4>{cv.cvPosition}</h4>
                                <p>Chỉnh sửa: {formatModifiedTime(cv.modifiedDate)}</p>
                            </div>
                            <div className="cv-item-actions">
                                <NavLink className="view-cv-link" to={`/viewCv/${cv.cvId}`}><i className="fa-solid fa-eye"></i>  Xem CV</NavLink>
                                <button className="deleteCvBtn" type="button" onClick={()=>onDeleteCv(cv.cvId)}><i className="fa-solid fa-trash"></i>   Xóa Cv</button>
                                <NavLink className="update-cv-link" to={`/updateCv/${cv.cvId}`}><i className="fa-solid fa-pen"></i>   Sửa CV</NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

}

export default ListCv;