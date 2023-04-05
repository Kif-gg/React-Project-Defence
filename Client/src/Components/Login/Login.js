import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {

    const { onLoginSubmit } = useContext(AuthContext);

    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    });

    const onFormValuesChange = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    return (
        <div id="login">
            <main>
                <div className="login-box">
                    <h2>Login</h2>
                    <form method="POST" onSubmit={onLoginSubmit}>
                        <label htmlFor="username">Username
                            <br />
                            <input type="text" name="username" id="username" required value={formValues.username} onChange={onFormValuesChange} className="valid" />
                        </label>
                        <p className="error">
                            Username is required!
                        </p>
                        <br />
                        <label htmlFor="password">Password
                            <br />
                            <input type="password" name="password" id="password" required value={formValues.password} onChange={onFormValuesChange} className="invalid" />
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
                    <h4>You don't have an account? <Link to="/users/register" className="link">Register here</Link></h4>
                </div>
            </main>
        </div>
    );
};