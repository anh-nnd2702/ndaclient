import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { getApplyByCandidate } from "../../apis/applyJob.js"
import "./appliedJob.css"

const CandidateAppliedJob = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    const [appliedList, setAppliedList] = useState([]);
    const [listLength, setListLength] = useState(0)
    const fetchData = async () => {
        const hasLog = localStorage.getItem("isLoggedIn") === 'true' || localStorage.getItem("isLoggedIn") === true;
        if (!hasLog) {
            navigate('/login');
        }
        else {
            const applications = await getApplyByCandidate();
            if (applications) {
                setAppliedList(applications);
                setListLength(applications.length)
            }

        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        fetchData();
    }, [isLoggedIn])

    const checkWage = (minWage, maxWage) => {
        let wage = '';
        if (minWage > 0 && maxWage > 0) {
            if (minWage === maxWage) {
                wage = `${minWage} triệu`;
            }
            else {
                wage = `Từ ${minWage} đến ${maxWage} triệu`;
            }
        }
        else if (minWage > 0) {
            wage = `Từ ${minWage} triệu`;
        }
        else if (maxWage > 0) {
            wage = `Đến ${maxWage} triệu`
        }
        else {
            wage = `Thỏa thuận`;
        }
        return wage;
    }

    const matchStatus = (aps) => {
        if (aps === 0) {
            return "Đã ứng tuyển"
        }
        else if (aps === 1) {
            return "NTD đã xem"
        }
        else if (aps === 2) {
            return "NTD duyệt phù hợp"
        }
        else {
            return "Hồ sơ đã bị loại"
        }
    }

    const formatModifiedTime = (modifiedDate) => {
        const date = new Date(modifiedDate);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const formattedDate = `ngày: ${day}/${month}/${year} lúc ${hours}:${minutes}`;
        return formattedDate;
    }

    return (
        <div className='applied-job-body'>
            <h1>Công việc bạn đã ứng tuyển</h1>
            {listLength > 0 ? (
                <div className='applied-list'>
                    {appliedList.map((apl) => (
                        <div key={apl.applyId} className='applied-job-card'>
                            <div className='card-img-box'>
                                <img src={apl.Job.company.companyLogo ?
                                    (`${apl.Job.company.companyLogo}`)
                                    : (`https://drive.google.com/uc?export=view&id=1WaXr3NCH6M8_xdwwwYiNNXpgvoMjlFTl`)}
                                    alt='Logo company'></img>
                            </div>
                            <div className='card-content-box'>
                                <div className='title-box'>
                                    <h2>{apl.Job.jobTitle}</h2>
                                    <div className='wage-tag'>{checkWage(apl.Job.minWage, apl.Job.maxWage)}</div>
                                </div>
                                <h3><i className='fa-solid fa-building'></i>{'   '}{apl.Job.company.companyName}</h3>
                                <p>Địa điểm làm việc: {apl.Job.City.cityName} - {apl.Job.workAddress}</p>
                                <div className='time-box'>
                                    <p>Tin đăng {formatModifiedTime(apl.Job.modifiedTime)}</p>
                                    <p>Ứng tuyển {formatModifiedTime(apl.applyTime)}</p>
                                </div>
                                <div className='cv-action'>
                                    <NavLink className='card-link' to={`/candidateApplication/${apl.applyId}`} ><i className='fa-solid fa-eye'></i>   Xem CV ứng tuyển</NavLink>
                                </div>
                                <div className='card-actions'>
                                    <div className={`status-tag-${apl.applyStatus}`}>Trạng thái: {matchStatus(apl.applyStatus)}</div>
                                    <NavLink className='card-link' to={`/job/${apl.jobId}`}>Xem Tin tuyển dụng</NavLink>
                                </div>
                            </div>
                        </div>
                    )
                    )}
                </div>
            ) : (
                <div>
                    <h2 className='no-jobs'>Bạn chưa ứng tuyển vào công việc nào!</h2>
                </div>
            )


            }
        </div>
    )
}

export default CandidateAppliedJob;