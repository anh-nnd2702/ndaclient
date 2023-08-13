import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getCandidateCvById } from "../../apis/candidate";
import { updateCv, updateCvWithImg } from "../../apis/cv";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../createCv/createCv.css";
import { getReference } from "../../apis/reference";
import EducationForm from "../../components/cvEducation/educationForm";
import ExperienceForm from "../../components/cvExperience/experienceForm";
import EducationList from "../../components/cvEducation/educationList";
import ExperienceList from "../../components/cvExperience/experienceList"
import SkillForm from "../../components/cvSkill/skillForm";
import SkillList from "../../components/cvSkill/skillList";
import ProjectForm from "../../components/cvProject/projectForm";
import ProjectList from "../../components/cvProject/projectList";
import CertificateList from "../../components/cvCertificate/certificateList";
import CertificateForm from "../../components/cvCertificate/certificateForm";
import AwardList from "../../components/cvAward/awardList";
import AwardForm from "../../components/cvAward/awardForm";
import ActivityList from "../../components/cvActivity/activityList";
import ActivityForm from "../../components/cvActivity/activityForm";

const UpdateCvScene = ({isLoggedIn}) =>{
    const {cvId} = useParams();
    const [cv, setCvData] = useState({});
    const [cityList, setCityList] = useState([]);
    const [workFieldList, setWorkFieldList] = useState([]);
    const [eduLevelList, setEduLevelList] = useState([]);
    const [cvTitle, setCvTitle] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [cvPosition, setCvPosition] = useState("");
    const [workFieldId, setWorkFieldId] = useState(0);
    const [cvIntro, setCvIntro] = useState("");
    const [cityId, setCityId] = useState(0);
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState(0);
    const [externalLink, setExternalLink] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUseAvatar, setIsUseAvatar] = useState(true);
    const [cvImg, setCvImg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showEducationForm, setShowEducationForm] = useState(false);
    const [cvEducation, setCvEducation] = useState([]);
    const [eduLength, setEduLength] = useState(0);
    const [showExperienceForm, setShowExperienceForm] = useState(false);
    const [cvExperience, setCvExperience] = useState([]);
    const [experienceLength, setExperienceLength] = useState(0);
    const [showSkillForm, setShowSkillForm] = useState(false);
    const [cvSkill, setCvSkill] = useState([]);
    const [skillLength, setSkillLength] = useState(0);
    const [showPrjForm, setShowPrjForm] = useState(false);
    const [cvProject, setCvProject] = useState([]);
    const [prjLength, setPrjLength] = useState(0);
    const [showCertForm, setShowCertForm] = useState(false);
    const [cvCertificate, setCvCertificate] = useState([]);
    const [certLength, setCertLength] = useState(0);
    const [showActForm, setShowActForm] = useState(false)
    const [cvActivity, setCvActivity] = useState([]);
    const [actLength, setActLength] = useState(0);
    const [showAwardForm, setShowAwardForm] = useState(false)
    const [cvAward, setCvAward] = useState([]);
    const [awardLength, setAwardLength] = useState(0);
    const [currEdu, setCurrEdu] = useState({});
    const [currExp, setCurrExp] = useState({});
    const [currPrj, setCurrPrj] = useState({});
    const [currSkill, setCurrSkill] = useState({});
    const [currAward, setCurrAward] = useState({});
    const [currCert, setCurrCert] = useState({});
    const [currAct, setCurrAct] = useState({});
    const navigate = useNavigate();

    const fetchCvData = async ()=>{
        try{
            const cvData = await getCandidateCvById(cvId);
            if(cvData){
                setCvData(cvData);
                setCvImg(cvData.cvImgUrl);
                setFullName(cvData.fullName);
                setCvTitle(cvData.cvTitle);
                setEmail(cvData.email);
                setPhoneNumber(cvData.phoneNumber);
                setCvPosition(cvData.cvPosition);
                setGender(cvData.gender);
                setDateOfBirth(cvData.dateOfBirth);
                setWorkFieldId(cvData.workFieldId);
                setCityId(cvData.cityId);
                setAddress(cvData.address||"");
                setCvIntro(cvData.cvIntro||"");
                setExternalLink(cvData.externalLink||"");
                if(typeof(cvData.cvCertificate) !== "undefined"){
                    setCvCertificate(cvData.cvCertificate);
                    setCertLength(cvData.cvCertificate.length)
                }
                if(typeof(cvData.cvEducation) !== "undefined"){
                    setCvEducation(cvData.cvEducation);
                    setEduLength(cvData.cvEducation.length)
                }
                if(typeof(cvData.cvExperience) !== "undefined"){
                    setCvExperience(cvData.cvExperience);
                    setExperienceLength(cvData.cvExperience.length)
                }
                if(typeof(cvData.cvProject) !== "undefined"){
                    setCvProject(cvData.cvProject);
                    setPrjLength(cvData.cvProject.length)
                }
                if(typeof(cvData.cvSkill) !== "undefined"){
                    setCvSkill(cvData.cvSkill);
                    setSkillLength(cvData.cvSkill.length)
                }
                if(typeof(cvData.cvActivity) !== "undefined"){
                    setCvActivity(cvData.cvActivity);
                    setActLength(cvData.cvActivity.length)
                }
                if(typeof(cvData.cvAward) !== "undefined"){
                    setCvAward(cvData.cvAward);
                    setAwardLength(cvData.cvAward.length)
                }
            }
        }
        catch(error){
            console.log(error);
            throw new Error("Can not get Cv: ", error);
        }
    }

    const fetchReference = async () => {
        try {
            const reference = await getReference();
            setCityList(reference.city);
            setWorkFieldList(reference.workField);
            setEduLevelList(reference.educationLevel);
        } catch (error) {
            console.error('There was an error fetching reference data:', error);
        }
    }

    const checkLogin = () =>{
        const loggedIn = localStorage.getItem('isLoggedIn') ==="true"|| localStorage.getItem('isLoggedIn')===true;
        return loggedIn;
    }

    useEffect(()=>{
        if(checkLogin()){
            fetchCvData();
            fetchReference();
        }
        else{
            navigate("/")
        }
    },[isLoggedIn, cvId]);

    const handleChangeCvImg = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Url = reader.result;
                setCvImg(base64Url);
            };
            reader.readAsDataURL(file);
            setIsUseAvatar(false)
        }
    }

    const handleUpdateCv = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (isUseAvatar) {
                const isMainCv = cv.isMainCv;
                const cvImgUrl = cvImg;
                const cvData = {
                    cvTitle,
                    fullName,
                    email,
                    phoneNumber,
                    cvPosition,
                    workFieldId,
                    cityId,
                    cvIntro,
                    isMainCv,
                    cvSkill,
                    cvEducation,
                    cvExperience,
                    cvProject,
                    cvCertificate,
                    cvActivity,
                    cvAward,
                    cvImgUrl,
                    gender,
                    dateOfBirth,
                    address,
                    externalLink
                }

                const result = await updateCv(cvData, cvId)
                if (result) {
                    toast.success("Cập nhật Cv thành công", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 800,
                    });
                    navigate(-1)
                }
            }
            else {
                const isMainCv = cv.isMainCv;
                const cvImgUrl = cvImg;

                const cvData = {
                    cvTitle,
                    fullName,
                    email,
                    phoneNumber,
                    cvPosition,
                    workFieldId,
                    cityId,
                    cvIntro,
                    isMainCv,
                    cvSkill,
                    cvEducation,
                    cvExperience,
                    cvProject,
                    cvCertificate,
                    cvActivity,
                    cvAward,
                    cvImgUrl,
                    gender,
                    dateOfBirth,
                    address,
                    externalLink,
                    cvImage: selectedFile,
                };

                
                const result = await updateCvWithImg(cvData, cvId);

                if (result) {
                    toast.success("Cập nhật Cv thành công", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 800,
                    });
                    navigate(-1)
                }
            }
        }
        catch (error) {
            console.error(error);
            toast.error("Sửa CV thất bại!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 800,
            });
        }
        finally {
            setIsSubmitting(false)
        }
    }

    // sự kiện của cv activity
    const handleSubmitActivity = async (actData, index) => {
        if (index === -1) {
            setCvActivity((prevCvActivity) => [...prevCvActivity, actData]);
            setActLength((prevLength) => prevLength + 1);
            setCurrAct({});
            setShowActForm(false);
        }
        else{
            setCvActivity((prevCvActivity) => {
                const updatedActivity = [...prevCvActivity];
                updatedActivity[index] = actData;
                return updatedActivity;
            });
            setShowActForm(false);
        }
    }
    const handleCancelActivity = async () => {
        setCurrAct({});
        setShowActForm(false);
    }
    const handleShowActivityForm = () => {
        setCurrAct({});
        setShowActForm(true);
    };
    const handleUpdateActivity = (currAct, index) => {
        currAct.index = index;
        setCurrAct(currAct);
        setShowActForm(true);
    }

    const handleRemoveActivity = (index) => {
        setCvActivity((prevCvActivity) => {
            return prevCvActivity.filter((_, i) => i !== index);
        });
        setActLength((prevLength) => prevLength - 1);
        setCurrAct({});
    };

    // sự kiện của cv award
    const handleSubmitAward = async (awardData, index) => {
        if (index === -1) {
            setCvAward((prevCvAward) => [...prevCvAward, awardData]);
            setAwardLength((prevLength) => prevLength + 1);
            setShowAwardForm(false)
        }
        else {
            setCvAward((prevCvAward) => {
                const updatedAward = [...prevCvAward];
                updatedAward[index] = awardData;
                return updatedAward;
            });
            setShowAwardForm(false);
        }
    }
    const handleCancelAward = async (e) => {
        setShowAwardForm(false);
        setCurrAward({});
    }
    const handleShowAwardForm = () => {
        setCurrAward({});
        setShowAwardForm(true);
    };
    const handleUpdateAward = (currAward, index) => {
        currAward.index = index;
        setCurrAward(currAward);
        setShowAwardForm(true);
    }

    const handleRemoveAward = (index) => {
        setCvAward((prevCvAward) => {
            return prevCvAward.filter((_, i) => i !== index);
        });
        setAwardLength((prevLength) => prevLength - 1);
        setCurrAward({});
    };

    // sự kiện của cv education
    const handleSubmitEducation = async (eduData, index) => {
        if (index === -1) {
            setCvEducation((prevCvEducation) => [...prevCvEducation, eduData]);
            setEduLength((prevLength) => prevLength + 1);
            setShowEducationForm(false)
        }
        else {
            setCvEducation((prevCvEducation) => {
                const updatedEducation = [...prevCvEducation];
                updatedEducation[index] = eduData;
                return updatedEducation;
            });
            setShowEducationForm(false);
        }
    }
    const handleCancelEdu = async (e) => {
        setShowEducationForm(false);
        setCurrEdu({});
    }
    const handleShowEducationForm = () => {
        setShowEducationForm(true);
        setCurrEdu({});
    };
    const handleUpdateEducation = (currEdu, index) => {
        currEdu.index = index;
        setCurrEdu(currEdu);
        setShowEducationForm(true)
    }

    const handleRemoveEducation = (index) => {
        setCvEducation((prevCvEducation) => {
            return prevCvEducation.filter((_, i) => i !== index);
        });
        setEduLength((prevLength) => prevLength - 1);
        setCurrEdu({});
    };

    // sự kiện của cv experience
    const handleSubmitExperience = (experienceData, index) => {
        if (index === -1) {
            setCvExperience((prevCvExperience) => [...prevCvExperience, experienceData]);
            setExperienceLength((prevLength) => prevLength + 1);
            setShowExperienceForm(false);
        }
        else {
            setCvExperience((prevCvExperience) => {
                const updatedExperience = [...prevCvExperience];
                updatedExperience[index] = experienceData;
                return updatedExperience;
            });
            setShowExperienceForm(false);
        }

    };

    const handleCancelExperience = () => {
        setShowExperienceForm(false);
        setCurrExp({});
    };

    const handleShowExperienceForm = () => {
        setCurrExp({});
        setShowExperienceForm(true);
    };
    const handleUpdateExperience = (currExper, index) => {
        currExper.index = index;
        setCurrExp(currExper);
        setShowExperienceForm(true);
    }
    const handleRemoveExperience = (index) => {
        setCvExperience((prevCvExperience) =>
            prevCvExperience.filter((_, i) => i !== index)
        );
        setExperienceLength((prevLength) => prevLength - 1);
        setCurrExp({});
    };

    // sự kiện của cv skill
    const handleSubmitSkill = (skillData, index) => {
        if (index === -1) {
            setCvSkill((prevCvSkill) => [...prevCvSkill, skillData]);
            setSkillLength((prevLength) => prevLength + 1);
            setShowSkillForm(false);
        } else {
            setCvSkill((prevCvSkill) => {
                const updatedSkill = [...prevCvSkill];
                updatedSkill[index] = skillData;
                return updatedSkill;
            });
            setShowSkillForm(false);
        }

    };

    const handleCancelSkill = () => {
        setShowSkillForm(false);
        setCurrSkill({});
    };

    const handleShowSkillForm = () => {
        setCurrSkill({})
        setShowSkillForm(true);
    };
    const handleUpdateSkill = (currSkill, index) => {
        currSkill.index = index;
        setCurrSkill(currSkill);
        setShowSkillForm(true)
    }
    const handleRemoveSkill = (index) => {
        setCvSkill((prevCvSkill) =>
            prevCvSkill.filter((_, i) => i !== index)
        );
        setSkillLength((prevLength) => prevLength - 1);
        setCurrSkill({})
    };

    // sự kiện của cv project
    const handleSubmitPrj = (projectData, index) => {
        if (index === -1) {
            setCvProject((prevCvProject) => [...prevCvProject, projectData]);
            setPrjLength((prevLength) => prevLength + 1);
            setShowPrjForm(false);
        }
        else {

            setCvProject((prevCvProject) => {
                const updatedProjec = [...prevCvProject];
                updatedProjec[index] = projectData;
                return updatedProjec;
            });
            setShowPrjForm(false);
        }
    };

    const handleUpdatePrj = (currPrj, index) => {
        currPrj.index = index;
        setCurrPrj(currPrj);
        setShowPrjForm(true);
    }

    const handleCancelPrj = () => {
        setShowPrjForm(false);
        setCurrPrj({});
    };

    const handleShowPrjForm = () => {
        setCurrPrj({});
        setShowPrjForm(true);
    };

    const handleRemovePrj = (index) => {
        setCvProject((prevCvPrj) =>
            prevCvPrj.filter((_, i) => i !== index)
        );
        setPrjLength((prevLength) => prevLength - 1);
        setCurrPrj({});
    };

    // sự kiện của cv certificate
    const handleSubmitCert = (certData, index) => {
        if (index === -1) {
            setCvCertificate((prevCvCert) => [...prevCvCert, certData]);
            setCertLength((prevLength) => prevLength + 1);
            setShowCertForm(false);
        }
        else {
            setCvCertificate((prevCvCert) => {
                const updatedExperience = [...prevCvCert];
                updatedExperience[index] = certData;
                return updatedExperience;
            });
            setShowCertForm(false);
        }
    };

    const handleUpdateCert = (currCert, index) => {
        currCert.index = index;
        setCurrCert(currCert);
        setShowCertForm(true);
    }

    const handleCancelCert = () => {
        setShowCertForm(false);
        setCurrCert({});
    };

    const handleShowCertForm = () => {
        setCurrCert({});
        setShowCertForm(true);
    };

    const handleRemoveCert = (index) => {
        setCvCertificate((prevCvCert) =>
            prevCvCert.filter((_, i) => i !== index)
        );
        setCertLength((prevLength) => prevLength - 1);
        setCurrCert({});
    };

    return (
        <div className="create-cv-body">
            <h1 className="create-cv-title">Chỉnh sửa Cv của bạn</h1>
            <form onSubmit={handleUpdateCv} className="form-create-cv">
                <div className="input-img" >
                    <label htmlFor="cvImg">Ảnh hồ sơ (ảnh thẻ của bạn):</label>
                    <div className="avatar-profile-box">
                        {cvImg ? (
                            <img src={cvImg} alt="Avatar" />
                        ) : (
                            <img src="https://drive.google.com/uc?export=view&id=1TGmpHymRq3R-dq6eqYeIJfHgt461e6FE" alt="Default Avatar" />
                        )}
                    </div>
                    <input
                        type="file"
                        id="avatar"
                        accept="image/*"
                        onChange={handleChangeCvImg}
                    />
                </div>
                <div className="form-cv-infor">
                    <div className="cv-input-box">
                        <label htmlFor="cvTitle">Tên CV:</label>
                        <input
                            type="text"
                            id="cvTitle"
                            value={cvTitle}
                            onChange={(e) => setCvTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div div className="cv-input-box">
                        <label htmlFor="fullName">Họ và tên:</label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div div className="cv-input-box">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div div className="cv-input-box">
                        <label htmlFor="phoneNumber">Số điện thoại:</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div div className="cv-input-box">
                        <label htmlFor="cvPosition">Vị trí ứng tuyển:</label>
                        <input
                            type="text"
                            id="cvPosition"
                            value={cvPosition}
                            onChange={(e) => setCvPosition(e.target.value)}
                            required
                        />
                    </div>
                    <div className="select-boxes">
                        <div className="cv-select-box">
                            <label htmlFor="gender">Giới tính:</label>
                            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="0">Chọn giới tính</option>
                                <option value='2'>Nam</option>
                                <option value='1'>Nữ</option>
                            </select>
                        </div>
                        <div className="cv-select-box">
                            <label htmlFor="dateOfBirth">Ngày sinh:</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                defaultValue={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="select-boxes">
                        <div div className="cv-select-box">
                            <label htmlFor="workFieldId">Lĩnh vực chuyên môn:</label>
                            <select
                                id="workFieldId"
                                value={workFieldId}
                                onChange={(e) => setWorkFieldId(e.target.value)}
                            >
                                {workFieldList.map((field) => (
                                    <option key={field.workFieldId} value={field.workFieldId}>
                                        {field.workFieldName}
                                    </option>
                                ))}

                            </select>
                        </div>
                        <div div className="cv-select-box">
                            <label htmlFor="city">Tỉnh/ Thành phố:</label>
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

                    </div>
                    <div div className="cv-input-box">
                        <label htmlFor="address">Địa chỉ:</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div div className="cv-input-box">
                        <label htmlFor="externalLink">Liên kết trang cá nhân Facebook/LinkedIn:</label>
                        <input
                            type="text"
                            id="externalLink"
                            value={externalLink}
                            onChange={(e) => setExternalLink(e.target.value)}
                        />
                    </div>
                    <div div className="cv-input-box">
                        <label htmlFor="cvIntro">Giới thiệu bản thân - Mục tiêu nghề nghiệp:</label>
                        <textarea
                            rows={3}
                            id="cvIntro"
                            value={cvIntro}
                            onChange={(e) => setCvIntro(e.target.value)}
                            required
                        ></textarea>
                    </div>
                </div>
                <div className="education-box child-box">
                    <div className="education-head child-head">
                        <h1>Học vấn</h1>
                        <button className="btn-add" type="button" onClick={handleShowEducationForm}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <EducationList eduList={cvEducation} 
                    listLength={eduLength} 
                    handleDeleteEducation={handleRemoveEducation}
                    handleUpdateEdu={handleUpdateEducation} />
                    {showEducationForm && (
                        <div>
                            <div className="box-fillover"></div>
                            <EducationForm onSubmitEdu={handleSubmitEducation} onCancel={handleCancelEdu} currentEducation={currEdu} eduLevelList={eduLevelList} />
                        </div>
                    )}
                </div>
                <div className="experience-box child-box">
                    <div className="experience-head child-head">
                        <h1>Kinh nghiệm làm việc</h1>
                        <button className="btn-add" type="button" onClick={handleShowExperienceForm}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <ExperienceList
                        expList={cvExperience}
                        listLength={experienceLength}
                        handleDeleteExp={handleRemoveExperience}
                        handleUpdateExp={handleUpdateExperience}
                    />
                    {showExperienceForm && (
                        <div>
                            <div className="box-fillover"></div>
                            <ExperienceForm
                                onSubmitExperience={handleSubmitExperience}
                                onCancel={handleCancelExperience}
                                currentExp={currExp}
                            />
                        </div>
                    )}
                </div>
                <div className="skill-box child-box">
                    <div className="skill-head child-head">
                        <h1>Kỹ năng</h1>
                        <button className="btn-add" type="button" onClick={handleShowSkillForm}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <SkillList
                        skillList={cvSkill}
                        listLength={skillLength}
                        handleDeleteSkill={handleRemoveSkill}
                        handleUpdateSkill={handleUpdateSkill}
                    />
                    {showSkillForm && (
                        <div>
                            <div className="box-fillover"></div>
                            <SkillForm
                                onSubmitSkill={handleSubmitSkill}
                                onCancel={handleCancelSkill}
                                currentSkill={currSkill}
                            />
                        </div>
                    )}
                </div>
                <div className="prj-box child-box">
                    <div className="prj-head child-head">
                        <h1>Dự án</h1>
                        <button className="btn-add" type="button" onClick={handleShowPrjForm}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <ProjectList
                        prjList={cvProject}
                        listLength={prjLength}
                        handleDeletePrj={handleRemovePrj}
                        handleUpdatePrj={handleUpdatePrj}
                    />
                    {showPrjForm && (
                        <div>
                            <div className="box-fillover"></div>
                            <ProjectForm
                                onSubmitProject={handleSubmitPrj}
                                onCancel={handleCancelPrj}
                                currentPrj={currPrj}
                            />
                        </div>
                    )}
                </div>
                <div className="award-box child-box">
                    <div className="award-head child-head">
                        <h1>Danh hiệu/ Khen thưởng</h1>
                        <button className="btn-add" type="button" onClick={handleShowAwardForm}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <AwardList
                        awardList={cvAward}
                        listLength={awardLength}
                        handleDeleteAward={handleRemoveAward}
                        handleUpdateAward={handleUpdateAward}
                    />
                    {showAwardForm && (
                        <div>
                            <div className="box-fillover"></div>
                            <AwardForm
                                onSubmitAward={handleSubmitAward}
                                onCancel={handleCancelAward}
                                currentAward={currAward}
                            />
                        </div>
                    )}
                </div>
                <div className="cert-box child-box">
                    <div className="cert-head child-head">
                        <h1>Chứng chỉ</h1>
                        <button className="btn-add" type="button" onClick={handleShowCertForm}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <CertificateList
                        certList={cvCertificate}
                        listLength={certLength}
                        handleDeleteCertificate={handleRemoveCert}
                        handleUpdateCert={handleUpdateCert}
                    />
                    {showCertForm && (
                        <div>
                            <div className="box-fillover"></div>
                            <CertificateForm
                                onSubmitCertificate={handleSubmitCert}
                                onCancel={handleCancelCert}
                                currentCert={currCert}
                            />
                        </div>
                    )}
                </div>
                <div className="act-box child-box">
                    <div className="act-head child-head">
                        <h1>Hoạt động xã hội</h1>
                        <button className="btn-add" type="button" onClick={handleShowActivityForm}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <ActivityList
                        activityList={cvActivity}
                        listLength={actLength}
                        handleDeleteActivity={handleRemoveActivity}
                        handleUpdateAct={handleUpdateActivity}
                    />
                    {showActForm && (
                        <div>
                            <div className="box-fillover"></div>
                            <ActivityForm
                                onSubmitActivity={handleSubmitActivity}
                                onCancel={handleCancelActivity}
                                currentAct={currAct}
                            />
                        </div>
                    )}
                </div>
                <button disabled={isSubmitting} id="submitCvBtn" type="submit">{isSubmitting ? <i className="fa fa-spinner fa-spin"></i> : "Lưu CV"}</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default UpdateCvScene;