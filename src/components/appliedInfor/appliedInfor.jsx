import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
import Rating from "react-rating";
import "../../scenes/viewCv/viewCv.css";

const ApplicationInfor = ({ apply }) => {
    const aplActivity = apply.aplActivity;
    const aplAward = apply.aplAward;
    const aplCertificate = apply.aplCertificate;
    const aplEducation = apply.aplEducation;
    const aplExperience = apply.aplExperience;
    const aplProject = apply.aplProject;
    const aplSkill = apply.aplSkill;


    const matchStatus = (aps) => {
        if (aps === 0) {
            return "Hồ sơ mới"
        }
        else if (aps === 1) {
            return "Hồ sơ đã xem"
        }
        else if (aps === 2) {
            return "Đã duyệt phù hợp"
        }
        else {
            return "Hồ sơ đã loại"
        }
    }

    const checkCertTime = (sT, eT) => {
        if (sT === eT) {
            const fST = formatDate(sT);
            return `Ngày cấp: ${fST} - Không hết hạn`
        }
        else {
            const fST = formatDate(sT);
            const eST = formatDate(eT);
            return `Ngày cấp: ${fST} - Hạn đến: ${eST}`
        }
    }

    const checkEduTime = (sT, eT) => {
        if (sT === eT) {
            const fST = formatDate(sT);
            return `${fST} - Chưa tốt nghiệp`
        }
        else {
            const fST = formatDate(sT);
            const eST = formatDate(eT);
            return `${fST} - ${eST}`
        }
    }

    const checkExpTime = (sT, eT) => {
        if (sT === eT) {
            const fST = formatDate(sT);
            return `${fST} - Hiện tại`
        }
        else {
            const fST = formatDate(sT);
            const eST = formatDate(eT);
            return `${fST} - ${eST}`
        }
    }

    const checkTeamSize = (tSz) => {
        if (tSz > 1) {
            return `Nhóm: ${tSz} thành viên`
        }
        else {
            return `Dự án cá nhân`
        }
    }


    const formatDate = (t) => {
        const date = new Date(t);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
        return formattedDate;
    }


    return (
        <div>
            <div className='cover-letter-box'>
                <h3>Thư ứng tuyển</h3>
                <p>{apply.coverLetter}</p>
            </div>
            <div className='viewCv'>
                <div className='view-apply-head'>
                    <h1>Hồ sơ ứng viên</h1>
                    <div className={`status-tag-${apply.applyStatus} status-box`}>{matchStatus(apply.applyStatus)}</div>
                </div>
                <div className='viewCv-body' id='componentToPrint'>
                    <div className='cv-head-box'>
                        <div className='img-box'>
                            <img src={apply.cvImgUrl} alt="ảnh ứng viên"></img>
                        </div>
                        <div className='cv-infor'>
                            <h2>{apply.fullName}</h2>
                            <h3>{apply.position}</h3>
                            <div className='infor-box'>
                                <div className='infor-half'>
                                    <p><i className='fa-solid fa-phone'></i> {apply.phoneNumber}</p>
                                    <p><i className='fa-solid fa-envelope'></i> {apply.email}</p>
                                </div>
                                <div className='infor-half'>
                                    {apply.gender > 0 && <p><i className={apply.gender === 1 ? `fa-solid fa-venus` : `fa-solid fa-mars`} />{apply.gender === 1 ? `Nữ` : `Nam`}</p>}
                                    <p><i className='fa-solid fa-cake-candles' />{formatDate(apply.dateOfBirth)}</p>
                                </div>
                            </div>
                            {apply.externalLink &&
                                <p><i className='fa-solid fa-link'></i>{apply.externalLink}</p>
                                }
                            <p>{apply.cvIntro}</p>

                        </div>
                    </div>
                    <div className='cv-item-list'>
                    {((aplEducation && aplEducation.length > 0) && (
                        <div className='cv-part'>
                            <h2>Học vấn</h2>
                            {aplEducation.map((edu) => (
                                <div key={edu.eduId} className='cv-item'>
                                    <div className='cv-item-head'>
                                        <h3>{edu.schoolName}</h3>
                                        <p>{checkEduTime(edu.startDate, edu.endDate)}</p>
                                    </div>
                                    <h4>{edu.major}</h4>
                                    <p>{edu.eduDescribe}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                    {(aplExperience && aplExperience.length > 0) && (
                        <div className='cv-part'>
                            <h2>Kinh nghiệm</h2>
                            {aplExperience.map((exp) => (
                                <div key={exp.experId} className='cv-item'>
                                    <div className='cv-item-head'>
                                        <h3>{exp.companyName}</h3>
                                        <p>{checkExpTime(exp.startDate, exp.endDate)}</p>
                                    </div>
                                    <h4>{exp.position}</h4>
                                    <p>{exp.experDescribe}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    {(aplProject && aplProject.length > 0) && (
                        <div className='cv-part'>
                            <h2>Dự án</h2>
                            {aplProject.map((prj) => (
                                <div key={prj.prjId} className='cv-item'>
                                    <div className='cv-item-head'>
                                        <h3>{prj.prjName}</h3>
                                        <p>{checkExpTime(prj.startDate, prj.endDate)}</p>
                                    </div>
                                    <h4>{checkTeamSize(prj.teamSize)}</h4>
                                    <h5>{prj.prjPosition}</h5>
                                    <p>{prj.prjDescribe}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    {(aplSkill && aplSkill.length > 0) && (
                        <div className='cv-part'>
                            <h2>Kỹ năng</h2>
                            <div className='cv-part-skill'>
                            {aplSkill.map((skill) => (
                                <div key={skill.skillId} className='cv-item'>
                                    <div className='cv-item-head'>
                                        <h3>{skill.skillName}</h3>
                                    </div>
                                    <Rating
                                            initialRating={skill.skillLevel}
                                            emptySymbol={<i className="rate-icon fa-regular fa-star"></i>}
                                            fullSymbol={<i className="rate-icon fa-solid fa-star"></i>}
                                            readonly
                                        />
                                    <p>{skill.skillDescribe}</p>
                                </div>
                            ))}
                            </div>
                        </div>
                    )}
                    {(aplCertificate && aplCertificate.length > 0) && (
                        <div className='cv-part'>
                            <h2>Chứng chỉ</h2>
                            {aplCertificate.map((cert) => (
                                <div key={cert.certId} className='cv-item'>
                                    <div className='cv-item-head'>
                                        <h3>{cert.certTitle}</h3>
                                        <p>{checkCertTime(cert.certDate, cert.expireDate)}</p>
                                    </div>
                                    <h4>Cấp bởi: {cert.organization}</h4>
                                    <p>{cert.certDescribe}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    {(aplAward && aplAward.length > 0) && (
                        <div className='cv-part'>
                            <h2>Khen thưởng - Danh hiệu</h2>
                            {aplAward.map((award) => (
                                <div key={award.awardId} className='cv-item'>
                                    <div className='cv-item-head'>
                                        <h3>{award.awardTitle}</h3>
                                        <p>{award.awardYear}</p>
                                    </div>
                                    <h4>Cấp bởi: {award.organization}</h4>
                                    <p>{award.awardDescribe}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    {(aplActivity && aplActivity.length > 0) && (
                        <div className='cv-part'>
                            <h2>Hoạt động xã hội</h2>
                            {aplActivity.map((activity) => (
                                <div key={activity.activityId} className='cv-item'>
                                    <div className='cv-item-head'>
                                        <h3>{activity.activityName}</h3>
                                        <p>{checkExpTime(activity.startDate, activity.endDate)}</p>
                                    </div>
                                    <h4>{activity.organization}</h4>
                                    <p>{activity.activityDescribe}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplicationInfor;