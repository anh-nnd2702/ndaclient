import React, { useEffect, useState } from "react";
import { updateCandidate } from "../../apis/candidate";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";
import { getCity } from "../../apis/reference";
import { updateCompany, updateCompanyLogo } from "../../apis/company";

const CompanyProfileForm = ({company, onCompanyUpdate}) => {
    const [companyName, setCompanyName] = useState(company.companyName);
    const [companyPhone, setCompanyPhone] = useState(company.companyPhone || "");
    const [companyAddress, setCompanyAddress] = useState(company.companyAddress || "");
    const [companyIntro, setCompanyIntro] = useState(company.companyIntro || "");
    const [companyLogo, setCompanyLogo] = useState(company.companyLogo || "");
    const [cityId, setCityId] = useState(company.cityId || 0);
    const [companyLink, setCompanyLink] = useState(company.companyLink || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [cityList, setCityList] = useState([])

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

    useEffect(() => {
        setCompanyName(company.companyName);
        setCompanyAddress(company.companyAddress);
        setCompanyIntro(company.companyIntro);
        setCompanyLink(company.companyLink);
        setCompanyLogo(company.companyLogo);
        setCityId(company.cityId);
        setCompanyPhone(company.companyPhone);
        fetchCity()
    }, [])

    const fetchCity = async () =>{
        const city = await getCity()
        setCityList(city)
    }

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        const reader = new FileReader();

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Url = reader.result;
                setCompanyLogo(base64Url);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmitCompany = async (e) =>{
        e.preventDefault();
        setIsSubmitting(true)

        try{
            const companyUpdated = await updateCompany({
                companyName,
                companyAddress,
                companyIntro,
                companyPhone,
                companyLink,
                cityId
            });
            if(companyUpdated){
                localStorage.setItem('companyName', companyName);
                const isUpdated = true;
                onCompanyUpdate({isUpdated});
            }
            
        }
        catch(error){
            console.log(error);
        }
        finally{
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
                        onChange={(e)=>setCompanyAddress(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <label htmlFor="companyLink">Link trang chủ công ty:</label>
                    <input
                        type="text"
                        id="companyLink"
                        value={companyLink}
                        onChange={(e)=>setCompanyLink(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <label htmlFor="companyIntro">Giới thiệu công ty:</label>
                    <textarea
                        rows={3}
                        type="text"
                        id="companyIntro"
                        value={companyIntro}
                        onChange={(e)=>setCompanyIntro(e.target.value)}
                    ></textarea>
                </div>
                <button className="submit-btn" id="submitProfileBtn" type="submit" disabled={isSubmitting}>{isSubmitting ? <i className="fa fa-spinner fa-spin"></i> : "Lưu thông tin"}</button>
            </form>
        </div>

    )
}

export default CompanyProfileForm;