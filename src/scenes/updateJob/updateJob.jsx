import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createJob, getJob, updateJob } from '../../apis/job';
import JobForm from '../../containers/jobForm/jobForm';
import "../createJob/createNewJob.css";

const UpdateJobScene = ({ isLoggedInHr }) => {
    const navigate = useNavigate();
    const [isCreate, setIsCreate] = useState(false);
    const {jobId} = useParams();
    const [isHr, setIsHr] = useState(false);
    useEffect(() => {
        checkIsHrStatus();
    }, [isLoggedInHr, jobId]);

    useEffect(() => {
        checkIsHrStatus();
    }, []);
   

    const checkIsHrStatus = async () => {
            const hasLog = localStorage.getItem("isLoggedInHr")===true||localStorage.getItem("isLoggedInHr")==="true";
            if (!hasLog) {
                navigate('/');
            }
            else{
               setIsHr(hasLog)
            }
        
    };

    const handleSubmit = async (formData) => {
        try {
            const updatedJob = await updateJob(formData, jobId);
            console.log(formData);
            if (updatedJob) {
                toast.success('Cập nhật tin tuyển dụng thành công', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 800,
                });
            }
            else {
                toast.error("Cập nhật tin thất bại!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 800,
                });
            }
        } catch (error) {
            // Xử lý lỗi tạo job
            toast.error("Cập nhật tin thất bại!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 800,
            });
            console.error('Error creating job:', error);
        }
        
    };

    return (
        <div>
            <h1>Chỉnh sửa tin tuyển dụng</h1>
            <JobForm isLoggedInHr={isHr} isCreate={isCreate} onSubmitJob={handleSubmit} onUpdateJob={handleSubmit} ></JobForm>
            <ToastContainer />
        </div>
    )
}

export default UpdateJobScene;
