import axios from 'axios';
import DOMAIN from '../config';
import Cookies from 'js-cookie';

export const getCompanyInfo = async (companyId) => {
    try {
        const result = await axios.get(`${DOMAIN}/company/infor`+companyId);
        return result.data.company;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateCompanyLogo = async (fileData) => {
    try {
        const token = Cookies.get('token');

        const result = await axios.post(`${DOMAIN}/company/companyLogo`, fileData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return result.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateCompany = async (companyData) => {
    try {
        const token = Cookies.get('token');

        const result = await axios.put(`${DOMAIN}/company`, companyData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return result.data.company;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllCompany = async (keyword) => {
    try {
        const filterParams = {keyword}
        const result = await axios.get(`${DOMAIN}/company`, {params: filterParams});
        return result.data.companyList;
    }
    catch (error) {
        throw error;
    }
}



