import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import 'react-toastify/dist/ReactToastify.css';
import { getApplyById } from '../../apis/applyJob';
import { updateApplyStatus } from "../../apis/applyJob.js";
import { useNavigate, useParams } from 'react-router-dom';
import "./viewApplicant.css";
import ApplicationInfor from '../../components/appliedInfor/appliedInfor';
import LoadingDiv from '../../components/loading/loadingPage';
const ViewApplication = () => {
    const navigate = useNavigate();
    const { applyId } = useParams();
    const [hasFetched, setHasFetched] = useState(false);
    const [applyData, setApplyData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [updated, setUpdated] = useState(false);
    const fetchData = async () => {
        const isHr = localStorage.getItem("isLoggedInHr") === true || localStorage.getItem("isLoggedInHr") === "true";
        if (!isHr) {
            navigate("/login");
        }
        else {
            const appliedJob = await getApplyById(applyId);
            setApplyData(appliedJob);
            setHasFetched(true);
        }
        setIsLoading(false);
    }

    const updateStatusIfNotViewed= async () =>{
        try{
            if(applyData.applyStatus===0){
                const newStatus = 1;
                await updateApplyStatus(applyId, newStatus);
                setUpdated(true);
            }
        }
        catch (error){

        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(()=>{
        if(hasFetched && !updated){
            updateStatusIfNotViewed();
        }
    }, [hasFetched])

    const handlePrintPDF = (fullName) => {
        const element = document.getElementById('componentToPrint');
        console.log(fullName);
        html2pdf()
            .from(element)
            .save(`${fullName}_fileCv.pdf`);
    };

    /*const handlePrintPDF = async (fullName) => {
        const element = document.getElementById('componentToPrint');
        const pdfOptions = {
            margin: 10,
            filename: `${fullName}_fileCv.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };

        // Calculate the height of the content
        const contentHeight = element.clientHeight;
        const pageHeight = 297; // A4 height in mm
        const numPages = Math.ceil(contentHeight / pageHeight);

        // Create an array of promises to capture individual page images
        const promises = [];
        for (let i = 0; i < numPages; i++) {
            const offset = -i * pageHeight;
            element.style.transform = `translateY(${offset}px)`;

            const promise = html2canvas(element, { scale: 0.2 })
                .then(canvas => {
                    const imgData = canvas.toDataURL('image/jpeg');
                    return {
                        imgData,
                        width: canvas.width,
                        height: canvas.height,
                    };
                });

            promises.push(promise);
        }

        // Reset the transform property
        element.style.transform = '';

        // Wait for all promises to resolve
        const pageImages = await Promise.all(promises);

        // Generate PDF with multiple pages
        const pdf = new jsPDF();
        pageImages.forEach((pageImage, index) => {
            if (index !== 0) {
                pdf.addPage();
            }
            pdf.addImage(pageImage.imgData, 'JPEG', 0, 0, pageImage.width, pageImage.height);
        });

        // Save PDF to a file
        pdf.save(`${fullName}_fileCv.pdf`);
    };
    */

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

    /*useEffect(() => {
        fetchData();
    }, [applyId])*/

    return (
        <div className='view-apply-body'>
            <div className='view-job'>
                <h2>Đã ứng tuyển tin: {applyData.Job ? (`${applyData.Job.jobTitle}`) : ('')}</h2>
                <p>{formatModifiedTime(applyData.applyTime)}</p>
            </div>
            <div>
                <ApplicationInfor apply={applyData}></ApplicationInfor>
            </div>
            <div className='hr-action'>
                <button id="cvPassBtn" onClick={() => updateStatusApply(2)}><i className='fa-solid fa-thumbs-up'></i>  Hồ sơ phù hợp</button>
                <button id="cvFailBtn" onClick={() => updateStatusApply(3)}><i className='fa-solid fa-thumbs-down'></i>  Loại hồ sơ này</button>
                <button id="backBtn" onClick={() => navigate(`/jobApplications/${applyData.Job.jobId}`)}><i className='fa-solid fa-backward'></i>  Trở lại</button>
                <button className="print-pdf" onClick={() => handlePrintPDF(applyData.fullName)}><i className='fa-solid fa-download'></i>   Tải file pdf</button>
            </div>
            <ToastContainer />
            <LoadingDiv isLoading={isLoading}></LoadingDiv>
        </div>
    )

}

export default ViewApplication;
