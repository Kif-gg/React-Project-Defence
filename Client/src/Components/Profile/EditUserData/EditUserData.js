import { useState } from "react";
import { editUserData } from "../../../Services/authService";

export default function EditUserData({ user, setEditDataMode, setUser }) {

    const [formValues, setFormValues] = useState({
        email: user.email,
        number: user.number
    });

    const onFormValuesChange = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    const onEditSubmit = (e) => {
        e.preventDefault();

        const result = Object.fromEntries(new FormData(e.target));

        if (window.confirm('Are you sure you want to update your profile data?') === true) {
            editUserData(result).then(res => {
                setUser({ ...result, username: user.username });
            }).catch(err => alert(err.message));
        }
    };

    const cancelEdit = () => {
        setEditDataMode(false);
    };

    const [isValid, setIsValid] = useState(true);

    const onBlurValidate = (e) => {
        const validEmail = /^([a-z]+)\w{2,20}[@][a-z_-]{3,20}[.][a-z]{2,5}$/i;
        const validNumber = /^(\+359|0)\d{9}$/;

        const firstErrEl = document.getElementsByClassName('error')[0];
        const secondErrEl = document.getElementsByClassName('error')[1];

        if (e.currentTarget.id === 'email') {

            if (e.currentTarget.value.length === 0) {
                firstErrEl.style.display = 'block';
                firstErrEl.textContent = 'Email is required!';
                e.currentTarget.classList.remove('valid');
                e.currentTarget.classList.add('invalid');

            } else if (!validEmail.test(e.currentTarget.value)) {
                firstErrEl.style.display = 'block';
                firstErrEl.textContent = 'Invalid email!';
                e.currentTarget.classList.remove('valid');
                e.currentTarget.classList.add('invalid');

            } else {
                firstErrEl.style.display = 'none';
                e.currentTarget.classList.remove('invalid');
                e.currentTarget.classList.add('valid');
            }

        } else if (e.currentTarget.id === 'number') {

            if (e.currentTarget.value.length === 0) {
                secondErrEl.style.display = 'block';
                secondErrEl.textContent = 'Number is required!';
                e.currentTarget.classList.remove('valid');
                e.currentTarget.classList.add('invalid');

            } else if (!validNumber.test(e.currentTarget.value)) {
                secondErrEl.style.display = 'block';
                secondErrEl.textContent = 'Invalid number!';
                e.currentTarget.classList.remove('valid');
                e.currentTarget.classList.add('invalid');

            } else {
                secondErrEl.style.display = 'none';
                e.currentTarget.classList.remove('invalid');
                e.currentTarget.classList.add('valid');
            }
        }

        if (firstErrEl.style.display !== 'block' && secondErrEl.style.display !== 'block') {
            setIsValid(true);
        } else {
            setIsValid(false);
        }

    };

    return (
        <form method="POST" onSubmit={onEditSubmit}>
            <label htmlFor="email">Email
                <br />
                <input type="text" name="email" id="email" required value={formValues.email} onChange={onFormValuesChange} onBlur={onBlurValidate} />
            </label>
            <p className="error">
                ...
            </p>
            <br />
            <label htmlFor="number">Phone number
                <br />
                <input type="text" name="number" id="number" required value={formValues.number} onChange={onFormValuesChange} onBlur={onBlurValidate} />
            </label>
            <p className="error">
                ...
            </p>
            <br />
            <p>
                <input type="submit" value="Update profile data" disabled={!isValid} className={isValid === false ? 'disabled' : ''} />
            </p>
            <button type="button" className="cancel" onClick={cancelEdit}>Cancel</button>
        </form>
    );
};