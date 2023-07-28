import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
import { getApplyByJob } from "../../apis/applyJob.js";
import { getJob } from "../../apis/job.js"
import { useParams, useNavigate, NavLink } from 'react-router-dom';

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

    const matchStatus = (aps) =>{
        if(aps===0){
            return "Hồ sơ mới"
        }
        else if(aps===1){
            return "Hồ sơ đã xem"
        }
        else if(aps===2){
            return "Đã duyệt phù hợp"
        }
        else{
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
        <div>
            <h1>Tin tuyển dụng của bạn</h1>
            <div className='job-info'>
                <div className='job-info-main'>
                    <h1>{jobInfo.jobTitle}</h1>
                    <h4>{cityName}: {jobInfo.workAddress}</h4>
                    <div>
                        <p>Đăng {formatModifiedTime(jobInfo.modifiedTime)}</p>
                        {checkIsExpired(jobInfo.expireDate) ? (
                            <p>Đã hết hạn: {formatDate(jobInfo.expireDate)}</p>) : (
                            <p>Hạn cuối: {formatDate(jobInfo.expireDate)}</p>
                        )}
                    </div>
                </div>
                <div className='job-info-action'>
                    <button><i className='fa-solid fa-pencil'></i></button>
                    <button><i className='fa-solid fa-trash'></i></button>
                </div>
            </div>
            <div className='list-apply'>
                <h1>Ứng viên đã ứng tuyển</h1>
                <div className='list-apply-box'>
                    {applyList.map((applyItem) => (
                        <div key={applyItem.applyId} className='apply-item'>
                            <div className='item-infor'>
                                <h2>{applyItem.fullName}</h2>
                                <p>Thư ứng tuyển: {applyItem.coverLetter}</p>
                                <p>Ứng tuyển {formatModifiedTime(applyItem.applyTime)}</p>
                            </div>
                            <div className='item-action'>
                                <div className={`status-tag-${applyItem.applyStatus}`}>{matchStatus(applyItem.applyStatus)}</div>
                                <NavLink to={`/viewApplication/${applyItem.applyId}`} target="_blank" rel="noopener noreferrer" className='btn-see-more'>Xem hồ sơ</NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ))
}

export default JobApplicationScene;