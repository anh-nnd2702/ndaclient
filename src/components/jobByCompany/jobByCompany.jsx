import React, { useState, useEffect } from "react";
import Job from "../jobCard/jobCard";

const JobByCompany = ({ jobs }) => {
  const [listJobs, setListJob] = useState([]);

  useEffect(() => {
    if (jobs && jobs.length > 0) {
      setListJob(jobs);
    }
  }, [jobs]);

  let notEmpty = true;
  if (!jobs || jobs.length === 0) {
    notEmpty = false;
  }

  return (
    <div>
      {notEmpty ? (
        <div>
          <h2>Việc làm cùng công ty:</h2>
          {listJobs.map((job) => (
            <Job key={job.jobId} job={job} />
          ))}
        </div>
      ) : (
        <h2>Công ty này không có việc làm nào khác</h2>
      )}
    </div>
  );
};

export default JobByCompany;
