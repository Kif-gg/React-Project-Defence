export default function Login() {
    return (
        <main>
            <div className="login-box">
                <h2>Login</h2>
                <form action="" method="">
                    <label htmlFor="username">Username
                        <br />
                        <input type="text" name="username" id="username" required className="valid" />
                    </label>
                    <p className="error">
                        Username is required!
                    </p>
                    <br />
                    <label htmlFor="password">Password
                        <br />
                        <input type="password" name="password" id="password" required className="invalid" />
                    </label>
                    <span className="pass-text"><i className="fa-solid fa-lock"></i></span>
                    <p className="error">
                        Password is required!
                    </p>
                    <br />
                    <p>
                        <input type="submit" value="Log in" />
                    </p>
                </form>
                <h4>You don't have an account? <a href="register.html" className="link">Register here</a></h4>
            </div>
        </main>
    );
};