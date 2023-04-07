import { useEffect } from "react";
import { useNavigate } from "react-router-dom"


export function GuestPathGuard() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate('/');
    }, [navigate]);
};