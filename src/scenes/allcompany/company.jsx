import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllCompany } from '../../apis/company';
import "./company.css";
import LoadingDiv from "../../components/loading/loadingPage"
const AllCompany = () => {
    const [companyList, setCompanyList] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchListCompany = async (keyword) => {
        try { 
            const listCompany = await getAllCompany(keyword, checkIsAdmin());
            setCompanyList(listCompany);
        }
        catch (error) {
            console.log(error);
            setCompanyList([]);
        }
        
    }

    const checkIsAdmin = () => {
        const adminLoggedIn = localStorage.getItem("isAdmin");
        return (adminLoggedIn === true || adminLoggedIn === "true")
    }

    const checkCompanyStatus = (isActive, isGranted) => {
        if (isActive) {
            if (isGranted) {
                return "Đã kiểm duyệt"
            }
            else {
                return "Mới đăng ký"
            }
        }
        else {
            if (isGranted) {
                return "Đã bị khóa"
            }
            else {
                return "Duyệt không qua"
            }
        }
    }

    useEffect(() => {
        setIsLoading(true)
        setIsAdmin(checkIsAdmin())
        const keyword = "";
        fetchListCompany(keyword);
        setIsLoading(false)
    }, []);

    const handleSubmitSearch = () => {
        fetchListCompany(searchInput);
    }

    return (
        <div className='all-company-body'>
            <h1>Danh sách công ty</h1>
            <div className="search-div">
                <input type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}></input>
                <button type='button' onClick={() => handleSubmitSearch()} className="search-btn">Tìm kiếm</button>
            </div>
            <div className='company-list'>
                {companyList && companyList.map((company) => (
                    <NavLink className="link-company-card" key={company.Id} to={`/company/${company.Id}`}>
                        <div className="company-card">
                            <div className='company-card-left'>
                                <img src={company.companyLogo}></img>
                            </div>
                            <div className='company-card-right'>
                                <div className='name-and-tag'>
                                    <h2>{company.companyName}</h2>
                                    <span>{checkCompanyStatus(company.isActive, company.isGranted)}</span>
                                </div>
                                <span>Địa chỉ: </span>
                                <span>{company.City.cityId > 0 && company.City.cityName} - {company.companyAddress}</span>
                                <p>Giới thiệu: {(company.companyIntro) ? (` ${company.companyIntro}`) : (` Chưa có thông tin`)}</p>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
            {(companyList.length === 0) &&
                (
                    <h2>Không tìm thấy công ty nào!</h2>
                )
            }
            {isLoading && <LoadingDiv></LoadingDiv>}
        </div>

    );
}

export default AllCompany;