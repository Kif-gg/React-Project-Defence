import { useEffect, useState } from "react";
import ChangePassword from "./ChangePassword/ChangePassword";
import EditUserData from "./EditUserData/EditUserData";
import { getUserProfile } from "../../Services/authService.js";

export default function Profile() {

    const [user, setUser] = useState({});

    useEffect(() => {
        getUserProfile().then(result => setUser(result))
    }, [])

    return (
        <main>
            <div className="person-info">
                <i className="fa-solid fa-circle-user"></i>
                <p>Username</p>
                <h3>{user.username}</h3>
                <hr />
                <p>Email</p>
                <h3>{user.email}</h3>
                <hr />
                <p>Phone number</p>
                <h3>{user.number}</h3>
                <hr />
                <div className="buttons">
                    <button type="button" className="edit">Edit profile data</button>
                    <a href="favorites.html"><button type="button">Favorite products</button></a>
                    <button type="button" className="edit">Change password</button>
                </div>
            </div>
            {/* Add logic for rendering the two forms */}
            <EditUserData />
            <ChangePassword />
        </main>
    );
};