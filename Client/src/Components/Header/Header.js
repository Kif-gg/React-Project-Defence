import logo from './Assets/favicon.jpg';
import name from './Assets/company-name.jpg';

import { Link } from "react-router-dom"
import { useContext } from "react";

import { AuthContext } from "../../Contexts/AuthContext";

export default function Header() {

    const { isAuthenticated } = useContext(AuthContext)

    return (
        <div id='header'>
            <header>
                <div className="logo">
                    <img src={logo} alt="logo" />
                    <h1>Fashion and clothing for everyone</h1>
                    <img src={name} alt="name" />
                </div>
                <nav>
                    <ul>
                        <div className="left">
                            <li><Link to="/">Home page</Link></li>
                            <li><Link to="/fabric">Fabric</Link></li>
                            <li><Link to="/stones">Stones for stamps</Link></li>
                            <li><Link to="/stamps">Stamp designs</Link></li>
                            <li><Link to="/clothes">Clothes</Link></li>
                            <li><Link to="/about">About us</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                        </div>
                        {/* LOGGED USERS */}
                        {isAuthenticated && (
                            <div className="right">
                                <li><Link to="/users/profile">Profile</Link></li>
                                <li><Link to="/cart">Cart</Link></li>
                                <li><Link to="/users/logout">Log out</Link></li>
                            </div>
                        )}
                        {/* GUESTS */}
                        {!isAuthenticated && (
                            <div className="right">
                                <li><Link to="/users/login">Log in</Link></li>
                                <li><Link to="/users/register">Register</Link></li>
                            </div>
                        )}
                    </ul>
                </nav>
            </header >
        </div>
    );
};