import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getApplyById } from '../../apis/applyJob';
import { updateApplyStatus } from "../../apis/applyJob.js"
import { useNavigate, useParams } from 'react-router-dom';
import ApplicationInfor from '../../components/appliedInfor/appliedInfor';
const CandidateApplication = ({isLoggedIn}) => {
    const navigate = useNavigate();
    const { applyId } = useParams();
    const [applyData, setApplyData] = useState({});
    const [jobData, setJobData] = useState({});

    const fetchData = async () => {
        const isHr = localStorage.getItem("isLoggedIn") === true || localStorage.getItem("isLoggedIn") === "true";
        if (!isHr) {
            navigate("/login");
        }
        else {
            const applyData = await getApplyById(applyId);
            setJobData(applyData.Job)
            setApplyData(applyData);
        }
    }

    const formatModifiedTime = (modifiedDate) => {
        const date = new Date(modifiedDate);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const formattedDate = `Ngày: ${day}/${month}/${year} lúc ${hours}:${minutes}`;
        return formattedDate;
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        fetchData();
    }, [applyId, isLoggedIn])

    return (
        <div className='view-apply-body'>
            <div className='view-job'>
                <h2>Đã ứng tuyển tin: {jobData.jobTitle}</h2>
                <p>{formatModifiedTime(applyData.applyTime)}</p>
            </div>
            <ApplicationInfor apply={applyData}></ApplicationInfor>
        </div>
    )

}

export default CandidateApplication;