import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateCompanyStatus } from '../../apis/company.js';
import { getCompanyInfo } from '../../apis/company.js';
import { getJobByCompany } from "../../apis/job.js";
import JobCard from "../../components/jobCard/jobCard"
import "./companyInfor.css"
const CompanyInfor = () => {
    const [companyData, setCompanyData] = useState({});
    const [jobList, setJobList] = useState([]);
    const { companyId } = useParams();
    const [isAdmin, setIsAdmin] = useState(false);
    const [address, setAddress] = useState("");
    const [companyStatus, setCompanyStatus] = useState("");

    const fetchCompany = async () => {
        try {
            const company = await getCompanyInfo(companyId);
            if (company) {
                setCompanyData(company);
                setCompanyStatus(checkCompanyStatus(company.isActive, company.isGranted))
                if (company.City.cityId > 0 && !checkNull(company.companyAddress)) {
                    setAddress(`${company.City.cityName} - ${company.companyAddress}`)
                }
                else if (company.City.cityId > 0) {
                    setAddress(company.City.cityName);
                }
            }
            const jobs = await getJobByCompany(companyId);
            if (jobs) {
                setJobList(jobs);
            }
        }
        catch (error) {
            setJobList([]);
            setCompanyData({});
        }
    }

    const checkCompanyStatus = (isActive, isGranted) => {
        if (isActive) {
            if (isGranted) {

                return "Đã kiểm duyệt";
            }
            else {

                return "Mới đăng ký";
            }
        }
        else {
            if (isGranted) {

                return "Đã bị khóa";
            }
            else {

                return "Duyệt không qua";
            }
        }
    }

    const checkAdmin = () => {
        const isAdminLoggedIn = localStorage.getItem("isAdmin");
        return (isAdminLoggedIn === true || isAdminLoggedIn === "true")
    }

    useEffect(() => {
        fetchCompany();
        setIsAdmin(checkAdmin());
    }, []);

    const handleChangePermission = async (companyId, isActive, isGranted) => {
        try {
            const result = await updateCompanyStatus(companyId, isActive, isGranted);
            if (result) {
                toast.success(`Cập nhật trạng thái NTD thành công!`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 900,
                });
                setCompanyData(result);
                setCompanyStatus(checkCompanyStatus(result.isActive, result.isGranted));
            }
        }
        catch (error) {
            toast.error(`Có lỗi xảy ra trong quá trình lưu!`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 900,
            });
        }
    }

    const checkNull = (val) => {
        return (val === "" || val === null || val === "null" || val === undefined || val === "undefined")
    }

    return (
        <div className='company-infor-box'>
            <div className='company-infor-head'>
                <div className='infor-head-left'>
                    <img src={companyData.companyLogo} alt="company logo"></img>
                </div>
                <div className='infor-head-right'>
                    <h2>{companyData.companyName}</h2>
                    <p><i className='fa-solid fa-location-dot'></i>{checkNull(address) ? (` Chưa có thông tin`) : (` ${address}`)}</p>
                    <div className='company-infor-body'>
                        <h3>Thông tin công ty</h3>
                        <h4>Thông tin liên hệ:</h4>
                        <p><i className='fa-solid fa-phone'></i>{!checkNull(companyData.companyPhone) ? (` ${companyData.companyPhone}`) : (" Chưa có thông tin")}</p>
                        <p><i className='fa-solid fa-link'></i>{!checkNull(companyData.companyLink) ? (<a href={companyData.companyLink}>{` ${companyData.companyLink}`}</a>) : (" Chưa có thông tin")}</p>
                    </div>
                </div>
            </div>
            <div className='intro-box'>
                <h4>Giới thiệu công ty:</h4>
                <span className='company-intro'>{checkNull(companyData.companyIntro) ? (" Chưa có thông tin") : (` ${companyData.companyIntro}`)}</span>
            </div>
            {isAdmin && (
                <div className='company-status'>
                    <h4>{`Trạng thái tài khoản: ${companyStatus}`}</h4>
                    <div>
                        {(companyStatus === "Đã kiểm duyệt") &&
                            <button className='btn-cancel' onClick={()=>handleChangePermission(companyData.Id, false, true)}>Khóa tài khoản</button>}
                        {(companyStatus === "Mới đăng ký") && <div>
                            <button className='btn-oke' onClick={()=>handleChangePermission(companyData.Id, true, true)}>Cho phép đăng tin</button>
                            <button className='btn-cancel' onClick={()=>handleChangePermission(companyData.Id, false, false)}>Không cho đăng tin</button>
                        </div>}
                        {(companyStatus === "Duyệt không qua") && <div>
                            <button className='btn-oke' onClick={()=>handleChangePermission(companyData.Id, true, true)}>Cho phép đăng tin</button>
                        </div>}
                        {(companyStatus === "Đã bị khóa") && <div>
                            <button className='btn-oke' onClick={()=>handleChangePermission(companyData.Id, true, true)}>Mở khóa tài khoản</button>
                        </div>}
                    </div>
                </div>)}

            <div className='company-job-list'>
                {(jobList && jobList.length > 0) ? (
                    <div>
                        <h2>Tin tuyển dụng của công ty:</h2>
                        {jobList.map((job) => (
                            <div key={job.jobId}>
                                <JobCard job={job}></JobCard>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h3>Công ty không có tin tuyển dụng nào</h3>
                )}
            </div>
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default CompanyInfor;