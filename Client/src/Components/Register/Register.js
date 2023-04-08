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
    };

    const toggleVisibility = (e) => {
        e.currentTarget.classList.toggle('fa-lock');
        e.currentTarget.classList.toggle('fa-lock-open');

        const field = e.currentTarget.parentElement.previousSibling.lastChild;

        if (Array.from(e.currentTarget.classList).find(e => e === 'fa-lock-open')) {
            field.type = 'text';
        } else {
            field.type = 'password';
        }
    };

    const [isValid, setIsValid] = useState(false);

    const onBlurValidate = (e) => {
        const usernameError = document.getElementsByClassName('error')[0];
        const emailError = document.getElementsByClassName('error')[1];
        const passwordError = document.getElementsByClassName('error')[2];
        const repassError = document.getElementsByClassName('error')[3];
        const numberError = document.getElementsByClassName('error')[4];

        const refToFirstPass = document.getElementById('password');
        const refToSecondPass = document.getElementById('repass');

        const validUsername = /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$/i;
        const validEmail = /^([a-z]+)\w{2,20}[@][a-z_-]{3,20}[.][a-z]{2,5}$/i;
        const validNumber = /^(\+359|0)\d{9}$/;
        const preventWhitespace = /^[^\s]{1,20}$/i;

        if (e.currentTarget.id === 'username') {

            if (e.currentTarget.value.length === 0) {
                usernameError.style.display = 'block';
                usernameError.textContent = 'Username is required!';
                e.currentTarget.classList.remove('valid');
                e.currentTarget.classList.add('invalid');

            } else if (!validUsername.test(e.currentTarget.value)) {

                usernameError.style.display = 'block';
                usernameError.textContent = 'This username is not valid!';
                e.currentTarget.classList.remove('valid');
                e.currentTarget.classList.add('invalid');

            } else {
                usernameError.style.display = 'none';
                e.currentTarget.classList.remove('invalid');
                e.currentTarget.classList.add('valid');
            }

        } else if (e.currentTarget.id === 'email') {

            if (e.currentTarget.value.length === 0) {

                emailError.style.display = 'block';
                emailError.textContent = 'Email is required!';
                e.currentTarget.classList.remove('valid');
                e.currentTarget.classList.add('invalid');

            } else if (!validEmail.test(e.currentTarget.value)) {

                emailError.style.display = 'block';
                emailError.textContent = 'This email is not valid!';
                e.currentTarget.classList.remove('valid');
                e.currentTarget.classList.add('invalid');

            } else {
                emailError.style.display = 'none';
                e.currentTarget.classList.remove('invalid');
                e.currentTarget.classList.add('valid');
            }

        } else if (e.currentTarget.id === 'password') {

            if (e.currentTarget.value.length === 0) {

                passwordError.style.display = 'block';
                passwordError.textContent = 'Password is required!';
                e.currentTarget.classList.remove('valid');
                e.currentTarget.classList.add('invalid');

            } else if (!preventWhitespace.test(e.currentTarget.value)) {

                passwordError.style.display = 'block';
                passwordError.textContent = 'No whitespaces allowed!';
                e.currentTarget.classList.remove('valid');
                e.currentTarget.classList.add('invalid');

            } else if (e.currentTarget.value.length < 5) {
                
                passwordError.style.display = 'block';
                passwordError.textContent = 'Password is too short!';
                e.currentTarget.classList.remove('valid');
                e.currentTarget.classList.add('invalid');
                
            } else if (e.currentTarget.value !== refToSecondPass.value) {

                passwordError.style.display = 'none';
                repassError.style.display = 'block';
                repassError.textContent = 'Passwords don\'t match!';
                e.currentTarget.classList.remove('valid');
                e.currentTarget.classList.add('invalid');
                refToSecondPass.classList.remove('valid');
                refToSecondPass.classList.add('invalid');

            } else if (e.currentTarget.value === refToSecondPass.value) {

                passwordError.style.display = 'none';
                repassError.style.display = 'none';
                e.currentTarget.classList.remove('invalid');
                e.currentTarget.classList.add('valid');
                refToSecondPass.classList.remove('invalid');
                refToSecondPass.classList.add('valid');
            }

        } else if (e.currentTarget.id === 'repass') {
            if (e.currentTarget.value.length === 0 ||
                !preventWhitespace.test(e.currentTarget.value) ||
                e.currentTarget.value !== refToFirstPass.value) {

                repassError.style.display = 'block';
                repassError.textContent = 'Passwords don\'t match!';
                e.currentTarget.classList.remove('valid');
                e.currentTarget.classList.add('invalid');
                refToFirstPass.classList.remove('valid');
                refToFirstPass.classList.add('invalid');

            } else {
                repassError.style.display = 'none';
                passwordError.style.display = 'none';
                e.currentTarget.classList.remove('invalid');
                e.currentTarget.classList.add('valid');
                refToFirstPass.classList.remove('invalid');
                refToFirstPass.classList.add('valid');
            }


        } else if (e.currentTarget.id === 'number') {

            if (!validNumber.test(e.currentTarget.value)) {

                numberError.style.display = 'block';
                e.currentTarget.classList.remove('valid');
                e.currentTarget.classList.add('invalid');
            } else {
                numberError.style.display = 'none';
                e.currentTarget.classList.remove('invalid');
                e.currentTarget.classList.add('valid');
            }
        }
        if (usernameError.style.display === 'none' && emailError.style.display === 'none' && passwordError.style.display === 'none' && repassError.style.display === 'none' && numberError.style.display === 'none') {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    return (
        <div id="register">
            <main>
                <div className="register-box">
                    <h2>Register</h2>
                    <form method="POST" onSubmit={onRegisterSubmit}>
                        <label htmlFor="username">Username
                            <br />
                            <input type="text" name="username" id="username" required minLength="3" maxLength="20" value={formValues.username} onChange={onFormValuesChange} onBlur={onBlurValidate} />
                        </label>
                        <p className="error">
                            ...
                        </p>
                        <br />
                        <label htmlFor="email">Email
                            <br />
                            <input type="text" name="email" id="email" required value={formValues.email} onChange={onFormValuesChange} onBlur={onBlurValidate} />
                        </label>
                        <p className="error">
                            ...
                        </p>
                        <br />
                        <label htmlFor="password">Password
                            <br />
                            <input type="password" name="password" id="password" required minLength="5" value={formValues.password} className="password" onChange={onFormValuesChange} onBlur={onBlurValidate} />
                        </label>
                        <span className="pass-text"><i className="fa-solid fa-lock" onClick={toggleVisibility}></i></span>
                        <p className="error">
                            ...
                        </p>
                        <br />
                        <label htmlFor="repass">Confirm Password
                            <br />
                            <input type="password" name="repass" id="repass" required minLength="5" value={formValues.repass} className="password" onChange={onFormValuesChange} onBlur={onBlurValidate} />
                        </label>
                        <span className="pass-text"><i className="fa-solid fa-lock" onClick={toggleVisibility}></i></span>
                        <p className="error">
                            ...
                        </p>
                        <br />
                        <label htmlFor="number">Phone number
                            <br />
                            <input type="text" name="number" inputMode="numeric" id="number" minLength="10" maxLength="13" required value={formValues.number} onChange={onFormValuesChange} onBlur={onBlurValidate} />
                        </label>
                        <p className="error">
                            This phone number is not valid!
                        </p>
                        <p>
                            <input type="submit" value="Register" disabled={!isValid} className={isValid === false ? 'disabled' : ''} />
                        </p>
                    </form>
                    <h4>You already have an account? <Link to="/users/login" className="link">Login here</Link></h4>
                </div>
            </main>
        </div>
    );
};