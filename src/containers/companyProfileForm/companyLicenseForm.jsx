import React, { useEffect, useState } from "react";
import { updateCompanyLicense} from "../../apis/company";

const CompanyLicenseForm = ({company, onCompanyUpdate}) =>{
    const [selectedFile, setSelectedFile] = useState(null);
    const [companyLicense, setCompanyLicense] = useState(company.companyLicense || "");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setCompanyLicense(company.companyLicense);
    }, [company])

    const handleLicenseChange = (e) => {
        const file = e.target.files[0];
        // Kiểm tra xem tệp có phải là PDF hay không
        if (file && file.type === "application/pdf") {
          setSelectedFile(file);
        } else {
          setSelectedFile(null);
          // Hiển thị thông báo lỗi nếu tệp không phải là PDF
          alert("Vui lòng tải lên tệp PDF");
        }
    };

    const handleSubmitLicense = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('license', selectedFile);

            const response = await updateCompanyLicense(formData);

            // Xử lý phản hồi từ server
            const { message, updatedLicense } = response;
            if(updatedLicense){
                const isUpdated = true;
                onCompanyUpdate({isUpdated});
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <h1>Giấy phép kinh doanh của bạn</h1>
            <div>
                <form onSubmit={handleSubmitLicense} className="logo-form">
                        <input
                            type="file"
                            id="companyLogo"
                            accept=".pdf"
                            onChange={handleLicenseChange}
                        />
                        <div>
                            <button className="submit-btn" id="submitImg" type="submit" disabled={isSubmitting}>{isSubmitting ? <i className="fa fa-spinner fa-spin"></i> : "Lưu giấy phép"}</button>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default CompanyLicenseForm;