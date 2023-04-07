import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import Login from "../Components/Login/Login";


export function UserPathGuard() {

    const navigate = useNavigate();

    useEffect(() => {
        <Navigate to={<Login />} />
        navigate('/users/login');
    }, [navigate]);
};