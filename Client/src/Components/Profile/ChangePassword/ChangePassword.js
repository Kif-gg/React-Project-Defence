export default function ChangePassword() {
    return (
        <form action="" method="">
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
                <input type="password" name="new" id="new" required minlength="5" />
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
            <a href="profile.html"><button type="button" className="cancel">Cancel</button></a>
        </form>
    );
};