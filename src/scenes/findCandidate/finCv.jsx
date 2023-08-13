import React, { useEffect, useState } from 'react';
import { getAllCv } from '../../apis/cv.js';
import { getReference } from '../../apis/reference.js';
import "./findCv.css";
import { NavLink, useNavigate } from "react-router-dom";
import LoadingDiv from '../../components/loading/loadingPage.jsx';
import { getCompanyInfo } from '../../apis/company.js';
import NewCompanyCover from '../../components/newCompanyCover/newCompanyCover.jsx';

const FindCandidateCv = () => {
    const [cvList, setCvList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [workFieldList, setWorkFieldList] = useState([]);
    const [companyInfor, setCompanyInfor] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const [cityId, setCityId] = useState(0);
    const [workFieldId, setWorkFieldId] = useState(0);
    const [eduLevelId, setEduLevelId] = useState(0);
    const [skill, setSkill] = useState("");
    const [gender, setGender] = useState(0);
    const [educationLevel, setEduLevel] = useState([]);

    const [expId, setExpId] = useState(0);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const genderList = [
        {
            "id": "0",
            "label": "Tất cả",
            "value": 0,
        },
        {
            "id": "1",
            "label": "Nữ",
            "value": 1,
        },
        {
            "id": "2",
            "label": "Nam",
            "value": 2,
        }
    ]

    const handleExpChange = (e) => {
        setExpId(e.target.value);
    }

    const fetchCv = async () => {
        try {
            const reference = await getReference();
            setCityList(reference.city);
            setWorkFieldList(reference.workField);
            setEduLevel(reference.educationLevel);
            const filterParams = {keyword, cityId, workFieldId, experience: expId, eduLevelId, gender, skill}
            const listCv = await getAllCv(filterParams);

            if (listCv) {
                setCvList(listCv);
            }
        }
        catch (error) {
            console.log(error);
            setCvList([])
        }
        setIsLoading(false)
    }

    const fetchCompany = async () =>{
        const isHr = localStorage.getItem("isLoggedInHr") === true || localStorage.getItem("isLoggedInHr") === "true";
        if(isHr){
            const companyId = localStorage.getItem("companyId")
            const companyData = await getCompanyInfo(companyId);
            setCompanyInfor(companyData);
        }
        else {
            navigate('/login')
        }
    }

    const handleFilterSubmit = async () => {
        try {
            const filterParams = {keyword, cityId, workFieldId, experience: expId, eduLevelId, gender, skill}
            const listCv = await getAllCv(filterParams);
            if (listCv) {
                setCvList(listCv);
            }
        }
        catch (error) {
            setCvList([])
        }
    }

    useEffect(() => {
        fetchCompany();
        fetchCv();
    }, []);

    return (
        <div className='find-cv-body'>
            <h1>Tìm ứng viên</h1>
            <div className='search-body'>
                <div className="cv-filter-box">
                    <div className="job-filter-box">
                        <label htmlFor="keyword">Từ khóa:</label>
                        <input id="keyword"
                            name='keyword'
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}>
                        </input>
                    </div>
                    <div className="job-filter-box">
                        <label htmlFor="city">Tỉnh/ Thành phố:</label>
                        <select id="city"
                            name='cityId'
                            value={cityId}
                            onChange={(e) => setCityId(e.target.value)}>
                            {cityList.map((city) => (
                                <option key={city.cityId} value={city.cityId}>
                                    {city.cityName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="job-filter-box">
                        <label htmlFor="workField">Lĩnh vực/Chuyên môn:</label>
                        <select id="workField"
                            name='workFieldId'
                            value={workFieldId}
                            onChange={(e) => setWorkFieldId(e.target.value)}>
                            {workFieldList.map((wF) => (
                                <option key={wF.workFieldId} value={wF.workFieldId}>
                                    {wF.workFieldName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="job-filter-box">
                        <label htmlFor="experience">Kinh nghiệm:</label>
                        <select id="experience"
                            name='experience'
                            value={expId}
                            onChange={handleExpChange}>
                            <option key={0} value={0}>
                                    Tất cả
                                </option>
                            <option key={1} value={1}>
                                    Chưa có kinh nghiệm
                                </option>

                            <option key={2} value={2}>
                                Đã có kinh nghiệm
                                </option>
                        </select>
                    </div>
                    <div className="job-filter-box">
                        <label htmlFor="education">Học vấn:</label>
                        <select id="education"
                            name='education'
                            value={eduLevelId}
                            onChange={(e) => setEduLevelId(e.target.value)}>
                            {educationLevel.map((edu) => (
                                <option key={edu.eduLevelId} value={edu.eduLevelId}>
                                    {edu.eduLevelName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="job-filter-box">
                        <label htmlFor="gender">Giới tính:</label>
                        <select id="gender"
                            name='gender'
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}>
                            {genderList.map((gend) => (
                                <option key={gend.id} value={gend.value}>
                                    {gend.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="job-filter-box">
                        <label htmlFor="skill">Kỹ năng:</label>
                        <input id="skill"
                            name='skill'
                            type="text"
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}>
                        </input>
                    </div>
                    <div className='btn-box'>
                        <button className="filter-btn" onClick={handleFilterSubmit}>Lọc</button>
                    </div>
                </div>
                <div className='cv-list'>
                    {(cvList && cvList.length > 0) ? (
                        <div>
                            {cvList.map((cv, cvId) => (
                                <NavLink to={`/viewCv/${cv.cvId}`} key={cv.cvId} className='cv-item-link'>
                                    <div className='cv-card'>
                                        <div className='cv-card-head'>
                                            <h2>{cv.fullName}</h2>
                                            <h5>{cv.cvPosition}</h5>
                                        </div>
                                        <h4>Giới thiệu, mục tiêu nghề nghiệp:</h4>
                                        <p>{cv.cvIntro}</p>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    ) : (
                        <h2>Không tìm thấy Cv nào</h2>
                    )}
                </div>
                <LoadingDiv isLoading={isLoading}></LoadingDiv>
                {(companyInfor.isActive==true && companyInfor.isGranted==false)&&(
                    <NewCompanyCover></NewCompanyCover>
                )}
            </div>
        </div>

    )

}

export default FindCandidateCv;