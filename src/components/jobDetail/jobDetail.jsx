import React, { useEffect, useState } from "react";
import "./jobDetail.css";
import "../jobByCompany/jobByCompany";
import { getCandidateCv } from "../../apis/candidate.js";
import { NavLink, useNavigate } from "react-router-dom";
const JobDetail = ({ job, WorkField, WorkLevel, JobType, City,
    company, isLoggedIn, isApplied, onApply, onSaveJob, onUnsaveJob, isSaved, onReport, isAdmin,
    onBlockJob, onPassReports }) => {
    let wage = "";
    let gender = "";
    const navigate = useNavigate();
    const [isFormApply, setIsFormApply] = useState(false);
    const [cvList, setCvList] = useState([]);
    const [cvId, setCvId] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [isReport, setIsReport] = useState(false);
    const [reportText, setReportText] = useState("");
    const handleSaveJob = async () => {
        if (!isSaved) {
            await onSaveJob()
        }
    }
    const handleUnSaveJob = async () => {
        if (isSaved) {
            await onUnsaveJob();
        }
    }

    const fetchCvList = async () => {
        if (isLoggedIn) {
            const cvList = await getCandidateCv();
            if (cvList.length > 0) {
                setCvList(cvList);
                setCvId(cvList[0].cvId)
            }
        }
    }
    useEffect(() => {
        fetchCvList()
    }, [])

    useEffect(() => {
        fetchCvList()
    }, [isLoggedIn])

    const handleShowApplyForm = () => {
        setIsFormApply(!isFormApply);
    }
    const handleShowReportForm = () => {
        setIsReport(!isReport);
    }

    const handleSubmitReport = async () => {
        try {
            const reported = await onReport(reportText);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsReport(false);
            setReportText("");
        }
    }

    if (job.genderRequire === null || job.genderRequire === 'null' || job.genderRequire === 0) {
        gender = 'Không yêu cầu';
    }
    else if (job.genderRequire == 1) {
        gender = 'Nữ';
    }
    else gender = 'Nam';

    if (job.minWage > 0 && job.maxWage > 0) {
        if (job.minWage === job.maxWage) {
            wage = `${job.minWage} triệu`;
        }
        else {
            wage = `Từ ${job.minWage} đến ${job.maxWage} triệu`;
        }
    }
    else if (job.minWage > 0) {
        wage = `Từ ${job.minWage} triệu`;
    }
    else if (job.maxWage > 0) {
        wage = `Đến ${job.maxWage} triệu`
    }
    else {
        wage = `Thỏa thuận`;
    }

    function formatModifiedTime(modifiedDate) {
        const date = new Date(modifiedDate);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const formattedDate = `Ngày: ${day}/${month}/${year} lúc ${hours}:${minutes}`;
        return formattedDate;
    }

    const handleBlockJob = async (jobId) => {
        try {
            await onBlockJob(jobId)
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleSubmitApply = async (e) => {
        e.preventDefault();
        try {
            const appliedJob = await onApply(cvId, coverLetter);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsFormApply();
            setCoverLetter("");
            setCvId("");
        }
    }

    const handleLogintoApply = () => {
        if (!isLoggedIn) {
            navigate('/login')
        }
    }

    const handlePassAllReports = (jobId) => {
        try {
            const result = onPassReports(jobId);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="job-body">
            <div className="job-detail-header">
                <div className="company-logo">
                    {company && company.companyLogo ? (
                        <img src={company.companyLogo} alt="Logo" />
                    ) : (
                        <img src={"https://drive.google.com/uc?export=view&id=1WaXr3NCH6M8_xdwwwYiNNXpgvoMjlFTl"} alt="Default Logo" />
                    )}
                </div>
                <div className="detail-title-box">
                    <h1 className="job-box-title">
                        {job.jobTitle}
                    </h1>
                    <h2 className="company-name">{company.companyName}</h2>
                    <p><i className="fa-regular fa-clock" /> Hạn cuối: {job.expireDate}</p>
                </div>
                {isLoggedIn ? (
                    <div className="job-header_action">
                        {!isApplied ? (<button type="button" id="btnApply" onClick={handleShowApplyForm}><i className="fa-regular fa-paper-plane"></i> Ứng tuyển</button>
                        ) : (
                            <p className="applied-p">Đã ứng tuyển</p>
                        )}
                        {!isSaved ?
                            (<button type="button" id="btnSave" onClick={handleSaveJob}><i className="fa-regular fa-heart"></i> Lưu tin</button>
                            ) : (
                                <div>
                                    <p className="saved-p">Đã lưu</p>
                                    <button type="button" id="btnUnSave" onClick={handleUnSaveJob}><i className="fa-regular fa-heart"></i> Bỏ lưu</button>
                                </div>
                            )

                        }
                    </div>
                ) : ((!isAdmin) &&
                    <div className="job-header_action">
                        <button className="btn-login" type="button" onClick={handleLogintoApply}>Đăng nhập</button>
                    </div>
                )}

            </div>
            {isAdmin && (
                <div className="admin-action-box">
                    {(job.ReportJobs && job.ReportJobs.length > 0) ? (
                        <div>
                            <h3>Tin tuyển dụng này có: {job.ReportJobs.length} lượt báo cáo</h3>
                            <h4>Nội dung báo cáo:</h4>
                            {job.ReportJobs.map((rp) => (
                                <div key={rp.reportId}>
                                    <span>{formatModifiedTime(rp.reportTime)}</span>
                                    <p>{rp.reportDescribe}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h3>Chưa có báo cáo nào về tin tuyển dụng này!</h3>
                    )}
                    {!(job.isActive)&& <h3>Bạn đã ẩn tin này!</h3>}
                    {(job.ReportJobs && job.ReportJobs.length > 0 && job.isActive) && (
                        <div>
                            <button type="button" onClick={() => handleBlockJob(job.jobId)}><i className="fa-solid fa-eye-slash"></i>   Ẩn tin này</button>
                            <button type="button" onClick={() => handlePassAllReports(job.jobId)}>Bỏ qua báo cáo</button>
                        </div>
                    )}
                </div>
            )}
            <div className="section-choices">
                <div><a href="#Jobdetail">Chi tiết tin</a></div>
                <div><a href="#CompanyDetail">Thông tin công ty</a></div>
                <div><a href="#JobByCompany">Việc làm cùng công ty</a></div>
            </div>
            <div className="job-detail">
                <section id="Jobdetail">
                    <h1 className="section-header">
                        Thông tin tuyển dụng
                    </h1>
                    <div className="basic-infor">
                        <h2 >Thông tin cơ bản</h2>
                        <div className="basic-infor-table">
                            <div className="infor-left">
                                {job.City && (
                                    <p>Địa điểm làm việc: {City.cityName} <br /> {job.workAddress}</p>
                                )}
                                <p>Kinh nghiệm: {job.experience == '0' ? ("Không yêu cầu") :
                                    (`${job.experience} năm`)
                                }</p>
                                <p>Hình thức: {JobType.jobTypeName}</p>
                                <p>Cấp bậc: {WorkLevel.workLevelName}</p>
                            </div>
                            <div className="infor-right">
                                <p>Số lượng tuyển: {job.hireCount == 0 ? ("Không giới hạn") : (`${job.hireCount}`)}</p>
                                <p>Giới tính: {gender}</p>
                                <p>Lĩnh vực: {WorkField.workFieldName}</p>
                                <p>Mức lương: {wage}</p>
                            </div>
                        </div>
                    </div>
                    <div className="description-infor">
                        <h1 className="section-header">Chi tiết công việc</h1>
                        <div className="jd-box">
                            <h3 className="jd-header">Mô tả công việc:</h3>
                            <span className="span-job">{job.jobDescribe}</span>
                        </div>

                        {job.jobRequire && (
                            <div className="jd-box">
                                <h3 className="jd-header">Yêu cầu ứng viên:</h3>
                                <span className="span-job">{job.jobRequire}</span>
                            </div>)
                        }
                        {job.jobBenefit && (
                            <div className="jd-box">
                                <h3 className="jd-header">Quyền lợi:</h3>
                                <span className="span-job">{job.jobBenefit}</span>
                            </div>)
                        }
                    </div>
                    <div className="job-action">
                        <p><i className="fa-regular fa-clock" /> Hạn cuối ứng tuyển: {job.expireDate}</p>
                        <div className="action-body-box">
                            {isLoggedIn ? (
                                <div className="action-btn-box">
                                    {!isApplied ? (
                                        <div className="action-item">
                                            <p className="applied-p">Ứng tuyển ngay tại đây:</p>
                                            <button type="button" id="btnApply" onClick={handleShowApplyForm}><i className="fa-regular fa-paper-plane"></i> Ứng tuyển</button>
                                        </div>
                                    ) : (
                                        <div className="action-item">
                                            <p className="applied-p">Bạn đã ứng tuyển tin này</p>
                                        </div>
                                    )}
                                    {!isSaved ?
                                        (<div className="action-item">
                                            <p className="saved-p">Lưu tin để xem sau:</p>
                                            <button type="button" id="btnSave" onClick={handleSaveJob}><i className="fa-regular fa-heart"></i> Lưu tin</button>
                                        </div>
                                        ) : (
                                            <div className="action-item">
                                                <p className="saved-p">Bạn đã lưu tin này</p>
                                                <button type="button" id="btnUnSave" onClick={handleUnSaveJob}><i className="fa-regular fa-heart"></i> Bỏ lưu</button>
                                            </div>)

                                    }
                                </div>
                            ) : ((!isAdmin) &&
                                <div className="action-btn-box">
                                    <p className="applied-p">Hãy đăng nhập ngay để ứng tuyển</p>
                                    <button className="btn-login" type="button" onClick={handleLogintoApply}>Đăng nhập</button>
                                </div>
                            )}
                            {isLoggedIn && (
                                <div>
                                    <h4>Báo cáo tin tuyển dụng: Nếu bạn thấy tin tuyển dụng này có dấu hiệu lừa đảo:</h4>
                                    <button onClick={() => setIsReport(true)}><i className="fa-solid fa-triangle-exclamation"></i>  Báo cáo tin</button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                <section id="CompanyDetail">
                    <h1 className="section-header">Thông tin công ty</h1>
                    <div className="company-info-box">
                        <h1 className="company-name_info">{company.companyName}</h1>
                        <div className="intro-box">
                            <h2>Giới thiệu:</h2>
                            <p>{company.companyIntro}</p>
                        </div>
                        <div className="bottom-info-box">
                            <h4>Địa chỉ</h4>
                            <p>{company.companyAddress}</p>
                        </div>
                    </div>
                </section>
                <section id="JobByCompany">

                </section>
            </div>
            {isFormApply &&
                <div>
                    <div className="box-fillover"></div>
                    <div className="apply-box">
                        <h2>Gửi đơn ứng tuyển</h2>
                        <form className="form-apply" onSubmit={handleSubmitApply}>
                            {cvList.length > 0 ? (
                                <div>
                                    <div className="apply-select-box">
                                        <label htmlFor="cvId">Chọn CV ứng tuyển:</label>
                                        <select
                                            id="cvId"
                                            value={cvId}
                                            onChange={(e) => setCvId(e.target.value)}
                                        >
                                            {cvList.map((cv) => (
                                                <option key={cv.cvId} value={cv.cvId}>
                                                    {cv.cvTitle}
                                                </option>
                                            ))}

                                        </select>
                                    </div>
                                    <div div className="apply-select-box">
                                        <label htmlFor="coverLetter">Thư ứng tuyển:</label>
                                        <textarea
                                            rows={5}
                                            id="coverLetter"
                                            value={coverLetter}
                                            onChange={(e) => setCoverLetter(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="apply-btn-box">
                                        <button className="btnSubmitApply" type="submit">Ứng tuyển</button>
                                        <button className="btnCancelApply" type="button" onClick={handleShowApplyForm}>Hủy</button>
                                    </div>
                                </div>) : (
                                <div>
                                    <h3>Bạn chưa tạo CV, hãy tạo Cv để ứng tuyển</h3>
                                    <NavLink className="to-createcv-link" to={"/createCv"}>Tạo CV ngay</NavLink>
                                    <button className="btnCancelApply" type="button" onClick={handleShowApplyForm}>Đóng</button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>}
            {isReport && (
                <div>
                    <div className="box-fillover"></div>
                    <div className="apply-box">
                        <h2>Báo cáo tin tuyển dụng</h2>
                        <form className="form-apply">
                            <div div className="apply-select-box">
                                <label htmlFor="reportDescribe">Nội dung:</label>
                                <textarea
                                    placeholder="Vui lòng mô tả rõ ràng về vấn đề bạn đang gặp phải"
                                    rows={5}
                                    id="reportDescribe"
                                    value={reportText}
                                    onChange={(e) => setReportText(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="apply-btn-box">
                                <button id="btnSubmitReport" type="button" onClick={handleSubmitReport}>Báo cáo</button>
                                <button id="btnCancelReport" type="button" onClick={handleShowReportForm}>Hủy</button>
                            </div>
                        </form>
                    </div>

                </div>
            )
            }
        </div>
    )
}

export default JobDetail;
