import { useEffect, useState } from "react";
import ChangePassword from "./ChangePassword/ChangePassword";
import EditUserData from "./EditUserData/EditUserData";
import { getUserProfile } from "../../Services/authService.js";
import { Link } from "react-router-dom";
import DeleteProfile from "./DeleteProfile/DeleteProfile";

export default function Profile() {

    const [user, setUser] = useState({});

    useEffect(() => {
        getUserProfile().then(result => setUser(result)).catch(err => alert(err.message), setUser({}));
    }, []);

    const [editDataMode, setEditDataMode] = useState(false);
    const [editPasswordMode, setEditPasswordMode] = useState(false);
    const [deleteProfileMode, setDeleteProfileMode] = useState(false);

    const toggleEditUserData = (e) => {
        setEditDataMode(true);
        setEditPasswordMode(false);
        setDeleteProfileMode(false);
    };

    const toggleEditPassword = (e) => {
        setEditPasswordMode(true);
        setEditDataMode(false);
        setDeleteProfileMode(false);
    };

    const toggleDeleteProfile = (e) => {
        setDeleteProfileMode(true);
        setEditPasswordMode(false);
        setEditDataMode(false);
    }

    return (
        <div id="profile">
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
                        <button type="button" className="edit" onClick={toggleEditUserData}>Edit profile data</button>
                        <Link to="/users/profile/favorites"><button type="button">Favorite products</button></Link>
                        <button type="button" className="edit" onClick={toggleEditPassword}>Change password</button>
                    </div>
                    <button type="button" className="cancel" onClick={toggleDeleteProfile}>Delete profile</button>
                </div>
                {/* Add logic for rendering the forms */}
                {editDataMode && (
                    <EditUserData user={user} setEditDataMode={setEditDataMode} setUser={setUser} />
                )}

                {editPasswordMode && (
                    <ChangePassword setEditPasswordMode={setEditPasswordMode} />
                )}

                {deleteProfileMode && (
                    <DeleteProfile setDeleteProfileMode={setDeleteProfileMode} />
                )}
            </main>
        </div>
    );
};