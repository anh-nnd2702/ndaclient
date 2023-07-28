import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { getSavedJobByCandidate, unSaveJob } from '../../apis/savejob.js'
import "./savedJob.css";

const CandidateSavedJob = ({ isLoggedIn }) => {
    const [savedList, setSavedList] = useState([]);
    const [savedLength, setSavedLength] = useState(0)
    const navigate = useNavigate()
    const onUnsaveJob = async (savedJobId) => {
        try {
            const isUnsave = await unSaveJob(savedJobId);
            if (isUnsave) {
                toast.success(`Đã bỏ lưu tin`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 800,
                });
                const updatedList = savedList.filter((item) => item.savedJobId !== savedJobId);
                setSavedList(updatedList);
                setSavedLength(savedLength - 1)
            }
            else {
                toast.error(`Bỏ lưu tin thất bại`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 800,
                });
            }
        }
        catch (error) {
            toast.error(`Bỏ lưu tin thất bại`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 800,
            });
        }
    }

    const fetchData = async () => {
        try {
            const hasLog = localStorage.getItem("isLoggedIn") === 'true' || localStorage.getItem("isLoggedIn") === true;
            if (!hasLog) {
                navigate('/login');
            }
            else {
                const savedJobs = await getSavedJobByCandidate();
                if (savedJobs) {
                    setSavedList(savedJobs);
                    setSavedLength(savedJobs.length)
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }

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

    const checkIsExpired = (t) => {
        const currDate = new Date();
        const todayString = currDate.toISOString().split('T')[0];
        return (t < todayString);
    }

    const formatDate = (t) => {
        const date = new Date(t);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
        return formattedDate;
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        fetchData();
    }, [isLoggedIn])

    return (
        <div className='saved-job-body'>
            <h1>Công việc bạn đã lưu</h1>
            {savedLength > 0 ? (
                <div className='saved-job-list'>
                    {savedList.map((sJ) => (
                        <div key={sJ.savedJobId} className='saved-job-card'>
                            <div className='card-img-box'>
                                <img src={sJ.Job.company.companyLogo}></img>
                            </div>
                            <div className='card-content-box'>
                                <div className='title-box'>
                                    <h2>{sJ.Job.jobTitle}</h2>
                                    <div className='wage-tag'>{checkWage(sJ.Job.minWage, sJ.Job.maxWage)}</div>
                                </div>
                                <h3><i className='fa-solid fa-building'></i>{"   "}{sJ.Job.company.companyName}</h3>
                                <p>Địa điểm làm việc: {sJ.Job.City.cityName} - {sJ.Job.workAddress}</p>
                                <div className='time-box'>
                                    <p>Tin đăng {formatModifiedTime(sJ.Job.modifiedTime)}</p>
                                    <p>Đã lưu {formatModifiedTime(sJ.savedTime)}</p>
                                </div>
                                <div className='card-actions'>
                                    {checkIsExpired(sJ.Job.expireDate) ? (
                                        <h4>Đã hết hạn ứng tuyển</h4>
                                    ) : (
                                        <div className='action-see'>
                                            <p>Hạn ứng tuyển: {formatDate(sJ.Job.expireDate)}</p>
                                            <NavLink to={`/job/${sJ.Job.jobId}`}>Xem tin tuyển dụng</NavLink>
                                        </div>
                                    )}
                                    <button onClick={() => { onUnsaveJob(sJ.savedJobId) }} type='button' id='unsaveBtn'><i className='fa-regular fa-heart'></i>  Bỏ lưu</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <h2 className='no-jobs'>Bạn chưa lưu công việc nào!</h2>
                </div>)}
            <ToastContainer />
        </div>
    )
}

export default CandidateSavedJob;