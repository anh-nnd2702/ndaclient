import React, { useState, useEffect } from "react";

const CertificateForm = ({ onSubmitCertificate, onCancel, currentCert }) => {
    const [certTitle, setCertTitle] = useState(currentCert.certTitle||"");
    const [organization, setOrganization] = useState(currentCert.organization||"");
    const [certDate, setCertDate] = useState(currentCert.certDate||"");
    const [expireDate, setExpireDate] = useState(currentCert.expireDate||"");
    const [certDescribe, setCertDescribe] = useState(currentCert.certDescribe||"");
    const [isNotEnd, setIsNotEnd] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        if (JSON.stringify(currentCert) === '{}') {
            setIsNotEnd(false);
        }
        else {
            setIsUpdate(true);
            setIsNotEnd(currentCert.certDate === currentCert.expireDate);
        }
    }, [currentCert])

    const handleSubmitCertificate = (e) => {
        e.preventDefault();
        const certificateInfo = {
            certTitle,
            organization,
            certDate,
            expireDate: isNotEnd ? (certDate) : (expireDate),
            certDescribe,
        };
        if (!isUpdate) {
            onSubmitCertificate(certificateInfo, -1);
            resetAllFields();
        }
        else {
            onSubmitCertificate(certificateInfo, currentCert.index)
        }
    };

    const resetAllFields = () => {
        setCertTitle("");
        setOrganization("");
        setCertDate("");
        setExpireDate("");
        setCertDescribe("");
    };

    const handleCancel = (e) => {
        e.preventDefault();
        onCancel();
    };

    return (
        <div className="pop-up-box">
            <h2>Chứng chỉ của bạn</h2>
            <form className="form-popup">
                <div className="popup-input-box">
                    <label htmlFor="certTitle">Tên chứng chỉ:</label>
                    <input
                        type="text"
                        id="certTitle"
                        value={certTitle}
                        onChange={(e) => setCertTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="popup-input-box">
                    <label htmlFor="organization">Tổ chức cấp:</label>
                    <input
                        type="text"
                        id="organization"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                    />
                </div>
                <div className="popup-input-box">
                    <label htmlFor="certDate">Ngày cấp:</label>
                    <input
                        type="date"
                        id="certDate"
                        value={certDate}
                        onChange={(e) => setCertDate(e.target.value)}
                        required
                    />
                </div>
                <div className="popup-input-box">
                    <label htmlFor="expireDate">Ngày hết hạn:</label>
                    <input
                        disabled={isNotEnd}
                        type="date"
                        id="expireDate"
                        value={expireDate}
                        onChange={(e) => setExpireDate(e.target.value)}
                    />
                </div>
                <div className="popup-check-box">
                    <label htmlFor="isNotExpire">Chứng chỉ không thời hạn:</label>
                    <input
                        type="checkbox"
                        id="isNotExpire"
                        checked={isNotEnd}
                        onChange={(e) => { setIsNotEnd(e.target.checked) }}
                    />
                </div>
                <div className="popup-input-box">
                    <label htmlFor="certDescribe">Mô tả:</label>
                    <textarea
                        id="certDescribe"
                        value={certDescribe}
                        onChange={(e) => setCertDescribe(e.target.value)}
                    ></textarea>
                </div>
                <button className="popup-add-btn" type="button" onClick={handleSubmitCertificate}>
                    Thêm
                </button>
                <button className="popup-cancel-btn" type="button" onClick={handleCancel}>
                    Hủy
                </button>
            </form>
        </div>
    );
};

export default CertificateForm;
