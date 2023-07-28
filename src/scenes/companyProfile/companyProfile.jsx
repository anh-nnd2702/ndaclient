import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getCompanyInfo } from "../../apis/company";
import CompanyProfileForm from "../../containers/companyProfileForm/companyProfileForm";
import "./companyProfille.css"
const CompanyProfileScene = ({isLoggedInHr, onChangeProfile}) =>{
    const navigate = useNavigate();
    const [companyInfo, setCompany] = useState({});

    useEffect(()=>{
        checkCompany()
    },[]);

    useEffect(()=>{
        checkCompany()
    },[isLoggedInHr, onChangeProfile]);

    const fetchCompanyData = async () =>{
        const companyId = localStorage.getItem('companyId')
        const conpanyData = await getCompanyInfo(companyId);
        setCompany(conpanyData);
    }

    const checkCompany = async () =>{
        const isHr = localStorage.getItem("isLoggedInHr") === 'true' || localStorage.getItem("isLoggedInHr") === true;
        if(!isHr){
            navigate('/');
        }
        else{
              await fetchCompanyData();
        }
    }

    const handleOnChangeProfile = async (updated) => {
        if (updated) {
            onChangeProfile(true);
        }
    };

    return (
        <div className="company-profile-body">
            <h1>Thông tin công ty</h1>
            <CompanyProfileForm company={companyInfo} onCompanyUpdate={handleOnChangeProfile}></CompanyProfileForm>
        </div>
    )


}

export default CompanyProfileScene;