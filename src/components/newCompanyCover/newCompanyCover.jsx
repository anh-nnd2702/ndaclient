import { NavLink } from "react-router-dom";
import "./newCompanyCover.css";

const NewCompanyCover = () =>{
    return (
        <div className="cover-box">
            <h2>Tài khoản của bạn chưa được duyệt</h2>
            <h2>Vui lòng cập nhật thông tin công ty và chờ quản trị viên duyệt tài khoản của bạn!</h2>
            <NavLink to={`/companyProfile`}>Cập nhật thông tin công ty</NavLink>
        </div>
    )
}

export default NewCompanyCover;
