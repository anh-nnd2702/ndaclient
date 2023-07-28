export const checkLogin = ()=>{
    const hasLog = localStorage.getItem("isLoggedIn") === 'true' || localStorage.getItem("isLoggedIn") === true;
    return hasLog;
}

export const checkHrLogin =()=>{
    const hasLog = localStorage.getItem("isLoggedInHr") === 'true' || localStorage.getItem("isLoggedInHr") === true;
    return hasLog;
}