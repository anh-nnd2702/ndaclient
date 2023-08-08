import DOMAIN from "../config";
import axios from 'axios';
import Cookies from 'js-cookie';

export const createCandidateCv = async (cvData) => {
    try {
        const token = Cookies.get('token');

        const result = await axios.post(`${DOMAIN}/cv`, cvData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return result.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const createCandidateCvWithImg = async (cvData) => {
    const token = Cookies.get('token');
    try {
        const response = await axios.post(`${DOMAIN}/cv/cvWithImg`, cvData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (error) {
        throw new Error('Error updating cv image: ' + error.message);
    }
}

export const updateMainCv = async (cvId) => {
    try {
        const token = Cookies.get('token');
        const cvData = { cvId }
        const result = await axios.put(`${DOMAIN}/cv/mainCv/` + cvId, cvData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        return result.data.message;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateCv = async (cvData, cvId) => {
    try {
        const token = Cookies.get('token');
        const result = await axios.put(`${DOMAIN}/cv/` + cvId, cvData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (result.status === 200) {
            return result.data;
        }
        else {
            throw new Error("cannot update cv:", result.status)
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateCvWithImg = async (cvData, cvId) => {
    try {
      const token = Cookies.get('token');
      
      const result = await axios.put(`${DOMAIN}/cv/cvWithImg/` + cvId, cvData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error('Cannot update cv:', result.status);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const deleteCvById = async (cvId) =>{
    try {
        const token = Cookies.get('token');
        
        const result = await axios.delete(`${DOMAIN}/cv/` + cvId, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (result.status === 200) {
          return result.data;
        } else {
          throw new Error('Cannot update cv:', result.status);
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
}

export const getAllCv = async () =>{
  try {
    const token = Cookies.get('token');
    
    const result = await axios.get(`${DOMAIN}/cv/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    if (result.status === 200) {
      return result.data.cvList;
    } else {
      throw new Error('Cannot get cv:', result.status);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
