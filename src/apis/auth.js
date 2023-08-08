import axios from 'axios';
import DOMAIN from '../config';
import Cookies from 'js-cookie';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${DOMAIN}/candidate/login`, {
      email,
      password
    });
    const { infor, token } = response.data;
    if (response.status === 200) {
      addAuthData(infor);
      Cookies.set('token', token, { expires: 7, secure: true });
    }
    else {
      throw new Error("cannot login")
    }
    return infor;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (fullName, email, password) => {
  try {
    const response = await axios.post(`${DOMAIN}/candidate/signUp`, {
      fullName,
      email,
      password
    });

    const { infor, token } = response.data;
    if (response.status === 200) {
      addAuthData(infor);
      Cookies.set('token', token, { expires: 7, secure: true });
    }
    else {
      throw new Error("cannot login")
    }
    addAuthData(infor);
    return infor;
  } catch (error) {
    throw error.response.data.error;
  }
}

export const signUpCompany = async (companyName, email, companyPass) => {
  try {
    const response = await axios.post(`${DOMAIN}/company/signupHr`, {
      companyName,
      email,
      companyPass
    });

    const { infor, token } = response.data;

    if (response.status === 200) {
      setAuthHrData(infor);
      Cookies.set('token', token, { expires: 7, secure: true });
    }

    return infor;
  } catch (error) {
    throw error.response.data.error;
  }

}

export const loginCompany = async (email, companyPass) => {
  try {
    const response = await axios.post(`${DOMAIN}/company/loginHr`, {
      email,
      companyPass
    });

    const { infor, token } = response.data;
    if (response.status === 200) {
      setAuthHrData(infor);
      Cookies.set('token', token, { expires: 7, secure: true });
    }
    return infor;
  }
  catch (error) {
    throw error;
  }
}

export const logoutHr = async () => {
  try {
    const result = await axios.post(`${DOMAIN}/company/logout`);
    if (result.status === 200) {
      clearAuthHrData();
      return true;
    }
  }
  catch (error) {
    throw error;
  }
}

export const logout = async () => {
  try {
    const result = await axios.post(`${DOMAIN}/candidate/logout`);
    if (result.status === 200) {
      clearAuthData();
      return true;
    }
  }
  catch (error) {
    throw error;
  }
}

export const loginAdmin = async (email, adminPass) => {
  try {
    const response = await axios.post(`${DOMAIN}/admin/login`, {
      email,
      adminPass
    });

    const { infor, token } = response.data;
    if (response.status === 200) {
      setAdminData();
      Cookies.set('token', token, { expires: 7, secure: true });
    }
    return infor.isAdmin;
  }
  catch (error) {
    throw error;
  }
}

export const logoutAdmin = async () => {
  try {
    const result = await axios.post(`${DOMAIN}/admin/logout`);
    if (result.status === 200) {
      clearAdminData();
      return true;
    }
  }
  catch (error) {
    throw error;
  }
}

export const hrChangePasswordRequest = async (email) => {
  try {
    const result = await axios.post(`${DOMAIN}/company/changePass`, {
      email
    });
    if (result.status === 200) {
      return true;
    }
  }
  catch (error) {
    throw error;
  }
}

export const candidateChangePasswordRequest = async (email) => {
  try {
    const result = await axios.post(`${DOMAIN}/candidate/changePass`, {
      email
    });
    if (result.status === 200) {
      return true;
    }
    else {
      return false;
    }
  }
  catch (error) {
    throw error;
  }
}

export const candidateUpdatePassword = async (token, newPassword) => {
  try {
    const result = await axios.put(`${DOMAIN}/candidate/password`, {newPassword}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    );
    console.log(token);
    return result;
  }
  catch (error) {
    throw error;
  }
}

export const hrUpdatePassword = async (email, newPass) => {
  try {
    const result = await axios.put(`${DOMAIN}/company/password`, {
      email,
      newPass
    });
    if (result.status === 200) {
      return true;
    }
  }
  catch (error) {
    throw error;
  }
}

export const addAuthData = (infor) => {
  localStorage.setItem('avatar', infor.avatar)
  localStorage.setItem('fullName', infor.fullName);
  localStorage.setItem('isLoggedIn', true);
  localStorage.setItem('candidateId', infor.candidateId);
}

export const clearAuthData = () => {
  Cookies.remove('token');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('fullName');
  localStorage.removeItem('avatar');
  localStorage.removeItem('candidateId');
};

export const setAuthHrData = (infor) => {
  localStorage.setItem('companyName', infor.companyName);
  localStorage.setItem('isLoggedInHr', true);
  localStorage.setItem('logo', infor.logo);
  localStorage.setItem('companyId', infor.Id)
}

export const clearAuthHrData = () => {
  Cookies.remove('token');
  localStorage.removeItem('companyName');
  localStorage.removeItem('isLoggedInHr');
  localStorage.removeItem('logo');
  localStorage.removeItem('companyId');
}

export const setAdminData = () => {
  localStorage.setItem('isAdmin', true);
}

export const clearAdminData = () => {
  Cookies.remove('token');
  localStorage.removeItem('isAdmin');
}
