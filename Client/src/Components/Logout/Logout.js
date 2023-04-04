import { Navigate } from "react-router-dom";

export default function Logout() {
    console.log('Logged Out!');
    return (
        <Navigate to="/" />
    );
};