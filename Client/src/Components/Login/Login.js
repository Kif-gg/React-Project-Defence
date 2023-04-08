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

    const toggleVisibility = (e) => {
        const field = document.getElementById('password');
        e.currentTarget.classList.toggle('fa-lock');
        e.currentTarget.classList.toggle('fa-lock-open');

        if (Array.from(e.currentTarget.classList).find(e => e === 'fa-lock-open')) {
            field.type = 'text';
        } else {
            field.type = 'password';
        }
    };

    return (
        <div id="login">
            <main>
                <div className="login-box">
                    <h2>Login</h2>
                    <form method="POST" onSubmit={onLoginSubmit}>
                        <label htmlFor="username">Username
                            <br />
                            <input type="text" name="username" id="username" required value={formValues.username} onChange={onFormValuesChange} />
                        </label>
                        <br />
                        <label htmlFor="password">Password
                            <br />
                            <input type="password" name="password" id="password" className="password" required value={formValues.password} onChange={onFormValuesChange} />
                        </label>
                        <span className="pass-text"><i className="fa-solid fa-lock" onClick={toggleVisibility}></i></span>
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