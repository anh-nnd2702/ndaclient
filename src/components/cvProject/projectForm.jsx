import React, { useState, useEffect } from "react";

const ProjectForm = ({ onSubmitProject, onCancel, currentPrj }) => {
  const [prjName, setPrjName] = useState(currentPrj.prjName || "");
  const [teamSize, setTeamSize] = useState(currentPrj.teamSize || 1);
  const [startDate, setStartDate] = useState(currentPrj.startDate || "");
  const [endDate, setEndDate] = useState(currentPrj.endDate || "");
  const [prjPosition, setPrjPosition] = useState(currentPrj.prjPosition || "");
  const [prjDescribe, setPrjDescribe] = useState(currentPrj.prjDescribe || "");
  const [isNotEnd, setIsNotEnd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [validatext, setValidatext] = useState("");

  useEffect(() => {
    if (JSON.stringify(currentPrj) === '{}') {
      setIsNotEnd(false);
    }
    else {
      setIsUpdate(true);
      setIsNotEnd(currentPrj.startDate === currentPrj.endDate);
    }
  }, [currentPrj])

  const handleSubmitProject = (e) => {
    e.preventDefault();
    if(isNotEnd){
      setEndDate(startDate);
    }
    if(validateForm()){
    const projectInfo = {
      prjName,
      teamSize,
      startDate,
      endDate: isNotEnd ? (startDate) : (endDate),
      prjPosition,
      prjDescribe,
    };
    if (!isUpdate) {
      onSubmitProject(projectInfo, -1);
      resetAllFields();
    }
    else {
      onSubmitProject(projectInfo, currentPrj.index)
    }}
  };

  const resetAllFields = () => {
    setPrjName("");
    setTeamSize("");
    setStartDate("");
    setEndDate("");
    setPrjPosition("");
    setPrjDescribe("");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  };

  const validateForm = () => {
    if (prjName === "" || prjPosition==="" ||startDate === "" || (endDate === "" && !isNotEnd)) {
        setValidatext("Vui lòng điền đủ tên dự án, vai trò, ngày bắt đầu và kết thúc");
        return false;
    }
    else return true;
}

  return (
    <div className="pop-up-box">
      <h2>Dự án của bạn</h2>
      <form className="form-popup">
      <span className="valid-text">{validatext}</span>
        <div className="popup-input-box">
          <label htmlFor="prjName">Tên dự án:</label>
          <input
            type="text"
            id="prjName"
            value={prjName}
            onChange={(e) => setPrjName(e.target.value)}
            required
          />
        </div>
        <div className="popup-input-box">
          <label htmlFor="teamSize">Số lượng thành viên:</label>
          <input
            min={1}
            max={99}
            type="number"
            id="teamSize"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
          />
        </div>
        <div className="popup-input-box">
          <label htmlFor="startDate">Ngày bắt đầu:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="popup-input-box">
          <label htmlFor="endDate">Ngày kết thúc:</label>
          <input
            disabled={isNotEnd}
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="popup-check-box">
          <label htmlFor="isNotEnd">Dự án đang thực hiện:</label>
          <input
            type="checkbox"
            id="isNotEnd"
            checked={isNotEnd}
            onChange={(e) => { setIsNotEnd(e.target.checked) }}
          />
        </div>
        <div className="popup-input-box">
          <label htmlFor="prjPosition">Nhiệm vụ/ Vai trò của bạn:</label>
          <input
            type="text"
            id="prjPosition"
            value={prjPosition}
            onChange={(e) => setPrjPosition(e.target.value)}
          />
        </div>
        <div className="popup-input-box">
          <label htmlFor="prjDescribe">Mô tả thêm về dự án:</label>
          <textarea
            id="prjDescribe"
            value={prjDescribe}
            onChange={(e) => setPrjDescribe(e.target.value)}
          ></textarea>
        </div>
        <button className="popup-add-btn" type="button" onClick={handleSubmitProject}>
          Lưu
        </button>
        <button className="popup-cancel-btn" type="button" onClick={handleCancel}>
          Hủy
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
