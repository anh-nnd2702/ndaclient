import axios from 'axios';
import DOMAIN from '../config';

export const getReference = async () => {
    try{
        const result = await axios.get(`${DOMAIN}/reference`)
        return result.data;
    }       
    catch(error){
        console.error(error);
        throw error;
    }
}

export const getCity = async () => {
    try{
        const result = await axios.get(`${DOMAIN}/reference/city`)
        return result.data.city;
    }       
    catch(error){
        console.error(error);
        throw error;
    }
}

export const getEducationLevel = async () => {
    try{
        const result = await axios.get(`${DOMAIN}/reference/educationLevel`)
        return result.data.educationLevel;
    }       
    catch(error){
        console.error(error);
        throw error;
    }
}

export const getJobType = async () => {
    try{
        const result = await axios.get(`${DOMAIN}/reference/jobType`)
        return result.data.jobType;
    }       
    catch(error){
        console.error(error);
        throw error;
    }
}

export const getWorkField = async () => {
    try{
        const result = await axios.get(`${DOMAIN}/reference/workField`)
        return result.data.workField;
    }       
    catch(error){
        console.error(error);
        throw error;
    }
}

export const getWorkLevel = async () => {
    try{
        const result = await axios.get(`${DOMAIN}/reference/workLevel`)
        return result.data.workLevel;
    }       
    catch(error){
        console.error(error);
        throw error;
    }
}
