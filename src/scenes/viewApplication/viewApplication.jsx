import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import html2pdf from 'html2pdf.js';
import 'react-toastify/dist/ReactToastify.css';
import { getApplyById } from '../../apis/applyJob';
import { updateApplyStatus } from "../../apis/applyJob.js";
import { useNavigate, useParams } from 'react-router-dom';
import "./viewApplicant.css";
import ApplicationInfor from '../../components/appliedInfor/appliedInfor';
const ViewApplication = () => {
    const navigate = useNavigate();
    const { applyId } = useParams();
    const [applyData, setApplyData] = useState({});
    const [jobData, setJobData] = useState({});

    const fetchData = async () => {
        const isHr = localStorage.getItem("isLoggedInHr") === true || localStorage.getItem("isLoggedInHr") === "true";
        if (!isHr) {
            navigate("/login");
        }
        else {
            const applyData = await getApplyById(applyId);
            setJobData(applyData.Job)
            setApplyData(applyData);
            if (applyData.applyStatus === 0) {
                const statusUpdate = 1;
                const updated = await updateApplyStatus(applyId, statusUpdate);
            }
        }
    }
    const handlePrintPDF = () => {
        const element = document.getElementById('componentToPrint');
        html2pdf()
            .from(element)
            .save('file.pdf');
    };

    const updateStatusApply = async (newStatus) => {
        const updated = await updateApplyStatus(applyId, newStatus);
        if (updated.applyStatus === 2) {
            toast.success('Đã đánh dấu hồ sơ phù hợp', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 800,
            });
        }

        if (updated.applyStatus === 3) {
            toast.success('Đã đánh dấu hồ sơ bị loại', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 800,
            });
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
    }, [applyId])

    return (
        <div className='view-apply-body'>
            <div className='view-job'>
                <h2>Đã ứng tuyển tin: {jobData.jobTitle}</h2>
                <p>{formatModifiedTime(applyData.applyTime)}</p>
            </div>
           
                <ApplicationInfor apply={applyData}></ApplicationInfor>
            
            <div className='hr-action'>
                <button id="cvPassBtn" onClick={() => updateStatusApply(2)}><i className='fa-solid fa-thumbs-up'></i>  Hồ sơ phù hợp</button>
                <button id="cvFailBtn" onClick={() => updateStatusApply(3)}><i className='fa-solid fa-thumbs-down'></i>  Loại hồ sơ này</button>
                <button id="backBtn" onClick={() => navigate(`/jobApplications/${jobData.jobId}`)}><i className='fa-solid fa-backward'></i>  Trở lại</button>
                <button className="print-pdf" onClick={handlePrintPDF}><i className='fa-solid fa-download'></i>   Tải file pdf</button>
            </div>
            <ToastContainer />
        </div>
    )

}

export default ViewApplication;