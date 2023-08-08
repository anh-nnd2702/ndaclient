import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createReport, updateReportByJobId, updateReportStatus } from "../../apis/reportJob.js";
import "./jobDetail.css";
import { getJob, getJobByCompany, updateJobStatus } from "../../apis/job.js";
import JobDetail from "../../components/jobDetail/jobDetail";
import JobByCompany from "../../components/jobByCompany/jobByCompany";
import { getCandidateApplyByJob, createApply} from "../../apis/applyJob.js";
import {createSaveJob, getSavedJobByJobId, unSaveJob } from "../../apis/savejob";

const JobScene = ({ isLoggedIn }) => {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState({});
  const [companyData, setCompany] = useState({});
  const [JobType, setJobType] = useState({});
  const [WorkField, setWorkFiled] = useState({});
  const [WorkLevel, setWorkLevel] = useState({});
  const [City, setCity] = useState({});
  const [jobByCompany, setJobByCompany] = useState({});
  const [applied, setApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [savedJob, setSavedJob] = useState({});
  const [isLoginAdmin, setIsLoginAdmin] = useState(false);
  const [isNotExpired, setIsExpired] = useState(false);
  const isToastShownRef = useRef(false);

  const checkSaved = async () => {
    const { checkSaved, savedData } = await getSavedJobByJobId(jobId);
    if (checkSaved) {
      setIsSaved(true);
      setSavedJob(savedData);
    } else {
      setIsSaved(false);
      setSavedJob(savedData);
    }
  };

  const onSaveJob = async () => {
    try {
      const savejob = await createSaveJob(jobId);
      if (savejob) {
        toast.success(`Lưu tin thành công: ${jobData.jobTitle}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 800,
        });
        setIsSaved(true);
        setSavedJob(savejob);
      } else {
        toast.error(`Lưu tin thất bại: ${jobData.jobTitle}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 800,
        });
        setIsSaved(false);
        setSavedJob({});
      }
    } catch (error) {
      console.log(error);
      toast.error(`Lưu tin thất bại: ${jobData.jobTitle}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 800,
      });
      setIsSaved(false);
      setSavedJob({});
    }
  };

  const onUnsaveJob = async () => {
    try {
      console.log(savedJob, isSaved);
      const isUnsave = await unSaveJob(savedJob.savedJobId);
      if (isUnsave) {
        toast.success(`Đã bỏ lưu tin: ${jobData.jobTitle}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 800,
        });
        setIsSaved(false);
      } else {
        toast.error(`Bỏ lưu tin thất bại`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 800,
        });
      }
    } catch (error) {
      toast.error(`Bỏ lưu tin thất bại`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 800,
      });
    }
  };

  const checkApplied = async () => {
    const appliedJob = await getCandidateApplyByJob(jobId);
    setApplied(appliedJob);
  };

  const checkLogin = () => {
    return (
      localStorage.getItem("isLoggedIn") === true ||
      localStorage.getItem("isLoggedIn") === "true"
    );
  };

  const checkAdmin = () =>{
    return (
      localStorage.getItem("isAdmin") === true ||
      localStorage.getItem("isAdmin") === "true"
    )
  }

  const fetchJob = async () => {
    try {
      const job = await getJob(jobId, checkAdmin())      
      setJobData(job);
      setCompany(job.company);
      setCity(job.City);
      setWorkFiled(job.WorkField);
      setWorkLevel(job.WorkLevel);
      setJobType(job.JobType);
      setIsExpired(checkExpired(job.expireDate))
      const jobsByCompany = await getJobByCompany(job.company.Id);
      const filteredJob = jobsByCompany.filter(
        (jobByCompany) => jobByCompany.jobId !== jobId
      );
      setJobByCompany(filteredJob);
    } catch (error) {
      console.error("there was an error loading job: ", error);
    }
  };

  useEffect(() => {
    if (!isToastShownRef.current) {
      fetchJob();
      setIsLogin(checkLogin());
      checkApplied();
      checkSaved();
      setIsLoginAdmin(checkAdmin());
    }
  }, []);

  useEffect(() => {
    if (!isToastShownRef.current) {
      fetchJob();
      setIsLogin(checkLogin());
      checkApplied();
      checkSaved();
      setIsLoginAdmin(checkAdmin());
    }
  }, [isLoggedIn, jobId]);

  const handleSubmitApply = async (cvId, coverLetter) => {
    if (isLogin) {
      try {
        const applied = await createApply({ jobId, cvId, coverLetter });
        if (applied) {
          toast.success(`Ứng tuyển thành công: ${jobData.jobTitle}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 800,
          });
          isToastShownRef.current = true;
          setApplied(true);
        }
      } catch (error) {
        console.log(error);
        toast.error("Ứng tuyển thất bại!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 800,
        });
        isToastShownRef.current = true;
      }
    } else {
      toast.error("Bạn chưa đăng nhập!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 800,
      });
      isToastShownRef.current = true;
    }
  };

  const handleSubmitReport = async (reportText) => {
    try {
      const reported = await createReport(reportText, jobId);
      if (reported) {
        toast.success("Đã báo cáo tin tuyển dụng!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 800,
        });
        isToastShownRef.current = true;
      }
    } catch (error) {
      toast.error("Cõ lỗi xảy ra khi báo cáo tin!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 800,
      });
      isToastShownRef.current = true;
    }
  };

  const handleBlockJob = async (jobId) =>{
    try{
      const result = await updateJobStatus(jobId, {isActive: false} );
      if(result){
        toast.success("Đã ẩn tin tuyển dụng!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 800,
        });
        isToastShownRef.current = true;
      }
    }
    catch(error){
      toast.error("Cõ lỗi xảy ra khi ẩn tin!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 800,
      });
      isToastShownRef.current = true;
    }
  }

  const handlePassAllReports = async (jobId) => {
    try{
      const newStatus = true;
      const result = await updateReportByJobId(jobId, newStatus);
      if(result){
        toast.success("Đã bỏ qua các báo cáo!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 800,
        });
        isToastShownRef.current = true;
        const updatedJob = { ...jobData, ReportJobs: [] };
        setJobData(updatedJob);
      }
    }
    catch(error){
      toast.error("Cõ lỗi xảy ra khi cập nhật báo cáo!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 900,
      });
      isToastShownRef.current = true;
    }
  }

  const checkExpired = (expireDate) =>{
    const currentDate = new Date();
    const expireDateObject = new Date(expireDate);

  // So sánh ngày expireDate với ngày hiện tại
  if (expireDateObject < currentDate) {
    return false; 
  } else {
    return true; 
  }
  }

  return (
    (isNotExpired) ? (
    <div className="job-scene-body">
      <JobDetail
        job={jobData}
        WorkField={WorkField}
        WorkLevel={WorkLevel}
        JobType={JobType}
        City={City}
        company={companyData}
        isLoggedIn={isLogin}
        isApplied={applied}
        onApply={handleSubmitApply}
        onSaveJob={onSaveJob}
        onUnsaveJob={onUnsaveJob}
        isSaved={isSaved}
        onReport={handleSubmitReport}
        isAdmin={isLoginAdmin}
        onBlockJob={handleBlockJob}
        onPassReports={handlePassAllReports}
      />
      <JobByCompany jobs={jobByCompany} />
      <ToastContainer />
    </div>):(
      <div className="job-scene-body">
          <h1>Không tìm thấy tin tuyển dụng này!</h1>
      </div>
    )
  );
};

export default JobScene;
