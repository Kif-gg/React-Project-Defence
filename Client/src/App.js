import { Routes, Route } from "react-router-dom";

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



function App() {
    return (
        <div>
            {/* HEADER */}
            <Header />
            {/* MAIN CONTENT */}
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
            <Footer />
        </div>
    );
}

export default App;