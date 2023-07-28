export const validatePassword = (password) => {
    if (password === "") {
        return false;
    }
    else {
        const passwordRegrex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegrex.test(password);
    }
};
