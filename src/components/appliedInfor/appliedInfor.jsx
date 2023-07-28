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
            <div className='view-apply-head'>
                <h1>Hồ sơ ứng viên</h1>
                <div className={`status-tag-${apply.applyStatus}`}>{matchStatus(apply.applyStatus)}</div>
            </div>
            <div className='view-apply-body'>
                <div><img src={apply.cvImgUrl}></img></div>
                <div>
                    <h2>{apply.fullName}</h2>
                    <p className='cv-position'>{apply.cvPosition}</p>
                </div>
                <div>
                    <div>
                        <div>
                            <i className='fa-solid fa-phone'></i>
                            <p>{apply.phoneNumber}</p>
                        </div>
                        <div>
                            <i className='fa-solid fa-envelope'></i>
                            <p>{apply.email}</p>
                        </div>
                    </div>
                    <div>
                        <p>{apply.cvIntro}</p>
                    </div>
                </div>
                {((aplEducation && aplEducation.length > 0) && (
                    <div>
                        <h3>Học vấn</h3>
                        {aplEducation.map((edu) => (
                            <div key={edu.eduId}>
                                <div>
                                    <h4>{edu.schoolName}</h4>
                                    <p>{checkEduTime(edu.startDate, edu.endDate)}</p>
                                </div>
                                <h5>{edu.major}</h5>
                                <p>{edu.eduDescribe}</p>
                            </div>
                        ))}
                    </div>
                ))}
                {(aplExperience && aplExperience.length > 0) && (
                    <div>
                        <h3>Kinh nghiệm</h3>
                        {aplExperience.map((exp) => (
                            <div key={exp.experId}>
                                <div>
                                    <h4>{exp.companyName}</h4>
                                    <p>{checkExpTime(exp.startDate, exp.endDate)}</p>
                                </div>
                                <h5>{exp.position}</h5>
                                <p>{exp.experDescribe}</p>
                            </div>
                        ))}
                    </div>
                )}
                {(aplProject && aplProject.length > 0) && (
                    <div>
                        <h3>Dự án</h3>
                        {aplProject.map((prj) => (
                            <div key={prj.prjId}>
                                <div>
                                    <h4>{prj.prjName}</h4>
                                    <p>{checkExpTime(prj.startDate, prj.endDate)}</p>
                                </div>
                                <h5>{checkTeamSize(prj.teamSize)}</h5>
                                <h5>{prj.prjPosition}</h5>
                                <p>{prj.prjDescribe}</p>
                            </div>
                        ))}
                    </div>
                )}
                {(aplSkill && aplSkill.length > 0) && (
                    <div>
                        <h3>Kỹ năng</h3>
                        {aplSkill.map((skill) => (
                            <div key={skill.skillId}>
                                <div>
                                    <h4>{skill.skillName}</h4>
                                    <Rating
                                        initialRating={skill.skillLevel}
                                        emptySymbol={<i className="rate-icon fa-regular fa-star"></i>}
                                        fullSymbol={<i className="rate-icon fa-solid fa-star"></i>}
                                        readonly
                                    />
                                </div>
                                <p>{skill.skillDescribe}</p>
                            </div>
                        ))}
                    </div>
                )}
                {(aplCertificate && aplCertificate.length > 0) && (
                    <div>
                        <h3>Chứng chỉ</h3>
                        {aplCertificate.map((cert) => (
                            <div key={cert.certId}>
                                <div>
                                    <h4>{cert.certTitle}</h4>
                                    <p>{checkCertTime(cert.certDate, cert.expireDate)}</p>
                                </div>
                                <h5>Cấp bởi: {cert.organization}</h5>
                                <p>{cert.certDescribe}</p>
                            </div>
                        ))}
                    </div>
                )}
                {(aplAward && aplAward.length > 0) && (
                    <div>
                        <h3>Khen thưởng - Danh hiệu</h3>
                        {aplAward.map((award) => (
                            <div key={award.awardId}>
                                <div>
                                    <h4>{award.awardTitle}</h4>
                                    <p>{award.awardYear}</p>
                                </div>
                                <h5>{award.organization}</h5>
                                <p>{award.awardDescribe}</p>
                            </div>
                        ))}
                    </div>
                )}
                {(aplActivity && aplActivity.length > 0) && (
                    <div>
                        <h3>Khen thưởng - Danh hiệu</h3>
                        {aplActivity.map((activity) => (
                            <div key={activity.activityId}>
                                <div>
                                    <h4>{activity.activityName}</h4>
                                    <p>{checkExpTime(activity.startDate, activity.endDate)}</p>
                                </div>
                                <h5>{activity.organization}</h5>
                                <p>{activity.activityDescribe}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ApplicationInfor;