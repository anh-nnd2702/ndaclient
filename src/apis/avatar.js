import DOMAIN from "../config";
import axios from 'axios';
import Cookies from 'js-cookie';

export const updateAvatar = async (formData) => {
    const token = Cookies.get('token');
    try {
        const response = await axios.post(`${DOMAIN}/candidate/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        // Xử lý lỗi nếu có
        throw new Error('Error updating avatar: ' + error.message);
    }
}

export const getAvatar = async () => {
    const token = Cookies.get('token');
    try {
        const response = await axios.get(`${DOMAIN}/candidate/avatar`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.avatarUrl;
    } catch (error) {
        throw new Error('Error retrieving avatar: ' + error.message);
    }
};
