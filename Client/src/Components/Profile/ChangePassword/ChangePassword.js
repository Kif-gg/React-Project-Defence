import { editUserData } from "../../../Services/authService";

export default function ChangePassword({ setEditPasswordMode }) {

    const onEditSubmit = async (e) => {
        e.preventDefault();

        const result = Object.fromEntries(new FormData(e.target));

        if (window.confirm('Are you sure you want to change your password?') === true) {
            const done = await editUserData(result);
            if (done) {
                setEditPasswordMode(false);
            };
        }
    }

    const cancelEdit = () => {
        setEditPasswordMode(false);
    }

    return (
        <form method="POST" onSubmit={onEditSubmit}>
            <label htmlFor="current">Current password
                <br />
                <input type="password" name="current" id="current" required />
            </label>
            <span className="pass-text"><i className="fa-solid fa-lock"></i></span>
            <p className="error">
                Current password is required if you want to change it!
            </p>
            <p className="error">
                Wrong password!
            </p>
            <br />
            <label htmlFor="new">New password
                <br />
                <input type="password" name="new" id="new" required minLength="5" />
            </label>
            <span className="pass-text"><i className="fa-solid fa-lock"></i></span>
            <p className="error">
                New password is required!
            </p>
            <p className="error">
                New password is too short!
            </p>
            <p>
                <input type="submit" value="Change password" />
            </p>
            <button type="button" className="cancel" onClick={cancelEdit}>Cancel</button>
        </form>
    );
};