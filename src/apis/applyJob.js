import DOMAIN from "../config";
import axios from 'axios';
import Cookies from 'js-cookie';

export const getApplyByCandidate = async () => {
    try {
        const token = Cookies.get('token');
        const result = await axios.get(`${DOMAIN}/apply/candidate`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return result.data.appliedJobs;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const getApplyById = async (applyId) => {
    try {

        const result = await axios.get(`${DOMAIN}/apply/` + applyId);
        return result.data.appliedJob;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const getApplyByJob = async (jobId) => {
    try {
        const token = Cookies.get('token');
        const result = await axios.get(`${DOMAIN}/apply/job/`+jobId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return result.data.appliedJobs;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCandidateApplyByJob = async (jobId) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`${DOMAIN}/apply/candidate/job/` + jobId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        const { appliedJob } = response.data;
        return true;
      } else {
        return false;
      }
    } catch (error) {
        console.log(error);
      return false;
    }
  };
  

export const createApply = async (applyData) => {
    try {
        const token = Cookies.get('token');
        const result = await axios.post(`${DOMAIN}/apply`, {
            jobId: applyData.jobId,
            cvId: applyData.cvId,
            coverLetter: applyData.coverLetter
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        return result.data.appliedJob;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateApplyStatus = async (applyId, statusUpdate) => {
    try {
        const token = Cookies.get('token');
        if (statusUpdate <= 5 && statusUpdate >= 0) {
            const result = await axios.put(`${DOMAIN}/apply/` + applyId, {
                applyStatus: statusUpdate
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            return result.data.appliedJob;
        }
        else{
            return "Status invalid"
        }

    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
