import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { getAllCompany } from '../../apis/company';

const AllCompany = () => {
    const [companyList, setCompanyList] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const [isAdmin, setIsAdmin] = useState(false);

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

    useEffect(() => {
        setIsAdmin(checkIsAdmin())
        const keyword = "";
        fetchListCompany(keyword);
    }, []);

    const handleSubmitSearch = () => {
        fetchListCompany(searchInput);
    }

    return (
        <div>
            <h1>Danh sách công ty</h1>
            <div className="search-div">
                <input type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}></input>
                <button type='button' onClick={() => handleSubmitSearch()} className="search-btn">Tìm kiếm</button>
            </div>
            <div>
                {companyList && companyList.map((company) => (
                    <div key={company.Id}>
                        <div>
                            <img src={company.companyLogo}></img>
                        </div>
                        <div>
                            <div>
                                <h3><NavLink to={`/company/${company.Id}`}>{company.companyName}</NavLink></h3>
                                <span>{checkCompanyStatus(company.isActive, company.isGranted)}</span>
                            </div>
                            <span>Địa chỉ: </span>
                            <span>{company.City.cityId > 0 && company.City.cityName} - {company.companyAddress}</span>
                            <p>Giới thiệu: {(company.companyIntro) ? (` ${company.companyIntro}`) : (` Chưa có thông tin`)}</p>
                        </div>
                    </div>
                ))}
            </div>
            {(companyList.length === 0) &&
                (
                    <h2>Không tìm thấy công ty nào!</h2>
                )
            }
        </div>

    );
}

export default AllCompany;