import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteReport, getAllReport, updateReportStatus } from "../../apis/reportJob.js";
import ReportCard from "../../components/reportCard/reportCard.jsx";
import "./allReport.css"

const AllReports = () => {
    const [reportList, setReportList] = useState([]);
    const navigate = useNavigate();
    const [updated, setUpdated] = useState(false);
    const handleDeleteReport = async (reportId) => {
        try {
            const result = await deleteReport(reportId);
            if (result) {
                toast.success(`Xóa báo cáo thành công!`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 900,
                });
                removeReportFromList(reportId)
            }
        }
        catch (error) {
            toast.error(`Có lỗi xảy ra khi xóa báo cáo!`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 900,
            });
        }
    }

    const removeReportFromList = (reportId) =>{
        const newReportList = reportList.filter((rp) =>{
            return (rp.reportId) !== reportId
        })
        setReportList(newReportList);
    }

    const handleUpdateReport = async (reportId) => {
        try {
            const newStatus = 1;
            const result = await updateReportStatus(reportId, newStatus);
            if (result) {
                toast.success(`Đã bỏ qua báo cáo!`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 900,
                });
            }
            setUpdated(!updated)
        }
        catch (error) {
            toast.error(`Có lỗi xảy ra khi bỏ qua báo cáo!`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 900,
            });
        }
    }

    useEffect(() => {
        fetchReport();
    }, [updated])

    const fetchReport = async () => {
        const isAdmin = localStorage.getItem("isAdmin") === true || localStorage.getItem("isAdmin") === "true";
        if (!isAdmin) {
            navigate("/adminLogin");
        }
        else {
            try {
                const allReport = await getAllReport();
                if (allReport && allReport.length > 0) {
                    setReportList(allReport);
                }
            }
            catch (error) {
                setReportList([]);
                console.log("error fetching report!");
            }
        }
    }

    return (
        <div className="all-report-body">
            <h1>Danh sách báo cáo</h1>
            <div>
                {(reportList && reportList.length > 0) ? (
                    <div>
                        {reportList.map((report) => (
                            <div key={report.reportId}>
                                <ReportCard report={report} handleDeleteReport={handleDeleteReport} handleUpdateReport={handleUpdateReport}></ReportCard>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h2>Chưa có báo cáo nào!</h2>
                )}
            </div>
            <ToastContainer></ToastContainer>
        </div>

    )
}

export default AllReports;