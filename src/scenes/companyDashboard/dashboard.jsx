import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { deleteJob, getAllCompanyJobs } from "../../apis/job.js";
import JobChart from '../../components/jobChart.jsx';
import "./dashboard.css"
import { toast } from 'react-toastify';
const CompanyDashboard = ({ isLoggedInHr }) => {
    const [appliedList, setAppliedList] = useState([]);
    const [companyName, setCompanyName] = useState("");
    const [expiredCount, setExpiredCount] = useState(0);

    const [jobList, setJobList] = useState([]);
    const [noJob, setNoJob] = useState(true);
    const navigate = useNavigate()

    const formatDate = (t) => {
        const formattedDate = t.split('-').reverse().join('/')
        return formattedDate;
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

    const checkExpired = (t) => {
        const curDate = new Date();
        const todayString = curDate.toISOString().split('T')[0];
        return (t < todayString);
    }

    const fetchDataDashBoard = async () => {
        const isHr = localStorage.getItem("isLoggedInHr") === true || localStorage.getItem("isLoggedInHr") === "true";
        if (isHr) {
            const storedName = localStorage.getItem("companyName");
            setCompanyName(storedName);
            const listJob = await getAllCompanyJobs();
            if (listJob && listJob.length > 0) {
                setNoJob(false);
                setJobList(listJob);
                const curDate = new Date();
                const todayString = curDate.toISOString().split('T')[0];
                const jobAfter = listJob.filter(job => job.expireDate < todayString);
                setExpiredCount(jobAfter.length)
            }
        }
        else {
            navigate("/")
        }
    }

    const handleDeleteJob = async (jobId) => {
        try {
            const result = await deleteJob(jobId);
            if (result) {
                toast.success("Tin đã bị xóa!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 900,
                });
                const updatedList = jobList.filter((job)=>{
                    return (job.jobId !== jobId)
                })
                setJobList(updatedList);
            }
        }
        catch (error) {
            toast.error("Có lỗi xảy ra khi xóa tin!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 900,
            });
        }
    }

    useEffect(() => {
        fetchDataDashBoard()
    }, [])

    return (
        <div className='dashboard'>
            <h1>Bảng tin nhà tuyển dụng</h1>
            <div className='dashboard-body'>
                <div className='dashboard-left'>
                    <h2>Tin đã đăng</h2>
                    <div className='list-jobs-box'>
                        {noJob ? (
                            <div className='no-job-box'>
                                <h3>Bạn chưa đăng tin nào</h3>
                                <NavLink to={"/newJob"}>Đăng tin</NavLink>
                            </div>
                        ) : (
                            <div className='job-card-list'>
                                {jobList.map((job) => (
                                    <div className='job-item-card' key={job.jobId}>
                                        <div className='job-card-head'>
                                            <h3>ID-{job.jobId}: {job.jobTitle}</h3>
                                            {!checkExpired(job.expireDate) ?
                                                (<button type='button' onClick={() => navigate(`/updateJob/${job.jobId}`)} className='update-job-btn'><i className='fa-solid fa-pen'></i></button>
                                                ) : (<button type='button' onClick={() => handleDeleteJob(job.jobId)} className='update-job-btn-red'><i className='fa-solid fa-trash'></i></button>)}
                                        </div>
                                        <div className='job-dates'>
                                            <p className='date-live'>Đăng {formatModifiedTime(job.modifiedTime)}</p>
                                            {checkExpired(job.expireDate) ? (
                                                <p className='date-expired'>Đã hết hạn: {formatDate(job.expireDate)}</p>
                                            ) : (
                                                <p className='date-live'>Ngày hết hạn: {formatDate(job.expireDate)}</p>
                                            )}

                                        </div>
                                        <div className='job-count'>
                                            {(job.hireCount > 0) ? (
                                                <p>Số lượng cần tuyển: {job.hireCount}</p>) : (
                                                <p>Số lượng tuyển: Không giới hạn</p>
                                            )}
                                            {job.AppliedCount > 0 ? (
                                                <p>Số lượt ứng tuyển: {job.AppliedCount}</p>) : (
                                                <p>Chưa có lượt ứng tuyển nào</p>
                                            )
                                            }
                                            {job.newAppliedCount > 0 ? (
                                                <p className='last-count'>Lượt ứng tuyển mới: {job.newAppliedCount}</p>
                                            ) : (
                                                <p className='last-count'>Chưa có lượt ứng tuyển mới</p>
                                            )

                                            }
                                        </div>
                                        <div className='find-cv-box'>
                                            <NavLink to="/findCv">Tìm hồ sơ phù hợp <i className='fa-solid fa-arrow-right'></i></NavLink>
                                            {job.AppliedCount > 0 ? (
                                                <NavLink to={`/jobApplications/` + job.jobId} id='seeAppliedBtn'>Xem</NavLink>) : (
                                                <div></div>
                                            )}
                                        </div>
                                    </div>
                                )
                                )}
                            </div>
                        )
                        }
                    </div>
                </div>
                <div className='dashboard-right'>
                    <h2>{companyName}</h2>
                    <div className='company-job-count'>
                        <h4>Bạn có {jobList.length} tin tuyển dụng</h4>
                        {expiredCount === 0 ? (
                            <h5 className='no-expire'>Tất cả đều còn hạn</h5>
                        ) : (
                            <h5 className='has-expire'>Trong đó {expiredCount} tin đã hết hạn</h5>
                        )}
                    </div>
                    <div>
                        <h1>Biểu đồ số lượt ứng tuyển</h1>
                        <JobChart data={jobList} />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CompanyDashboard;