import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header>
            <div className="logo">
                <img src="../../Resources-images/favicon.jpg" alt="logo" />
                <h1>Fashion and clothing for everyone</h1>
                <img src="../../Resources-images/company-name.jpg" alt="name" />
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
                    <div className="right">
                        {/* LOGGED USERS */}
                        <li><Link to="/users/profile">Profile</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                        <li><Link to="/users/logout">Log out</Link></li>
                        {/* GUESTS */}
                        <li><Link to="/users/login">Log in</Link></li>
                        <li><Link to="/users/register">Register</Link></li>
                    </div>
                </ul>
            </nav>
        </header>
    );
};