import { useNavigate } from "react-router-dom";
import { deleteUserProfile } from "../../../Services/authService";
import { AuthContext } from "../../../Contexts/AuthContext";
import { useContext } from "react";

export default function DeleteProfile({ setDeleteProfileMode }) {

    const { setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const onDeleteSubmit = (e) => {
        e.preventDefault();

        const result = Object.fromEntries(new FormData(e.target));

        if (window.confirm('Are you sure you want to delete your profile?') === true) {
            deleteUserProfile(result).then(
                localStorage.clear(),
                setUser({}),
                navigate('/users/login')
            ).catch(err => alert(err.message));
        };
    };

    const cancelDelete = () => {
        setDeleteProfileMode(false);
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

    const onBlurValidate = (e) => {
        const firstErrEl = document.getElementsByClassName('error')[0];

        if (e.currentTarget.value.length === 0) {
            firstErrEl.style.display = 'block';
            e.currentTarget.classList.add('invalid');
        } else {
            firstErrEl.style.display = 'none';
            e.currentTarget.classList.remove('invalid');
        }
    };

    return (
        <form method="POST" onSubmit={onDeleteSubmit}>
            <label htmlFor="password">Enter password
                <br />
                <input type="password" name="password" id="password" required onBlur={onBlurValidate} />
            </label>
            <span className="pass-text"><i className="fa-solid fa-lock" onClick={toggleVisibility}></i></span>
            <p className="error">
                Password is required!
            </p>
            <p>
                <input type="submit" value="Delete profile" />
            </p>
            <button type="button" className="cancel" onClick={cancelDelete}>Cancel</button>
        </form>
    );
};