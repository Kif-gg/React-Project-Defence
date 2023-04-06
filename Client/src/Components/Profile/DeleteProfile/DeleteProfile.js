import { Navigate } from "react-router-dom";
import { deleteUserProfile } from "../../../Services/authService";

export default function DeleteProfile({ setDeleteProfileMode }) {

    const onDeleteSubmit = async (e) => {
        e.preventDefault();

        const result = Object.fromEntries(new FormData(e.target));

        console.log(result);

        if (window.confirm('Are you sure you want to delete your profile?') === true) {
            const done = await deleteUserProfile(result);
            if (done) {
                localStorage.clear();
                <Navigate to={'/users/login'} />
            };
        }
    }

    const cancelDelete = () => {
        setDeleteProfileMode(false);
    }

    return (
        <form method="POST" onSubmit={onDeleteSubmit}>
            <label htmlFor="password">Enter password
                <br />
                <input type="password" name="password" id="password" required />
            </label>
            <span className="pass-text"><i className="fa-solid fa-lock"></i></span>
            <p className="error">
                Wrong password!
            </p>
            <p>
                <input type="submit" value="Delete profile" />
            </p>
            <button type="button" className="cancel" onClick={cancelDelete}>Cancel</button>
        </form>
    );
};