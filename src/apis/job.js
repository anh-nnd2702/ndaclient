import axios from 'axios';
import DOMAIN from '../config';
import Cookies from 'js-cookie';

export const getAllJobs = async (filterParams) =>{
    try{
        const result = await axios.get(`${DOMAIN}/job`, { params: filterParams });
        return result.data.jobs;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export const getJob = async (jobId, isAdmin) =>{
    try{
        const result = await axios.get(`${DOMAIN}/job/`+jobId, {params: {isAdmin}});
        const job = result.data.job
        return job;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export const getJobByCompany = async (companyId) => {
    try{
        const result = await axios.get(`${DOMAIN}/job/company/`+companyId);
        return result.data.job;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export const createJob = async (jobData) =>{
    try{
        const token = Cookies.get('token');
        //console.log("run to this")
        const result = await axios.post(`${DOMAIN}/job`, jobData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return result.data.job;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export const getAllCompanyJobs = async () =>{
    const token = Cookies.get('token');
    try{
        const result = await axios.get(`${DOMAIN}/company/jobs`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return result.data.jobs;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export const updateJob = async (formData, jobId) =>{
    const token = Cookies.get('token');
    try{
        const result = await axios.put(`${DOMAIN}/job/`+jobId, formData,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return result.data.job;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export const deleteJob = async (jobId) =>{
    const token = Cookies.get('token');
    try{
        const result = await axios.delete(`${DOMAIN}/job/`+jobId,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return result.data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export const updateJobStatus = async (jobId, formData) =>{
    const token = Cookies.get('token');
    try{
        const result = await axios.put(`${DOMAIN}/job/status/`+jobId, formData,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return result.data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}
