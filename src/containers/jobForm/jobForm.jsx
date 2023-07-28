import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { getReference } from "../../apis/reference.js";
import { getCompanyInfo } from '../../apis/company';
import { createJob, getJob, updateJob } from '../../apis/job';

const JobForm = ({ isLoggedInHr, isCreate, onSubmitJob, onUpdateJob }) => {
    const [cityList, setCityList] = useState([]);
    const [workLevelList, setWorkLevelList] = useState([]);
    const [workFieldList, setWorkFieldList] = useState([]);
    const [jobTypeList, setJobTypeList] = useState([]);
    const [eduLevelList, setEduLevelList] = useState([]);
    const [isNego, setIsNego] = useState(false);
    const { jobId } = useParams();
    const [jobData, setJobData] = useState({});
    const [unLimit, setUnLimit] = useState(false);
    const [formData, setFormData] = useState({
        jobTitle: '',
        workAddress: '',
        modifiedTime: '',
        cityId: 0,
        jobDescribe: '',
        jobRequire: '',
        jobBenefit: '',
        eduLevelId: 0,
        jobTypeId: 0,
        expireDate: '',
        genderRequire: 0,
        workLevelId: 0,
        minWage: 0,
        maxWage: 0,
        experience: 0,
        hireCount: 0,
        workFieldId: 0,
    });

    const fetchJobData = async () => {
        try {
            const job = await getJob(jobId);
            if (job) {
                setJobData(job);
                setFormData({
                    jobId: job.jobId,
                    jobTitle: job.jobTitle,
                    workAddress: job.workAddress,
                    modifiedTime: job.modifiedTime,
                    cityId: job.cityId,
                    jobDescribe: job.jobDescribe,
                    jobRequire: job.jobRequire,
                    jobBenefit: job.jobBenefit,
                    eduLevelId: job.eduLevelId,
                    jobTypeId: job.jobTypeId,
                    expireDate: job.expireDate,
                    genderRequire: job.genderRequire,
                    workLevelId: job.workLevelId,
                    minWage: job.minWage,
                    maxWage: job.maxWage,
                    experience: job.experience,
                    hireCount: job.hireCount,
                    workFieldId: job.workFieldId,
                })
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const fetchReference = async () => {
        try {
            const reference = await getReference();
            setCityList(reference.city);
            setWorkFieldList(reference.workField);
            setWorkLevelList(reference.workLevel);
            setJobTypeList(reference.jobType);
            setEduLevelList(reference.educationLevel);
        } catch (error) {
            console.error('There was an error fetching reference data:', error);
        }
    }

    const fetchCompanyInfo = async () => {
        try {
            const company = await getCompanyInfo();
            setFormData({
                ...formData,
                workAddress: company.companyAddress
            })
        }
        catch (error) {
            console.error('There was an error fetching company data:', error);
        }
    }

    const fetchData = async () => {
        await Promise.all([fetchReference(), fetchCompanyInfo()]);
        if (!isCreate) {
            await fetchJobData();
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const currentDate = new Date().toISOString().split('T')[0];
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            if (isNego) {
                setFormData({
                    ...formData,
                    maxWage: 0,
                    minWage: 0,
                })
            }
            if (unLimit) {
                setFormData({
                    ...formData,
                    hireCount: 0,
                })
            }
            if (isCreate) {
                await onSubmitJob(formData)
            }
            else {
                await onUpdateJob(formData)
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <form className='job-form' onSubmit={handleSubmitForm}>
            <div className='job-form-box'>
                <div className='job-form-left'>
                    <div className='job-input-box'>
                        <label htmlFor="jobTitle">Tiêu đề tin: <span className='not-null-span'>(*)</span></label>
                        <input
                            type="text"
                            id="jobTitle"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='job-input-box'>
                        <label htmlFor="city">Tỉnh/ Thành phố:</label>
                        <select id="city"
                            name='cityId'
                            value={formData.cityId}
                            onChange={handleChange}>
                            {cityList.map((city) => (
                                <option key={city.cityId} value={city.cityId}>
                                    {city.cityName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='job-input-box'>
                        <label htmlFor="workAdress">Địa điểm làm việc: <span className='not-null-span'>(*)</span></label>
                        <input
                            type="text"
                            id="workAddress"
                            name="workAddress"
                            value={formData.workAddress}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='job-input-box'>
                        <label htmlFor="jobDescribe">Mô tả công việc: <span className='not-null-span'>(*)</span></label>
                        <textarea className='input-text-area'
                            rows={5}
                            type="text"
                            id="jobDescribe"
                            name="jobDescribe"
                            value={formData.jobDescribe}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='job-input-box'>
                        <label htmlFor="jobDescribe">Yêu cầu ứng viên: <span className='not-null-span'>(*)</span></label>
                        <textarea className='input-text-area'
                            rows={4}
                            type="text"
                            id="jobRequire"
                            name="jobRequire"
                            value={formData.jobRequire}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='job-input-box'>
                        <label htmlFor="jobBenefit">Quyền lợi: <span className='not-null-span'>(*)</span></label>
                        <textarea className='input-text-area'
                            rows={4}
                            type="text"
                            id="jobBenefit"
                            name="jobBenefit"
                            value={formData.jobBenefit}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                </div>

                <div className='job-form-right'>
                    <div className="job-input-box">
                        <label htmlFor="eduLevel">Yêu cầu học vấn: </label>
                        <select id="eduLevel"
                            name='eduLevelId'
                            value={formData.eduLevelId}
                            onChange={handleChange}>
                            {eduLevelList.map((edu) => (
                                <option key={edu.eduLevelId} value={edu.eduLevelId}>
                                    {edu.eduLevelName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='job-input-box'>
                        <label htmlFor="workLevel">Cấp bậc: </label>
                        <select id="workLevel"
                            name='workLevelId'
                            value={formData.workLevelId}
                            onChange={handleChange}>
                            {workLevelList.map((wL) => (
                                <option key={wL.workLevelId} value={wL.workLevelId}>
                                    {wL.workLevelName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='job-input-box'>
                        <label htmlFor="workField">Lĩnh vực/Chuyên môn:</label>
                        <select id="workField"
                            name='workFieldId'
                            value={formData.workFieldId}
                            onChange={handleChange}>
                            {workFieldList.map((wF) => (
                                <option key={wF.workFieldId} value={wF.workFieldId}>
                                    {wF.workFieldName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='input-number'>
                        <label htmlFor="experience">Yêu cầu kinh nghiệm (năm): <span className='not-null-span'>(*)</span></label>
                        <input
                            type="number"
                            max={99}
                            min={0}
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='job-input-box'>
                        <label htmlFor="jobType">Hình thức làm việc:</label>
                        <select id="jobType"
                            name='jobTypeId'
                            value={formData.jobTypeId}
                            onChange={handleChange}>
                            {jobTypeList.map((jt) => (
                                <option key={jt.jobTypeId} value={jt.jobTypeId}>
                                    {jt.jobTypeName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='job-input-box'>
                        <label htmlFor="genderRequire">Yêu cầu giới tính:</label>
                        <select id="genderRequire"
                            name='genderRequire'
                            value={formData.genderRequire}
                            onChange={handleChange}>
                            <option value={0}>
                                Tất cả
                            </option>
                            <option value={1}>
                                Nữ
                            </option>
                            <option value={2}>
                                Nam
                            </option>
                        </select>
                    </div>
                    <div className='job-input-box'>
                        <label htmlFor="wage">Mức lương (Triệu đồng): <span className='not-null-span'>(*)</span></label>
                        <div className='input-number'>
                            <label htmlFor="minWage">Từ:</label>
                            <input
                                disabled={isNego}
                                type="number"
                                max={99}
                                min={0}
                                id="minWage"
                                name="minWage"
                                value={formData.minWage}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="maxWage">Đến:</label>
                            <input
                                disabled={isNego}
                                type="number"
                                max={99}
                                min={0}
                                id="maxWage"
                                name="maxWage"
                                value={formData.maxWage}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='job-check-box'>
                        <label htmlFor="isNego">Hoặc lương thỏa thuận:</label>
                        <input
                            type="checkbox"
                            id="isNego"
                            checked={isNego}
                            onChange={(e) => { setIsNego(e.target.checked) }}
                        />
                    </div>
                    <div className='input-number'>
                        <label htmlFor="hireCount">Số lượng tuyển:</label>
                        <input
                            disabled={unLimit}
                            type="number"
                            max={999}
                            min={1}
                            id="hireCount"
                            name="hireCount"
                            value={formData.hireCount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='job-check-box'>
                        <label htmlFor="unLimit">Không giới hạn số lượng:</label>
                        <input
                            type="checkbox"
                            id="unLimit"
                            checked={unLimit}
                            onChange={(e) => { setUnLimit(e.target.checked) }}
                        />
                    </div>
                    <div className='job-input-box'>
                        <label htmlFor="expireDate">Ngày hết hạn: <span className='not-null-span'>(*)</span></label>
                        <input
                            min={currentDate}
                            type="date"
                            name='expireDate'
                            id="expireDate"
                            value={formData.expireDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>
            <button type='submit' id='submitJobBtn'>Đăng tin</button>
        </form>
    )
}

export default JobForm;