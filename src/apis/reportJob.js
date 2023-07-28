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

