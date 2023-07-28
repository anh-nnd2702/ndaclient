export const validateEmail = (email) => {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  
    // Kiểm tra định dạng email
    return emailRegex.test(email);
  };