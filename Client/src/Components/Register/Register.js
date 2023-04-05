import { useContext, useState } from "react";

import { AuthContext } from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Register() {

    const { onRegisterSubmit } = useContext(AuthContext);

    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
        repass: '',
        number: ''
    });

    const onFormValuesChange = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    return (
        <div id="register">
            <main>
                <div className="register-box">
                    <h2>Register</h2>
                    <form method="POST" onSubmit={onRegisterSubmit}>
                        <label htmlFor="username">Username
                            <br />
                            <input type="text" name="username" id="username" required minLength="3" maxLength="15" value={formValues.username} onChange={onFormValuesChange} />
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
                            <input type="text" name="email" id="email" required value={formValues.email} onChange={onFormValuesChange} />
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
                            <input type="password" name="password" id="password" required minLength="5" value={formValues.password} onChange={onFormValuesChange} />
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
                            <input type="password" name="repass" id="repass" required minLength="5" className="invalid" value={formValues.repass} onChange={onFormValuesChange} />
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
                            <input type="text" name="number" inputMode="numeric" id="number" minLength="10" maxLength="13" required className="valid" value={formValues.number} onChange={onFormValuesChange} />
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
                    <h4>You already have an account? <Link to="/users/login" className="link">Login here</Link></h4>
                </div>
            </main>
        </div>
    );
};