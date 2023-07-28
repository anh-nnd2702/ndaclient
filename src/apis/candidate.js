import DOMAIN from "../config";
import axios from 'axios';
import Cookies from 'js-cookie';

export const getCandidateCv = async () => {
    try {
        const token = Cookies.get('token');
        const result = await axios.get(`${DOMAIN}/candidate/cv`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return result.data.candidateCv;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCandidate = async () => {
    try {
        const token = Cookies.get('token');
        const result = await axios.get(`${DOMAIN}/candidate`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return result.data.candidate;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCandidateCvById = async (cvId) => {
    try {
        const token = Cookies.get('token');
        const result = await axios.get(`${DOMAIN}/cv/` + cvId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return result.data.cvData;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateCandidate = async (candidateData) => {
    try {
        const token = Cookies.get('token');

        const result = await axios.put(`${DOMAIN}/candidate`, candidateData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        
        return result.data.candidate;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
