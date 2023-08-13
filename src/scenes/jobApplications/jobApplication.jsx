import React, { useEffect, useState } from 'react';
import { getApplyByJob } from "../../apis/applyJob.js";
import { getJob } from "../../apis/job.js"
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import "./jobApplication.css"

const JobApplicationScene = ({ isLoggedInHr }) => {
    const [jobInfo, setJobInfo] = useState({});
    const [applyList, setApplyList] = useState([]);
    const [cityName, setCityName] = useState("");
    const { jobId } = useParams();
    const navigate = useNavigate()

    const fetchData = async () => {
        const isHr = localStorage.getItem("isLoggedInHr") === true || localStorage.getItem("isLoggedInHr") === "true";
        if (!isHr) {
            navigate("/login");
        }
        else {
            const job = await getJob(jobId)
            if (job) {
                setJobInfo(job);
                setCityName(job.City.cityName)
            }
            const applications = await getApplyByJob(jobId)
            setApplyList(applications)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        fetchData();
    }, [jobId])

    useEffect(() => {
        fetchData();
    }, [isLoggedInHr])

    const formatDate = (t) => {
        const date = new Date(t);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
        return formattedDate;
    }

    const matchStatus = (aps) => {
        if (aps === 0) {
            return "Hồ sơ mới"
        }
        else if (aps === 1) {
            return "Hồ sơ đã xem"
        }
        else if (aps === 2) {
            return "Đã duyệt phù hợp"
        }
        else {
            return "Hồ sơ đã loại"
        }
    }

    function formatModifiedTime(modifiedDate) {
        const date = new Date(modifiedDate);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const formattedDate = `ngày: ${day}/${month}/${year} lúc ${hours}:${minutes}`;
        return formattedDate;
    }

    const checkIsExpired = (t) => {
        const currDate = new Date();
        const todayString = currDate.toISOString().split('T')[0];
        return (t < todayString);
    }

    return (
        (jobInfo &&
            <div className='job-apply-body'>
                <h1>Tin tuyển dụng của bạn</h1>
                <div className='job-info'>
                    <div className='job-info-main'>
                        <h2>{jobInfo.jobTitle}</h2>
                        <h4>Địa chỉ làm việc: {cityName}- {jobInfo.workAddress}</h4>
                        <div className='time-box'>
                            <p>Đăng {formatModifiedTime(jobInfo.modifiedTime)}</p>
                            {checkIsExpired(jobInfo.expireDate) ? (
                                <p>Đã hết hạn: {formatDate(jobInfo.expireDate)}</p>) : (
                                <p>Hạn cuối: {formatDate(jobInfo.expireDate)}</p>
                            )}
                        </div>
                    </div>

                </div>
                <div className='list-apply'>
                    <h1>Ứng viên đã ứng tuyển</h1>
                    <div className='list-apply-box'>
                        {applyList.map((applyItem) => (
                            <NavLink to={`/viewApplication/${applyItem.applyId}`} className='link-see-more'>
                            <div key={applyItem.applyId} className='apply-item'>
                                <div className='item-infor'>
                                    <div className='apply-head'>
                                        <NavLink to={`/viewApplication/${applyItem.applyId}`} className='btn-see-more'><h2>{applyItem.fullName}</h2></NavLink>
                                        <span className={`status-tag-${applyItem.applyStatus}`}>{matchStatus(applyItem.applyStatus)}</span>
                                    </div>
                                    <h4>Thư ứng tuyển</h4>
                                    <p className='cover-letter'>{applyItem.coverLetter}</p>
                                    <p className='apply-time'>Ứng tuyển {formatModifiedTime(applyItem.applyTime)}</p>
                                </div>
                            </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        ))
}

export default JobApplicationScene;