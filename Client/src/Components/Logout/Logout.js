import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../Contexts/AuthContext";

export default function Logout() {

    const navigate = useNavigate();

    const { onLogout } = useContext(AuthContext);

    useEffect(() => {
        onLogout();
    }, [onLogout])

    return (
        navigate("/users/login")
    );
};