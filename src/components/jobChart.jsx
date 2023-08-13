import React, { useEffect, useRef } from 'react';
import { Bar, Chart } from 'react-chartjs-2';

const JobChart = ({ data }) => {
  const checkExpired = (t) => {
    const curDate = new Date();
    const todayString = curDate.toISOString().split('T')[0];
    return (t < todayString);
  }
  const jobs = data.filter(job => {
    return !checkExpired(job.expireDate);
  })
  const jobId = jobs.map(job => `Id- ${job.jobId}`);
  const appliedCount = jobs.map(job => job.AppliedCount);
  const newAppliedCount = jobs.map(job => job.newAppliedCount);
  const seenAppliedCount = jobs.map(job => job.seenAppliedCount);
  const rejectedAppliedCount = jobs.map(job => job.rejectedAppliedCount);
  const acceptedAppliedCount = appliedCount.map(
    (count, index) => (count - seenAppliedCount[index] - rejectedAppliedCount[index] - newAppliedCount[index])
  );

  const chartData = {
    labels: jobId,
    datasets: [
      {
        label: 'Tổng số lượt ứng tuyển',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: '#60A3D9',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: appliedCount,

      },
      {
        label: 'Ứng tuyển mới',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: newAppliedCount,

      },
      {
        label: 'Ứng tuyển đã xem',
        backgroundColor: 'rgba(54,162,235,0.2)',
        borderColor: 'rgba(54,162,235,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54,162,235,0.4)',
        hoverBorderColor: 'rgba(54,162,235,1)',
        data: seenAppliedCount,

      },
      {
        label: 'Số ứng viên đã loại',
        backgroundColor: 'rgba(255,206,86,0.2)',
        borderColor: 'rgba(255,206,86,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,206,86,0.4)',
        hoverBorderColor: 'rgba(255,206,86,1)',
        data: rejectedAppliedCount,

      },
      {
        label: 'Số ứng viên phù hợp',
        backgroundColor: 'rgba(153,102,255,0.2)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(153,102,255,0.4)',
        hoverBorderColor: 'rgba(153,102,255,1)',
        data: acceptedAppliedCount,

      },
    ],
  };

  const chartOptions = {
    indexAxis: 'x',
    scales: {
      y: {
        stacked: false,
        ticks: {
          stepSize: 1,
          beginAtZero: true,
          font: {
            size: 18
          }
        },
      },
      x: {
        type: 'category',
        labels: jobId,
        ticks: {
          font: {
            size: 18
          }
        }
      },
    },
  };

  useEffect(() => {
    // Vẽ biểu đồ khi dữ liệu jobs thay đổi
    const chartRef = new Chart('jobChartCanvas', {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    });

    return () => {
      chartRef.destroy();
    };
  }, [chartData, chartOptions, jobs]);

  return (
    <div className='job-chart'>
      <div style={{ position: 'relative', width: '95%', height: 'fit-content' }}>
        <canvas id="jobChartCanvas" />
      </div>
    </div>
  );
};

export default JobChart;
