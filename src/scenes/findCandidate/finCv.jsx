import React, { useEffect, useState } from 'react';
import { getAllCv } from '../../apis/cv.js';
import { getReference } from '../../apis/reference.js';
import "./findCv.css";
import { useNavigate } from "react-router-dom";

const FindCandidateCv = ({ isLoggedInHr }) => {
    const [cvList, setCvList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [workLevelList, setWorkLevelList] = useState([]);
    const [workFieldList, setWorkFieldList] = useState([]);
    const [jobTypeList, setJobTypeList] = useState([]);

    const [cityId, setCityId] = useState(0);
    const [workFieldId, setWorkFieldId] = useState(0);
    const [eduLevelId, setEduLevelId] = useState(0);
    const [skill, setSkill] = useState("");
    const [educationLevel, setEduLevel] = useState([]);

    const [expId, setExpId] = useState(0);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const expList = [
        {
            "id": "0",
            "label": "Tất cả",
            "minVal": -1,
            "maxVal": 100
        },
        {
            "id": "1",
            "label": "Chưa có kinh nghiệm",
            "minVal": 0,
            "maxVal": 0
        },
        {
            "id": "2",
            "label": "Từ 1 - 3 năm",
            "minVal": 1,
            "maxVal": 3
        },
        {
            "id": "3",
            "label": "Từ 4 - 6 năm",
            "minVal": 4,
            "maxVal": 6
        },
        {
            "id": "4",
            "label": "Từ 7 - 10 năm",
            "minVal": 7,
            "maxVal": 10
        },
        {
            "id": "5",
            "label": "Trên 10 năm",
            "minVal": 10,
            "maxVal": 100
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
            setWorkLevelList(reference.workLevel);
            setJobTypeList(reference.jobType);
            setEduLevel(reference.educationLevel);

            const listCv = await getAllCv();

            if (listCv) {
                setCvList(listCv);
            }
        }
        catch (error) {
            setCvList([])
        }
    }

    const handleFilterSubmit = async () => {
        try {
            const listCv = await getAllCv();
            if (listCv) {
                setCvList(listCv);
            }
        }
        catch (error) {
            setCvList([])
        }
    }

    useEffect(() => {
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
                            {expList.map((exp) => (
                                <option key={exp.id} value={exp.id}>
                                    {exp.label}
                                </option>
                            ))}
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
                        <label htmlFor="education">Giới tính:</label>
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
                                <div key={cv.cvId} className='cv-card'>
                                    <div className='cv-card-head'>
                                        <h2>{cv.fullName}</h2>
                                        <h3>{cv.cvPosition}</h3>
                                    </div>
                                    <h4>Giới thiệu, mục tiêu nghề nghiệp:</h4>
                                    <p>{cv.cvIntro}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h2>Không tìm thấy Cv nào</h2>
                    )}
                </div>
            </div>
        </div>

    )

}

export default FindCandidateCv;