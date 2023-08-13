import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllCompany, updateCompanyStatus } from "../../apis/company.js";
import { deleteReport, getAllReport, updateReportStatus } from "../../apis/reportJob.js";
import ReportCard from "../../components/reportCard/reportCard.jsx";
import LoadingDiv from "../../components/loading/loadingPage.jsx";
import "./adminDashboard.css"

const AdminDashboard = () => {
    const [companyList, setCompanyList] = useState([]);
    const [reportList, setReportList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
    }

    const fetchReport = async () => {
        try {
            let allReport = await getAllReport();
            if (allReport && allReport.length > 0) {
                allReport = allReport.filter((report) => {
                    return (!report.reportStatus)
                })
                console.log(allReport);
                setReportList(allReport);
            }
        }
        catch (error) {
            setReportList([]);
            console.log("error fetching report!");
        }
    }

    const handleChangePermission = async (companyId, isActive, isGranted) => {
        try {
            const result = await updateCompanyStatus(companyId, isActive, isGranted);
            if (result) {
                toast.success(`Duyệt tài khoản NTD thành công!`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 900,
                });
                removeCompanyFromList(companyId)
            }
        }
        catch (error) {
            toast.error(`Có lỗi xảy ra trong quá trình lưu!`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 900,
            });
        }
    }

    /*const handleLockJob = async (jobId) => {
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
    }*/

    const removeReportFromList = (reportId) =>{
        const newReportList = reportList.filter((rp) =>{
            return (rp.reportId) !== reportId
        })
        setReportList(newReportList);
    }

    const removeCompanyFromList = (companyId) =>{
        const newCompanyList = companyList.filter((cpn) =>{
            return cpn.Id !== companyId
        });
        setCompanyList(newCompanyList);
    }

    const handleDeleteReport = async (reportId) => {
        try{
            const result = await deleteReport(reportId);
            if(result){
                toast.success(`Xóa báo cáo thành công!`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 900,
                });
                removeReportFromList(reportId)
            }
        }
        catch(error){
            toast.error(`Có lỗi xảy ra khi xóa báo cáo!`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 900,
            });
        }
    }

    /*const handleLockCompany = async (companyId) => {
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
    }*/

    const handleUpdateReport = async (reportId) => {
        try{
            const newStatus = 1;
            const result = await updateReportStatus(reportId, newStatus);
            if(result){
                toast.success(`Đã bỏ qua báo cáo!`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 900,
                });
                removeReportFromList(reportId);
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
        <div className="admin-dashboard-body">
            <h1>Trang chủ</h1>
            <div className="company-list">
                <h2>Nhà tuyển dụng mới đăng ký</h2>
                {(companyList && companyList.length > 0) ? (
                    <div>
                        {companyList.map((company) => (
                            <div key={company.Id} className='company-card'>
                                <div className="card-left">
                                    <img src={company.companyLogo} alt="company logo"></img>
                                </div>
                                <div className="card-center">
                                    <NavLink to={`/company/${company.Id}`}><h3>{company.companyName}</h3></NavLink>
                                    <h4>{company.companyAddress} - {(company.City.cityId > 0) ? (company.City.cityName) : ("")}</h4>
                                    <p>Giới thiệu: {company.companyIntro?(`${company.companyIntro}`):('Chưa có giới thiệu')}</p>
                                    {(company.companyLicense === null) ?
                                        (<span>Nhà tuyển dụng chưa tải lên giấy phép</span>) :
                                        (<NavLink to={company.companyLicense} target="_blank" rel="noopener noreferrer">Xem giấy phép</NavLink>)}
                                </div>
                                <div className="card-right">
                                    <button className="btn-oke" type="button" onClick={() => handleChangePermission(company.Id, true, true)}>Cho phép đăng tin</button>
                                    <button className="btn-cancel" type="button" onClick={() => handleChangePermission(company.Id, false, false)}>Không cho phép đăng tin</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h3>Chưa có nhà tuyển dụng mới nào!</h3>
                )}
            </div>

            <div className="report-div">
                    <h2>Báo cáo tin tuyển dụng</h2>
                {(reportList && reportList.length > 0) ? (
                    <div>
                        {reportList.map((report) => (
                            <div key={report.reportId}>
                                <ReportCard report={report} handleDeleteReport={handleDeleteReport} handleUpdateReport={handleUpdateReport}></ReportCard>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h3>Chưa có báo cáo mới nào!</h3>
                )}
            </div>
            <ToastContainer></ToastContainer>
            <LoadingDiv isLoading={isLoading}></LoadingDiv>
        </div>

    )
}

export default AdminDashboard;