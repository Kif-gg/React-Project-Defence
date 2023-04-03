export default function Register() {
    return (
        <main>
            <div className="register-box">
                <h2>Register</h2>
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
                    <br />
                    <label htmlFor="email">Email
                        <br />
                        <input type="text" name="email" id="email" required />
                    </label>
                    <p className="error">
                        Email is required!
                    </p>
                    <p className="error">
                        Email is invalid!
                    </p>
                    <br />
                    <label htmlFor="password">Password
                        <br />
                        <input type="password" name="password" id="password" required minlength="5" />
                    </label>
                    <span className="pass-text"><i className="fa-solid fa-lock"></i></span>
                    <p className="error">
                        Password is required!
                    </p>
                    <p className="error">
                        Password is too short!
                    </p>
                    <p className="error">
                        Passwords don't match!
                    </p>
                    <br />
                    <label htmlFor="repass">Confirm Password
                        <br />
                        <input type="password" name="repass" id="repass" required minlength="5" className="invalid" />
                    </label>
                    <span className="pass-text"><i className="fa-solid fa-lock-open"></i></span>
                    <p className="error">
                        Repeating password is required!
                    </p>
                    <p className="error">
                        Passwords don't match!
                    </p>
                    <br />
                    <label htmlFor="number">Phone number
                        <br />
                        <input type="text" name="phone-number" id="number" minlength="10" maxlength="12" required
                            className="valid" />
                    </label>
                    <p className="error">
                        Phone number is required!
                    </p>
                    <p className="error">
                        Phone number is invalid!
                    </p>
                    <p>
                        <input type="submit" value="Register" />
                    </p>
                </form>
                <h4>You already have an account? <a href="login.html" className="link">Login here</a></h4>
            </div>
        </main>
    );
};