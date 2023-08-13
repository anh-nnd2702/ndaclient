import React from "react";
import { NavLink} from 'react-router-dom';
import "./reportCard.css"

const ReportCard = ({ report, handleDeleteReport, handleUpdateReport }) => {
    
    const mapJobStatus = (job) => {
        if (job.isActive) {
            return "Tin đang hiển thị"
        }
        else {
            return "Đã bị ẩn"
        }
    }
     
    function formatModifiedTime(modifiedDate) {
        const date = new Date(modifiedDate);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const formattedDate = `ngày: ${day}/${month}/${year} lúc ${hours}:${minutes}`;
        return formattedDate;
    }
    return (
        <div className="report-card">
            <div className="report-card-head">
                <h3><NavLink to={`/job/${report.Job.jobId}`}>{`ID-${report.Job.jobId}: ${report.Job.jobTitle}`}</NavLink></h3>
                <span>{mapJobStatus(report.Job)}</span>
            </div>
            <h4><NavLink to={`/company/${report.Job.companyId}`}>{report.Job.company.companyName}</NavLink></h4>
            <h4>Người báo cáo: {report.Candidate.fullName}</h4>
            <p>Nội dung báo cáo: {report.reportDescribe}</p>
            <span>Báo cáo {formatModifiedTime(report.reportTime)}</span>
            <div className="report-actions">
                <button type="button" className="btn-delete" onClick={() => handleDeleteReport(report.reportId)}>Xóa báo cáo</button>
                {/*<button type="button" onClick={() => handleLockJob(report.Job.jobId)}>Ẩn tin</button>
                    <button type="button" onClick={() => handleLockCompany(report.Job.companyId)}>Khóa tài khoản NTD</button>*/}
                {(report.reportStatus < 1) ?
                    (<button type="button" className="btn-pass" onClick={() => handleUpdateReport(report.reportId)}>Bỏ qua báo cáo</button>) :
                    (<span>Báo cáo đã duyệt</span>)}
            </div>
        </div>
    )
}

export default ReportCard;