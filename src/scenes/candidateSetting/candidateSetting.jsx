import React, { useEffect, useState } from "react";
import "./candidateSetting.css";
import { useNavigate } from 'react-router-dom';
import { getCandidate } from "../../apis/candidate";
import { getReference } from "../../apis/reference";
import SettingForm from "../../containers/profileForm/SettingForm";
const SettingScene = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    const [candidateSetting, setCandidateSetting] = useState({});
    const [cityList, setCityList] = useState([]);
    const [workLevelList, setWorkLevelList] = useState([]);
    const [workFieldList, setWorkFieldList] = useState([]);
    const [jobTypeList, setJobTypeList] = useState([]);
    const [eduLevelList, setEduLevelList] = useState([]);

    useEffect(() => {
        checkLoginStatus();
    }, [isLoggedIn]);

    const checkLoginStatus = async () => {
        const hasLog = localStorage.getItem("isLoggedIn") === 'true' || localStorage.getItem("isLoggedIn") === true;
        if (!hasLog) {
            navigate('/login');
        }
        else {
            fetchCandidateData();
            fetchReference();
        }
    
}

const fetchCandidateData = async () => {
    try {
        const candidate = await getCandidate();
        setCandidateSetting(candidate);
    } catch (error) {
        console.error('There was an error fetching candidate data:', error);
    }
};

const fetchReference = async () => {
    try {
        const reference = await getReference();
        setCityList(reference.city);
        setWorkFieldList(reference.workField);
        setWorkLevelList(reference.workLevel);
        setJobTypeList(reference.jobType);
        setEduLevelList(reference.educationLevel);
    } catch (error) {
        console.error('There was an error fetching reference data:', error);
    }
}

return (
    <div>
        <SettingForm candidate={candidateSetting} cityList={cityList} workFieldList={workFieldList} workLevelList={workLevelList} jobTypeList={jobTypeList} />
    </div>
)
}

export default SettingScene;