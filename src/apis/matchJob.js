import DOMAIN from "../config";
import axios from 'axios';
import Cookies from 'js-cookie';

export const getMatchJob = async () =>{
    try {
        const token = Cookies.get('token');
        
        const result = await axios.get(`${DOMAIN}/matchJob/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        if (result.status === 200) {
          return result.data.matchJobs;
        } else {
          throw new Error('Cannot get match jobs:', result.status);
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
}