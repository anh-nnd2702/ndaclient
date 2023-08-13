import { useEffect, useState } from "react";
import { getAllJobs } from "../../apis/job.js";
import './allJob.css';
import Job from "../../components/jobCard/jobCard.jsx";
import { getReference } from "../../apis/reference.js";
import { useNavigate } from "react-router-dom";
import { getMatchJob } from "../../apis/matchJob.js";
import LoadingDiv from "../../components/loading/loadingPage.jsx";

const AllJob = ({ isHr }) => {
    const [jobs, setJobs] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [cityList, setCityList] = useState([]);
    const [workLevelList, setWorkLevelList] = useState([]);
    const [workFieldList, setWorkFieldList] = useState([]);
    const [jobTypeList, setJobTypeList] = useState([]);

    const [cityId, setCityId] = useState(0);
    const [workFieldId, setWorkFieldId] = useState(0);
    const [workLevelId, setWorkLevelId] = useState(0);
    const [minWage, setMinWage] = useState(0);
    const [jobTypeId, setJobTypeId] = useState(0);

    const [expId, setExpId] = useState(0);
    const [isNego, setIsNego] = useState(false);
    const navigate = useNavigate();

    const [matchJob, setMatchJob] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkLogin = () => {
        const loggedIn = localStorage.getItem("isLoggedIn") === true || localStorage.getItem("isLoggedIn") === "true";
        return loggedIn;
    }

    const checkLoginHr = () =>{
        const loggedIn = localStorage.getItem("isLoggedInHr") === true || localStorage.getItem("isLoggedInHr") === "true";
        return loggedIn;
    }

    const fetchMatchJobs = async () => {
        if (checkLogin()) {
            setIsLoggedIn(true);
            const matchJobs = await getMatchJob();
            if (matchJobs && matchJobs.length > 0) {
                setMatchJob(matchJobs)
            }
            else {
                setMatchJob([]);
            }
        }
        else {
            setIsLoggedIn(false);
        }
    }

    useEffect(() => {
        fetchJobs();
        fetchMatchJobs();
        if (checkLoginHr()) {
            navigate('/companyDashboard');
        }
        else {
            const isAdmin = localStorage.getItem("isAdmin") === true || localStorage.getItem("isAdmin") === "true";
            if (isAdmin) {
                navigate("/admin");
            }
        }
    }, []);

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

    const fetchJobs = async () => {
        try {
            const reference = await getReference();
            setCityList(reference.city);
            setWorkFieldList(reference.workField);
            setWorkLevelList(reference.workLevel);
            setJobTypeList(reference.jobType);
            const jobsData = await getAllJobs();
            if (!jobsData) return [];
            const updatedJobs = [...jobsData];
            setJobs(updatedJobs);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    const handleFilterSubmit = async () => {
        try {
            let wage = minWage;
            if (isNego) {
                wage = -1;
            }
            const filterParams = {
                cityId,
                workFieldId,
                jobTypeId,
                workLevelId,
                minExp: expList[expId].minVal,
                maxExp: expList[expId].maxVal,
                minWage: wage,
                keyword: searchInput,
            }

            const jobsData = await getAllJobs(filterParams);
            if (jobsData) {
                setJobs(jobsData);
            }
        }
        catch {
            setJobs([]);
        }
    }

    return (
        <div>{isLoggedIn &&
            <div className="match-job-box">
                <h1 className="match-job-title">Việc làm gợi ý dành cho bạn</h1>
                {(matchJob && matchJob.length>0)? (
                    <div className="match-job-list">
                        {matchJob.map((mJ)=>(
                            <div key={mJ.matchId}>
                                <Job key={mJ.Job.jobId} job={mJ.Job}></Job>
                            </div>
                        ))}
                    </div>
                ):(
                    <h4 className="non-match-job">Chưa có việc làm phù hợp với bạn, vui lòng đặt lại cài đặt tìm việc để nhận được gợi ý!</h4>
                )}
            </div>
            }
            <div className="all-job">
                <div className="all-job-header">
                    <h1>Tìm việc làm nhanh, mới nhất:</h1>
                    <div className="search-div">
                        <input type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}></input>
                        <button className="search-btn" onClick={handleFilterSubmit}>Tìm kiếm</button>
                    </div>

                </div>
                <div className="all-job-body">
                    <div className="filter-box">
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
                            <label htmlFor="jobType">Hình thức làm việc:</label>
                            <select id="jobType"
                                name='jobTypeId'
                                value={jobTypeId}
                                onChange={(e) => setJobTypeId(e.target.value)}>
                                {jobTypeList.map((jt) => (
                                    <option key={jt.jobTypeId} value={jt.jobTypeId}>
                                        {jt.jobTypeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="job-filter-box">
                            <label htmlFor="workLevel">Cấp bậc:</label>
                            <select id="workLevel"
                                name='workLevelId'
                                value={workLevelId}
                                onChange={(e) => setWorkLevelId(e.target.value)}>
                                {workLevelList.map((wL) => (
                                    <option key={wL.workLevelId} value={wL.workLevelId}>
                                        {wL.workLevelName}
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
                            <label htmlFor="wage">Mức lương từ:</label>
                            <div className="wage-input">
                                <input
                                    disabled={isNego}
                                    type="number"
                                    max={99}
                                    min={0}
                                    id="minWage"
                                    name="minWage"
                                    value={minWage}
                                    onChange={(e) => setMinWage(e.target.value)}
                                    required
                                />
                                <p>triệu đồng</p>
                            </div>
                        </div>
                        <div className="nego-wage-box">
                            <label htmlFor="isNego">Hoặc: lương thỏa thuận:</label>
                            <input
                                type="checkbox"
                                id="isNego"
                                checked={isNego}
                                onChange={(e) => { setIsNego(e.target.checked) }}
                            />
                        </div>
                        <button className="filter-btn" onClick={handleFilterSubmit}>Lọc</button>
                    </div>
                    <div className="job-list">
                        {jobs && jobs.map((job) => (
                            <Job key={job.jobId} job={job} />
                        ))}
                        {jobs.length === 0 && (
                            <div>
                                <h2>Không tìm thấy việc làm nào!</h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <LoadingDiv isLoading={isLoading}></LoadingDiv>
        </div>
    );

}

export default AllJob;