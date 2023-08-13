import React, { useEffect, useState } from "react";
import { getCity } from "../../apis/reference";
import { updateCompany, updateCompanyLogo, updateCompanyLicense } from "../../apis/company";
import { NavLink } from "react-router-dom";

const CompanyProfileForm = ({ company, onCompanyUpdate }) => {
    const [companyName, setCompanyName] = useState(company.companyName);
    const [companyPhone, setCompanyPhone] = useState(company.companyPhone || "");
    const [companyAddress, setCompanyAddress] = useState(company.companyAddress || "");
    const [companyIntro, setCompanyIntro] = useState(company.companyIntro || "");
    const [companyLogo, setCompanyLogo] = useState(company.companyLogo || "");
    const [cityId, setCityId] = useState(company.cityId || 0);
    const [companyLink, setCompanyLink] = useState(company.companyLink || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [cityList, setCityList] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);

    useEffect(() => {
        setCompanyName(company.companyName);
        setCompanyAddress(company.companyAddress);
        setCompanyIntro(company.companyIntro);
        setCompanyLink(company.companyLink);
        setCompanyLogo(company.companyLogo);
        setCityId(company.cityId);
        setCompanyPhone(company.companyPhone);
        fetchCity()
    }, [company])

    const fetchCity = async () => {
        const city = await getCity()
        setCityList(city)
    }

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Url = reader.result;
                setCompanyLogo(base64Url);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLicenseChange = (e) => {
        const file = e.target.files[0];
        // Kiểm tra xem tệp có phải là PDF hay không
        if (file && file.type === "application/pdf") {
            setSelectedPdf(file);
        } else {
            setSelectedPdf(null);
            // Hiển thị thông báo lỗi nếu tệp không phải là PDF
            alert("Vui lòng tải lên tệp PDF");
        }
    };

    const handleSubmitCompany = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)

        try {
            const companyUpdated = await updateCompany({
                companyName,
                companyAddress,
                companyIntro,
                companyPhone,
                companyLink,
                cityId
            });

            if (selectedPdf) {
                const formData = new FormData();
                formData.append('license', selectedPdf);

                const response = await updateCompanyLicense(formData);

                // Xử lý phản hồi từ server
                const { message, updatedLicense } = response;
                if (!updatedLicense) {
                    throw new Error("Tải lên giấy phép thất bại!")
                }
            }

            if (companyUpdated) {
                localStorage.setItem('companyName', companyName);
                const isUpdated = true;
                onCompanyUpdate({ isUpdated });
            }

        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsSubmitting(false);
        }
    }

    const handleSubmitLogo = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('logo', selectedFile);

            const response = await updateCompanyLogo(formData);

            // Xử lý phản hồi từ server
            const { message, updatedLogo } = response;

            localStorage.setItem('logo', updatedLogo)
            const isUpdated = true;
            onCompanyUpdate({ isUpdated });
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (

        <div className="form-box">
            <div>
                <form onSubmit={handleSubmitLogo} className="logo-form">
                    <label htmlFor="companyLogo">Ảnh/Logo công ty:</label>
                    <div className="avatar-profile-box">
                        {companyLogo ? (
                            <img src={companyLogo} alt="company Logo" />
                        ) : (
                            <img src="https://drive.google.com/uc?export=view&id=1WaXr3NCH6M8_xdwwwYiNNXpgvoMjlFTl" alt="Default Avatar" />
                        )}
                    </div>
                    <input
                        type="file"
                        id="companyLogo"
                        accept="image/*"
                        onChange={handleLogoChange}
                    />
                    <div>
                        <button className="submit-btn" id="submitImg" type="submit" disabled={isSubmitting}>{isSubmitting ? <i className="fa fa-spinner fa-spin"></i> : "Lưu thay đổi"}</button>
                    </div>
                </form>
            </div>
            <form className="form-profile" onSubmit={handleSubmitCompany}>
                <div className="email-box">
                    <p>Email: {company.email}</p>
                </div>
                <div className="input-box">
                    <label htmlFor="companyName">Tên công ty:</label>
                    <input
                        type="text"
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    <label htmlFor="companyPhone">Số điện thoại:</label>
                    <input
                        type="text"
                        id="companyPhone"
                        value={companyPhone}
                        onChange={(e) => setCompanyPhone(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <label htmlFor="cityId">Tỉnh/ Thành phố:</label>
                    <select id="cityId"
                        value={cityId}
                        onChange={(e) => setCityId(e.target.value)}>
                        {cityList.map((city) => (
                            <option key={city.cityId} value={city.cityId}>
                                {city.cityName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="input-box">
                    <label htmlFor="companyAddress">Địa chỉ:</label>
                    <input
                        type="text"
                        id="companyAddress"
                        value={companyAddress}
                        onChange={(e) => setCompanyAddress(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <label htmlFor="companyLink">Link trang chủ công ty:</label>
                    <input
                        type="text"
                        id="companyLink"
                        value={companyLink}
                        onChange={(e) => setCompanyLink(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <label htmlFor="companyIntro">Giới thiệu công ty:</label>
                    <textarea
                        className='intro-text-area'
                        rows={4}
                        type="text"
                        id="companyIntro"
                        value={companyIntro}
                        onChange={(e) => setCompanyIntro(e.target.value)}
                    ></textarea>
                </div>
                    <div className="input-box">
                        <label>Giấy phép kinh doanh</label>
                        {company.companyLicense? (
                        <NavLink to={company.companyLicense} target="_blank" rel="noopener noreferrer">Xem giấy phép kinh doanh</NavLink>):(
                            <span>Bạn chưa tải lên giấy phép</span>
                        )}
                    </div>
                    <div className="input-box">
                        <label>Tải lên giấy phép kinh doanh (PDF)</label>
                        <input
                            type="file"
                            id="companyLogo"
                            accept=".pdf"
                            onChange={handleLicenseChange}
                        />
                    </div>
                <button className="submit-btn" id="submitProfileBtn" type="submit" disabled={isSubmitting}>{isSubmitting ? <i className="fa fa-spinner fa-spin"></i> : "Lưu thông tin"}</button>
            </form>
        </div>

    )
}

export default CompanyProfileForm;