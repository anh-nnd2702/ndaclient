import React, { useEffect, useState } from "react";
import { updateCandidate } from "../../apis/candidate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./SettingForm.css"

const SettingForm = ({ candidate, cityList, workFieldList, workLevelList, jobTypeList }) => {
    const [isSeeking, setIsSeeking] = useState(false);
    const [isAcceptEmail, setIsAcceptEmail] = useState();
    const [minWage, setMinWage] = useState(0);
    const [workFieldId, setWorkField] = useState(0);
    const [workLevelId, setWorkLevel] = useState(0);
    const [experience, setExperience] = useState(0);
    const [jobTypeId, setJobTypeId] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cityId, setCityId] = useState(0)
    const isUndefined = (val) =>{
        return (typeof(val) === "undefined" || val ==="null" || val === null);
    }
    useEffect(() => {
        setIsSeeking(candidate.isSeeking);
        setIsAcceptEmail(candidate.isAcceptEmail);
        setMinWage(isUndefined(candidate.minWage)?0:candidate.minWage);
        setWorkField(isUndefined(candidate.workFieldId)?0:candidate.workFieldId);
        setWorkLevel(isUndefined(candidate.workLevelId)?0:candidate.workLevelId)
        setExperience(isUndefined(candidate.experience)?0:candidate.experience);
        setJobTypeId(isUndefined(candidate.jobTypeId)?0:candidate.jobTypeId)
        setCityId(isUndefined(candidate.cityId)?0:candidate.cityId)
    }, [candidate]);
    useEffect(() => {
    }, []);

    const handleSubmitSetting = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const fullName = localStorage.getItem("fullName");
            await updateCandidate({
                fullName,
                cityId,
                isSeeking,
                isAcceptEmail,
                minWage,
                workFieldId,
                workLevelId,
                experience,
                jobTypeId
            });
            toast.success("Cập nhật cài đặt thành công!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 800,
            });
        } catch (error) {
            console.error(error);
            toast.error("Cập nhật thông tin thất bại!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 800,
            });
        }
        finally {
            setIsSubmitting(false);
        }

    }

    return (
        <div className="form-container">
            <h1>Cài đặt tìm việc</h1>
            <h3>Hãy cài đặt các yêu cầu về công việc bạn muốn được gợi ý</h3>
            <form className="form-setting" onSubmit={handleSubmitSetting}>
                <div className="input-div">
                    <div className="checkbox-container">
                        <label htmlFor="isSeeking">Trạng thái tìm việc:</label>
                        <input
                            className="check-input"
                            type="checkbox"
                            id="isSeeking"
                            checked={isSeeking}
                            onChange={(e) => setIsSeeking(e.target.checked)}
                        />
                        {isSeeking ?
                            (<p className="checked-p">Đang bật</p>)
                            : (<p className="unchecked-p">Đã tắt</p>)}
                    </div>
                </div>
                <div className="input-div">
                    <div className="checkbox-container">
                        <label htmlFor="isAcceptEmail">Nhận email thông báo:</label>
                        <input
                            className="check-input"
                            type="checkbox"
                            id="isAcceptEmail"
                            checked={isAcceptEmail}
                            onChange={(e) => setIsAcceptEmail(e.target.checked)}
                        />
                        {isAcceptEmail ?
                            (<p className="checked-p">Đang bật</p>)
                            : (<p className="unchecked-p">Đã tắt</p>)}
                    </div>
                </div>
                <div className="input-div">
                        <label htmlFor="city">Thành phố:</label>
                        <select id="city" 
                        value={cityId} 
                        onChange={(e) => setCityId(e.target.value)}>
                            {cityList.map((city) => (
                                <option key={city.cityId} value={city.cityId}>
                                    {city.cityName}
                                </option>
                            ))}
                        </select>

                    </div>
                <div className="input-div">
                    <label htmlFor="minWage">Mức lương tối thiểu (triệu đồng):</label>
                    <input
                        min={0}
                        max={99}
                        type="number"
                        id="minWage"
                        value={minWage}
                        onChange={(e) => setMinWage(e.target.value)}
                    />
                </div>
                <div className="input-div">
                    <label htmlFor="workFieldId">Lĩnh vực - chuyên môn:</label>
                    <select
                        id="workFieldId"
                        value={parseInt(workFieldId)}
                        onChange={(e) => setWorkField(parseInt(e.target.value))}
                    >
                        {workFieldList.map((field) => (
                            <option key={field.workFieldId} value={field.workFieldId}>
                                {field.workFieldName}
                            </option>
                        ))}

                    </select>
                </div>
                <div className="input-div">
                    <label htmlFor="experience">Số năm kinh nghiệm:</label>
                    <input
                        min={0}
                        max={99}
                        type="number"
                        id="experience"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                    />
                </div>
                <div className="input-div">
                    <label htmlFor="workLevelId">Cấp bậc:</label>
                    <select
                        id="workLevelId"
                        value={workLevelId}
                        onChange={(e) => setWorkLevel(e.target.value)}
                    >
                        {workLevelList.map((level) => (
                            <option key={level.workLevelId} value={level.workLevelId}>
                                {level.workLevelName}
                            </option>
                        ))}

                    </select>
                </div>
                <div className="input-div">
                    <label htmlFor="jobTypeId">Hình thức công việc:</label>
                    <select
                        id="jobTypeId"
                        value={jobTypeId}
                        onChange={(e) => setJobTypeId(e.target.value)}
                    >
                        {jobTypeList.map((jobType) => (
                            <option key={jobType.jobTypeId} value={jobType.jobTypeId}>
                                {jobType.jobTypeName}
                            </option>
                        ))}
                    </select>
                </div>
                <button id="btnSubmitSetting" type="submit" disabled={isSubmitting}>Lưu cài đặt</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default SettingForm;