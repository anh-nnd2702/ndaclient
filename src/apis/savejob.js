import DOMAIN from "../config";
import axios from 'axios';
import Cookies from 'js-cookie';

export const getSavedJobByCandidate = async () => {
    try {
        const token = Cookies.get('token');
        const result = await axios.get(`${DOMAIN}/candidate/savedJob`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return result.data.savedJobs;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const getSavedJobByJobId = async (jobId) => {
    let checkSaved = false;
    let savedData = {};
    const output = { checkSaved, savedData }
    try {
        const token = Cookies.get('token');
        const result = await axios.get(`${DOMAIN}/candidate/saved/job/` + jobId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (result.status === 200) {
            output.checkSaved = true;
            output.savedData = result.data.savedJob;
            return output;
        }
        else {
            output.checkSaved = false;
            output.savedData = {};
            return output;
        }
    }
    catch (error) {
        output.checkSaved = false;
        output.savedData = {};
        return output;
    }
}

export const createSaveJob = async (jobId) => {
    try {
        const token = Cookies.get('token');
        const result = await axios.post(`${DOMAIN}/candidate/saveJob`, {
            jobId: jobId
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        return result.data.savedJob;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const unSaveJob = async (savedJobId) => {
    try {
        const token = Cookies.get('token');
        const result = await axios.delete(`${DOMAIN}/candidate/savedJob/` + savedJobId,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        if (result.status === 200) {
            return true;
        }
        else return false;

    }
    catch (error) {
        console.error(error);
        return false;
    }
}
