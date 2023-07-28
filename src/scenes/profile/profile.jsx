import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./profile.css"
import { getCandidate, getCandidateCv, getCandidateCvById } from "../../apis/candidate";
import ProfileForm from "../../containers/profileForm/ProfileForm";
import { getReference, getCity } from "../../apis/reference.js";
import ListCv from "../../containers/profileCv/ListCv";
import { deleteCvById, updateMainCv } from "../../apis/cv";
const ProfileScene = ({ isLoggedIn, onChangeProfile }) => {
    const navigate = useNavigate();
    const [candidate, setCandidateProfile] = useState({});
    const [candidateCv, setCandidateCv] = useState([]);
    const [city, setCity] = useState([]);

    useEffect(() => {
        checkLoginStatus();
    }, [isLoggedIn]);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        const hasLog = localStorage.getItem("isLoggedIn") === 'true' || localStorage.getItem("isLoggedIn") === true;
        if (!hasLog) {
            navigate('/login');
        } else {
            await fetchCandidateData();
            await fetchCandidateCv();
            await fetchCity();
        }
    }

    const handleDeleteCv = async (cvId) => {
        const confirmed = window.confirm('Bạn chắc chắn muốn xóa Cv này? Hành động này sẽ không thể hoàn tác!');
        if (confirmed) {
            try {
                const result = await deleteCvById(cvId);
                if(result){
                    toast.success("Xóa Cv thành công", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 800,
                    });
                    setCandidateCv(prevCv => prevCv.filter(cv => cv.cvId !== cvId));
                }
            }
            catch (error) {
                toast.error("Có lỗi xảy ra khi xóa Cv", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 800,
                });
            }
        }
    }

    const fetchCity = async () => {
        try {
            const city = await getCity();
            setCity(city);
        } catch (error) {
            console.error('There was an error fetching city data:', error);
        }
    };

    const fetchCandidateData = async () => {
        try {
            const candidate = await getCandidate();
            setCandidateProfile(candidate);
        } catch (error) {
            console.error('There was an error fetching candidate data:', error);
        }
    };

    const fetchCandidateCv = async () => {
        try {
            const cvList = await getCandidateCv();
            setCandidateCv(cvList);
        } catch (error) {
            console.error('There was an error fetching candidate CV:', error);
        }
    };

    const handleProfileUpdate = (updated) => {
        if (updated) {
            onChangeProfile(true);
        }
    };

    const handleUpdateMainCv = async (cvId) => {
        try {
            const message = await updateMainCv(cvId);
            fetchCandidateCv();
        }
        catch (error) {
            console.error('There was an error updating main candidate CV:', error);
        }
    }

    return (
        <div className="profile-body">
            <div className="basic-profile">
                <ProfileForm candidate={candidate} cityList={city} onProfileUpdate={handleProfileUpdate} />
            </div>
            <div>
                <ListCv cvList={candidateCv} handleSetMainCv={handleUpdateMainCv} onDeleteCv={handleDeleteCv} />
            </div>
            <ToastContainer />
        </div>
    )
}

export default ProfileScene;
