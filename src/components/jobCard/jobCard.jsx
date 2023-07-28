import { useEffect } from "react";
import { useState } from "react"
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import React from "react";

import './jobCard.css';

const Job = ({job}) => {

    const modifiedDate = new Date(job.modifiedTime).toLocaleDateString();
    let wage = "";
    const jobId = job.jobId;
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
    return (
        <div className="job-card">
            <NavLink to={`/job/${jobId}`} className="job-left" target="_blank" rel="noopener noreferrer">
                {job.company.companyLogo ? (
                    <img src={job.company.companyLogo} alt="Logo" />
                ) : (
                    <img src="https://drive.google.com/uc?export=view&id=1WaXr3NCH6M8_xdwwwYiNNXpgvoMjlFTl" alt="Default Logo" />
                )}
            </NavLink>
            <div className="job-right">
                <div className="card-head">
                    <NavLink className="job-card-title" to={`/job/${jobId}`} target="_blank" rel="noopener noreferrer">
                        <h2 >
                            {job.jobTitle}
                        </h2>
                    </NavLink>
                    <div className="wage-tag">{`${wage}`}</div>
                </div>
                <h3 className="job-company">{job.company.companyName}</h3>
                <p className="job-address">{job.workAddress} - {job.City.cityName}</p>
                <div className="job-tags">
                    <p>{`Ngày đăng: ${modifiedDate}`}</p>
                    <p>{`Hạn cuối: ${job.expireDate}`}</p>
                </div>
            </div>
        </div>
    )
}

export default Job;