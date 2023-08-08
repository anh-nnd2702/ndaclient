import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllCompany, updateCompanyStatus } from "../apis/company.js";
import { updateJobStatus } from "../apis/job.js";
import { deleteReport, getAllReport, updateReportStatus } from "../apis/reportJob.js";

const AdminDashboard = () => {
    const [companyList, setCompanyList] = useState([]);
    const [reportList, setReportList] = useState([]);
    const navigate = useNavigate();

    const fetchCompany = async () => {
        const isAdmin = localStorage.getItem("isAdmin") === true || localStorage.getItem("isAdmin") === "true";
        if (!isAdmin) {
            navigate("/adminLogin");
        }
        else {
            const noKeywords ="";
            let companies = await getAllCompany(noKeywords, isAdmin);
            if (companies && companies.length > 0) {
                companies = companies.filter((com) => {
                    return (com.isActive && !com.isGranted)
                })
                companies.sort((a, b) => {
                    if (a.companyLicense !== null && b.companyLicense !== null) {
                        return a.companyLicense.localeCompare(b.companyLicense);
                    } else if (a.companyLicense !== null && b.companyLicense === null) {
                        return -1;
                    } else if (a.companyLicense === null && b.companyLicense !== null) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                setCompanyList(companies)
            }
            else {
                setCompanyList([])
            }
        }
    }

    const fetchReport = async () => {
        try {
            const allReport = await getAllReport();
            if (allReport && allReport.length > 0) {
                setReportList(allReport);
            }
        }
        catch (error) {
            setReportList([]);
            console.log("error fetching report!");
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

    const handleChangePermission = async (companyId, isActive, isGranted) => {
        try {
            const result = await updateCompanyStatus(companyId, isActive, isGranted);
            if (result) {
                toast.success(`Duyệt tài khoản NTD thành công!`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 900,
                });
            }
        }
        catch (error) {
            toast.error(`Có lỗi xảy ra trong quá trình lưu!`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 900,
            });
        }
    }

    const handleLockJob = async (jobId) => {
        try{
            const formData = {isActive: false}
            const result = await updateJobStatus(jobId, formData);
            if(result){
                toast.success(`Tin tuyển dụng đã bị ẩn!`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 900,
                });
            }
        }
        catch(error){
            toast.error(`Có lỗi xảy ra khi ẩn tin!`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 900,
            });
        }
    }

    const handleDeleteReport = async (reportId) => {
        try{
            const result = await deleteReport(reportId);
            if(result){
                toast.success(`Xóa báo cáo thành công!`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 900,
                });
            }
        }
        catch(error){
            toast.error(`Có lỗi xảy ra khi xóa báo cáo!`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 900,
            });
        }
    }

    const handleLockCompany = async (companyId) => {
        try{
            const isActive = false;
            const isGranted = true;
            const result = await updateCompanyStatus(companyId, isActive, isGranted);
            if(result){
                toast.success(`Khóa tài khoản NTD thành công!`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 900,
                });
            }
        }
        catch(error){
            toast.error(`Có lỗi xảy ra khi khóa tài khoản!`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 900,
            });
        }
    }

    const handleUpdateReport = async (reportId) => {
        try{
            const newStatus = 1;
            const result = await updateReportStatus(reportId, newStatus);
            if(result){
                toast.success(`Đã bỏ qua báo cáo!`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 900,
                });
            }
        }
        catch(error){
            toast.error(`Có lỗi xảy ra khi bỏ qua báo cáo!`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 900,
            });
        }
    }

    useEffect(() => {
        fetchCompany();
        fetchReport();
    }, [])
    return (
        <div>
            <h1>Trang chủ admin</h1>
            <div className="company-list">
                <h2>Nhà tuyển dụng mới đăng ký</h2>
                {(companyList && companyList.length > 0) ? (
                    <div>
                        {companyList.map((company) => (
                            <div key={company.Id}>
                                <div>
                                    <img src={company.companyLogo} alt="company logo"></img>
                                </div>
                                <div>
                                    <h3><NavLink to={`/company/${company.Id}`}>{company.companyName}</NavLink></h3>
                                    <h4>{company.companyAddress} - {(company.City.cityId > 0) ? (company.City.cityName) : ("")}</h4>
                                    <p>{company.companyIntro}</p>
                                    {(company.companyLicense === null) ?
                                        (<span>Nhà tuyển dụng chưa tải lên giấy phép</span>) :
                                        (<NavLink to={company.companyLicense} target="_blank" rel="noopener noreferrer">Xem giấy phép</NavLink>)}
                                </div>
                                <div>
                                    <button type="button" onClick={() => handleChangePermission(company.Id, true, true)}>Cho phép đăng tin</button>
                                    <button type="button" onClick={() => handleChangePermission(company.Id, false, false)}>Không cho phép đăng tin</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h2>Chưa có nhà tuyển dụng mới nào!</h2>
                )}
            </div>

            <div className="report-div">
                {(reportList && reportList.length > 0) ? (
                    <div>
                        {reportList.map((report) => (
                            <div key={report.reportId}>
                                <h3><NavLink to={`/job/${report.Job.jobId}`}>{`ID-${report.Job.jobId} - ${report.Job.jobTitle}`}</NavLink></h3>
                                <h4>{report.Job.company.companyName}</h4>
                                <h4>Người báo cáo: {report.Candidate.fullName}</h4>
                                <p>Nội dung báo cáo: {report.reportDescribe}</p>
                                <span>Báo cáo {formatModifiedTime(report.reportTime)}</span>
                                <div className="report-actions">
                                    <button type="button" onClick={() => handleDeleteReport(report.reportId)}>Xóa báo cáo</button>
                                    <button type="button" onClick={() => handleLockJob(report.Job.jobId)}>Ẩn tin</button>
                                    <button type="button" onClick={() => handleLockCompany(report.Job.companyId)}>Khóa tài khoản NTD</button>
                                    {(report.reportStatus<1) ?
                                        (<button type="button" onClick={() => handleUpdateReport}>Bỏ qua báo cáo</button>) :
                                        (<span>Báo cáo đã duyệt</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h2>Chưa có báo cáo mới nào!</h2>
                )}
            </div>
            <ToastContainer></ToastContainer>
        </div>

    )

}

export default AdminDashboard;