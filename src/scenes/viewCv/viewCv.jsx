import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Rating from "react-rating";
import html2pdf from 'html2pdf.js';
import { useNavigate, useParams } from 'react-router-dom';
import { getCandidateCvById } from '../../apis/candidate';
import "./viewCv.css"

const ViewCv = () => {
    const [cvData, setCvData] = useState({});
    const [cvEdu, setCvEdu] = useState([]);
    const [cvExp, setCvExp] = useState([]);
    const [cvPrj, setCvPrj] = useState([]);
    const [cvSkill, setCvSkill] = useState([]);
    const [cvCert, setCvCert] = useState([]);
    const [cvAward, setCvAward] = useState([]);
    const [cvActivity, setCvActivity] = useState([]);
    const { cvId } = useParams();
    
    const fetchCvData = async () => {
        const cv = await getCandidateCvById(cvId);
        setCvData(cv);
        setCvCert(cv.cvCertificate);
        setCvEdu(cv.cvEducation);
        setCvExp(cv.cvExperience);
        setCvPrj(cv.cvProject);
        setCvSkill(cv.cvSkill);
        setCvActivity(cv.cvActivity);
        setCvAward(cv.cvAward)
    }

    const checkCertTime = (sT, eT) => {
        if (sT === eT) {
            const fST = formatDate(sT);
            return `${fST}`
        }
        else {
            const fST = formatDate(sT);
            const eST = formatDate(eT);
            return `${fST} - ${eST}`
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

    const handlePrintPDF = () => {
        const element = document.getElementById('componentCvToPrint');
        html2pdf()
            .from(element)
            .save(`${cvData.cvTitle}_file.pdf`);
    };

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

    useEffect(() => {
        fetchCvData();
    }, [])
    useEffect(() => {
        fetchCvData();
    }, [cvId])

    return (
        <div className='viewCv'>
            <h1>CV ứng viên</h1>
            <div className='viewCv-body' id='componentCvToPrint'>
                <div className='cv-head-box'>
                    <div className='img-box'>
                        <img src={cvData.cvImgUrl} alt="Ảnh ứng viên"></img>
                    </div>
                    <div className='cv-infor'>
                        <h2>{cvData.fullName}</h2>
                        <h3>{cvData.cvPosition}</h3>
                        <div className='infor-box'>
                            <div className='infor-half'>
                                <p><i className='fa-solid fa-phone' />{cvData.phoneNumber}</p>
                                <p><i className='fa-solid fa-envelope' />{cvData.email}</p>
                            </div>
                            <div className='infor-half'>
                                {cvData.gender > 0 && <p><i className={cvData.gender === 1 ? `fa-solid fa-venus` : `fa-solid fa-mars`} />{cvData.gender === 1 ? `Nữ` : `Nam`}</p>}
                                <p><i className='fa-solid fa-cake-candles' />{formatDate(cvData.dateOfBirth)}</p>
                            </div>
                        </div>
                        {cvData.externalLink &&
                        <p><i className='fa-solid fa-link'></i>{cvData.externalLink}</p>
                        }
                        <p>{cvData.cvIntro}</p>
                    </div>
                </div>
                <div className='cv-item-list'>
                    {(cvEdu) && (
                        <div className='cv-part'>
                            <h2>Học vấn</h2>
                            {cvEdu.map((edu) => (
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
                    )}
                    {(cvExp) && (
                        <div className='cv-part'>
                            <h2>Kinh nghiệm</h2>
                            {cvExp.map((exp) => (
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
                    {(cvPrj) && (
                        <div className='cv-part'>
                            <h2>Dự án</h2>
                            {cvPrj.map((prj) => (
                                <div key={prj.prjId} className='cv-item'>
                                    <div className='cv-item-head'>
                                        <h3>{prj.prjName}</h3>
                                        <p>{checkExpTime(prj.startDate, prj.endDate)}</p>
                                    </div>
                                    <h4>{checkTeamSize(prj.teamSize)}</h4>
                                    <h5>Vai trò: {prj.prjPosition}</h5>
                                    <p>{prj.prjDescribe}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    {(cvSkill) && (
                        <div className='cv-part'>
                            <h2>Kỹ năng</h2>
                            <div className='cv-part-skill'>
                                {cvSkill.map((skill) => (
                                    <div key={skill.skillId} className='cv-item'>
                                        <div className='cv-item-head'>
                                            <h3>{skill.skillName}</h3>
                                        </div>
                                        {skill.skillLevel>0&&
                                        <Rating
                                                initialRating={skill.skillLevel}
                                                emptySymbol={<i className="rate-icon fa-regular fa-star"></i>}
                                                fullSymbol={<i className="rate-icon fa-solid fa-star"></i>}
                                                readonly
                                            />}
                                        <p>{skill.skillDescribe}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {(cvCert) && (
                        <div className='cv-part'>
                            <h2>Chứng chỉ</h2>
                            {cvCert.map((cert) => (
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
                    {(cvAward) && (
                        <div className='cv-part'>
                            <h2>Khen thưởng/ Danh hiệu</h2>
                            {cvAward.map((award) => (
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
                    {(cvActivity) && (
                        <div className='cv-part'>
                            <h2>Hoạt động xã hội</h2>
                            {cvActivity.map((act) => (
                                <div key={act.activityId} className='cv-item'>
                                    <div className='cv-item-head'>
                                        <h3>{act.activityName}</h3>
                                        <p>{checkExpTime(act.startDate, act.endDate)}</p>
                                    </div>
                                    <h4>{act.organization}</h4>
                                    <p>{act.activityDescribe}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <button className="print-pdf" onClick={()=>handlePrintPDF()}>In thành pdf</button>
        </div>
    )
}

export default ViewCv;
