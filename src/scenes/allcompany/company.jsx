import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { getAllCompany } from '../../apis/company';

const AllCompany = () => {
    const [companyList, setCompanyList] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const fetchListCompany = async (keyword) => {
        try {
            const listCompany = await getAllCompany(keyword);
            setCompanyList(listCompany);
        }
        catch (error) {
            console.log(error);
            setCompanyList([]);
        }
    }

    useEffect(() => {
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
                        <h3>{company.companyName}</h3>
                        <span>Địa chỉ: </span>
                        <span>{company.City.cityId > 0 && company.City.cityName} - {company.companyAddress}</span>
                        <p>{company.companyIntro}</p>
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