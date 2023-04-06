import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Fabric from "./Components/Fabric/Fabric";
import FabricDetails from "./Components/Fabric/FabricDetails/FabricDetails";
import Stones from "./Components/Stones/Stones";
import StonesDetails from "./Components/Stones/StonesDetails/StonesDetails";
import Stamps from "./Components/Stamps/Stamps";
import StampDetails from "./Components/Stamps/StampDetails/StampDetails";
import Clothes from "./Components/Clothes/Clothes";
import ClothesDetails from "./Components/Clothes/ClothesDetails/ClothesDetails";
import About from "./Components/About/About";
import FAQ from "./Components/FAQ/FAQ";
import Cart from "./Components/Cart/Cart";
import Profile from "./Components/Profile/Profile";
import Favorites from "./Components/Favorites/Favorites";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Logout from "./Components/Logout/Logout";

import { AuthContext } from "./Contexts/AuthContext";

import * as authService from "./Services/authService";

function App() {

    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        const obj = JSON.parse(localStorage.getItem('Authorization'));
        if (!!obj) {
            setUser(obj);
        } else {
            setUser({})
        }
    }, []);

    const onLoginSubmit = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        try {
            const result = await authService.login(data);
            localStorage.setItem('Authorization', JSON.stringify(result));
            setUser(result);
            setError('');
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    const onRegisterSubmit = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        try {
            const { confirmPassword, ...registerData } = data;

            if (confirmPassword === registerData.password) {
                throw new Error('Passwords don not match!');
            }
            const result = await authService.register(registerData);
            localStorage.setItem('Authorization', JSON.stringify(result));
            setUser(result);
            setError('');
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    const onLogout = async () => {
        authService.logout();
        localStorage.clear();
        setUser({});
    };

    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: user._id,
        username: user.username,
        email: user.email,
        token: user.accessToken,
        isAuthenticated: !!user.accessToken
    };

    return (
        <AuthContext.Provider value={contextValues}>
            <div id="app">
                {/* HEADER */}
                <Header />
                {/* MAIN CONTENT */}
                {!!error && (<div className="modal"><h1>{error}</h1></div>)}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/fabric" element={<Fabric />} />
                    <Route path="/fabric/:id" element={<FabricDetails />} />
                    <Route path="/stones" element={<Stones />} />
                    <Route path="/stones/:id" element={<StonesDetails />} />
                    <Route path="/stamps" element={<Stamps />} />
                    <Route path="/stamps/:id" element={<StampDetails />} />
                    <Route path="/clothes" element={<Clothes />} />
                    <Route path="/clothes/:id" element={<ClothesDetails />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/faq" element={<FAQ />} />
                    {/* USER ONLY */}
                    <Route path="/users/profile" element={<Profile />} />
                    <Route path="/users/profile/favorites" element={<Favorites />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/users/logout" element={<Logout />} />
                    {/* GUEST ONLY */}
                    <Route path="/users/login" element={<Login />} />
                    <Route path="/users/register" element={<Register />} />
                </Routes>
                {/* FOOTER */}
                <Footer id="footer" />
            </div>
        </AuthContext.Provider>
    );
}

export default App;