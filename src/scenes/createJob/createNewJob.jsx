import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createJob } from '../../apis/job';
import JobForm from '../../containers/jobForm/jobForm';
import "./createNewJob.css"

const CreateJobScene = ({ isLoggedInHr }) => {
    const navigate = useNavigate();
    const [isCreate, setIsCreate] = useState(true);
    const [isHr, setIsHr] = useState(false);
    const [jobData, setJobData] = useState({})
    useEffect(() => {
        checkIsHrStatus();
    }, [isLoggedInHr]);

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
            const crearedJob = await createJob(formData);
            if (crearedJob) {
                toast.success('Đăng tin tuyển dụng thành công', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 800,
                });
            }
            else {
                toast.error("Tạo tin thất bại!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 800,
                });
            }
        } catch (error) {
            // Xử lý lỗi tạo job
            toast.error("Tạo tin thất bại!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 800,
            });
            console.error('Error creating job:', error);
        }
    };

    return (
        <div className='job-create-body'>
            <h1>Tạo tin tuyển dụng mới</h1>
            <JobForm isLoggedInHr={isHr} isCreate={isCreate} onSubmitJob={handleSubmit} onUpdateJob={handleSubmit} jobData={jobData}></JobForm>
            <ToastContainer />
        </div>
    )
}

export default CreateJobScene;