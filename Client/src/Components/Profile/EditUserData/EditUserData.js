export default function EditUserData() {
    return (
        <form action="" method="">
            <label htmlFor="username">Username
                <br />
                <input type="text" name="username" id="username" required minlength="3" maxlength="15" />
            </label>
            <p className="error">
                Username is required!
            </p>
            <p className="error">
                Username is too short!
            </p>
            <p className="error">
                Username is too long!
            </p>
            <p className="error">
                This username is already taken!
            </p>
            <br />
            <label htmlFor="email">Email
                <br />
                <input type="text" name="email" id="email" required className="valid" />
            </label>
            <p className="error">
                Email is required!
            </p>
            <p className="error">
                Email is not valid!
            </p>
            <p className="error">
                This email is already registered!
            </p>
            <br />
            <label htmlFor="number">Phone number
                <br />
                <input type="text" name="number" id="number" required className="invalid" />
            </label>
            <p className="error">
                Phone number is required!
            </p>
            <p className="error">
                Phone number is invalid!
            </p>
            <br />
            <p>
                <input type="submit" value="Update profile data" />
            </p>
            <a href="profile.html"><button type="button" className="cancel">Cancel</button></a>
        </form>
    );
};