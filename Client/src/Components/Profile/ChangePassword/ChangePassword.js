import { useState } from "react";
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

        const firstErrEl = document.getElementsByClassName('error')[0];
        const secondErrEl = document.getElementsByClassName('error')[1];
        const preventWhitespace = /^[^\s]{1,20}$/i;

        if (e.currentTarget.id === 'current') {
            if (e.currentTarget.value.length === 0) {
                firstErrEl.style.display = 'block';
                e.currentTarget.classList.add('invalid');

            } else {
                firstErrEl.style.display = 'none';
                e.currentTarget.classList.remove('invalid');
            }
        } else if (e.currentTarget.id === 'new') {

            if (e.currentTarget.value.length === 0) {
                secondErrEl.style.display = 'block';
                secondErrEl.textContent = 'New password is required!';
                e.currentTarget.classList.remove('valid');
                e.currentTarget.classList.add('invalid');

            } else if (!preventWhitespace.test(e.currentTarget.value)) {
                secondErrEl.style.display = 'block';
                secondErrEl.textContent = 'No whitespaces allowed!';
                e.currentTarget.classList.remove('valid');
                e.currentTarget.classList.add('invalid');

            } else if (e.currentTarget.value.length < 5) {
                secondErrEl.style.display = 'block';
                secondErrEl.textContent = 'New password is too short!';
                e.currentTarget.classList.remove('valid');
                e.currentTarget.classList.add('invalid');

            } else {
                secondErrEl.style.display = 'none';
                e.currentTarget.classList.remove('invalid');
                e.currentTarget.classList.add('valid');
            }
        }

        if (firstErrEl.style.display === 'none' && secondErrEl.style.display === 'none') {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    return (
        <form method="POST" onSubmit={onEditSubmit}>
            <label htmlFor="current">Current password
                <br />
                <input type="password" name="current" id="current" required className="password" onBlur={onBlurValidate} />
            </label>
            <span className="pass-text"><i className="fa-solid fa-lock" onClick={toggleVisibility}></i></span>
            <p className="error">
                Current password is required if you want to change it!
            </p>
            <br />
            <label htmlFor="new">New password
                <br />
                <input type="password" name="new" id="new" required className="password" onBlur={onBlurValidate} minLength="5" />
            </label>
            <span className="pass-text"><i className="fa-solid fa-lock" onClick={toggleVisibility}></i></span>
            <p className="error">
                ...
            </p>
            <p>
                <input type="submit" value="Change password" disabled={!isValid} className={isValid === false ? 'disabled' : ''} />
            </p>
            <button type="button" className="cancel" onClick={cancelEdit}>Cancel</button>
        </form>
    );
};