import DOMAIN from "../config";
import axios from 'axios';
import Cookies from 'js-cookie';

export const createReport = async (reportText, jobId) => {
    try {
        const token = Cookies.get('token');
        const result = await axios.post(`${DOMAIN}/report/`+jobId, {
            reportDescribe: reportText
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        return result.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAllReport = async ()=>{
    try {
        const token = Cookies.get('token');
        const result = await axios.get(`${DOMAIN}/report/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        return result.data.reportJobs;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteReport = async (reportId) =>{
    try {
        const token = Cookies.get('token');
        const result = await axios.delete(`${DOMAIN}/report/`+reportId,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        return result.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateReportStatus = async (reportId, newStatus) =>{
    try {
        const token = Cookies.get('token');
        const result = await axios.put(`${DOMAIN}/report/`+reportId, {newStatus},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        return result.data.reportJob;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateReportByJobId = async (jobId, newStatus) =>{
    try {
        const token = Cookies.get('token');
        const result = await axios.put(`${DOMAIN}/report/job/`+jobId,{newStatus},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        return result.data.reportJob;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

