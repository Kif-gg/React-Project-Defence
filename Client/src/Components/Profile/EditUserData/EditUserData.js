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
            }).catch(err => console.log(err));
        }
    };

    const cancelEdit = () => {
        setEditDataMode(false);
    }

    return (
        <form method="POST" onSubmit={onEditSubmit}>
            <label htmlFor="email">Email
                <br />
                <input type="text" name="email" id="email" required className="valid" value={formValues.email} onChange={onFormValuesChange} />
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
                <input type="text" name="number" id="number" required className="invalid" value={formValues.number} onChange={onFormValuesChange} />
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
            <button type="button" className="cancel" onClick={cancelEdit}>Cancel</button>
        </form>
    );
};