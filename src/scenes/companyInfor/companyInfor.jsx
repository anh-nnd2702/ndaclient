import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { getCompanyInfo } from '../../apis/company.js';
import { getJobByCompany } from "../../apis/job.js";
import JobCard from "../../components/jobCard/jobCard"

const CompanyInfor = () => {
    const [companyData, setCompanyData] = useState({});
    const [jobList, setJobList] = useState([]);
    const { companyId } = useParams();
    const [isAdmin, setIsAdmin] = useState(false);
    const [address, setAddress] = useState("");

    const fetchCompany = async () => {
        try {
            const company = await getCompanyInfo(companyId);
            if (company) {
                setCompanyData(company);
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

    const checkCompanyStatus = (isActive, isGranted) =>{
        if(isActive){
            if(isGranted){
                return "Đã kiểm duyệt"
            }
            else{
                return "Mới đăng ký"
            }
        }
        else{
            if(isGranted){
                return "Đã bị khóa"
            }
            else{
                return "Duyệt không qua"
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
    }, [])

    const checkNull = (val) => {
        return (val === "" || val === null || val === "null" || val === undefined || val === "undefined")
    }

    return (
        <div className='company-infor-body'>
            <div>
                <div>
                    <img src={companyData.companyLogo} alt="company logo"></img>
                </div>
                <div>
                    <h2>{companyData.companyName}</h2>
                    <p><i className='fa-solid fa-location-dot'></i>{checkNull(address) ? (` Chưa có thông tin`) : (` ${address}`)}</p>
                </div>
            </div>
            {isAdmin && (
                <div>
                    <p>{`Trạng thái tài khoản: ${checkCompanyStatus(companyData.isActive,companyData.isGranted)}`}</p>
                </div>)}
            <div>
                <h3>Thông tin công ty</h3>
                <h4>Giới thiệu công ty:</h4>
                <p>{checkNull(companyData.companyIntro) ? (" Chưa có thông tin") : (` ${companyData.companyIntro}`)}</p>
                <h4>Thông tin liên hệ:</h4>
                <p><i className='fa-solid fa-phone'></i>{!checkNull(companyData.companyPhone) ? (` ${companyData.companyPhone}`) : (" Chưa có thông tin")}</p>
                <p><i className='fa-solid fa-link'></i>{!checkNull(companyData.companyLink) ? (<a href={companyData.companyLink}>{` ${companyData.companyLink}`}</a>) : (" Chưa có thông tin")}</p>
            </div>
            <div>
                {(jobList && jobList.length > 0) ? (
                    <div>
                        <h3>Tin tuyển dụng của công ty:</h3>
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
        </div>
    )
}

export default CompanyInfor;