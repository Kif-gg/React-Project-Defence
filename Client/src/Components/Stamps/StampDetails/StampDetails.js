import { Link, useNavigate, useParams } from "react-router-dom";
import Comments from "../../Comments/Comments";
import { useContext, useEffect, useState } from "react";
import { getStampDetails } from "../../../Services/stampService";
import { addToCart, addToFavorites, getUserCart, getUserFavorites, removeFromFavorites } from "../../../Services/authService";
import { AuthContext } from "../../../Contexts/AuthContext";


export default function StampDetails() {

    const { userId } = useContext(AuthContext);

    const navigate = useNavigate();

    const { id } = useParams();

    const onAddToFavClick = () => {
        addToFavorites().then(setIsInFavorites(true)).catch(err => alert(err));
    };

    const onRemoveFromFavClick = () => {
        removeFromFavorites().then(setIsInFavorites(false)).catch(err => alert(err));
    };

    const onAddToCartClick = () => {
        addToCart().then(setIsInCart(true)).catch(err => alert(err));
    };

    const [stamp, setProduct] = useState({});

    const [favorites, setFavorites] = useState([]);

    const [cart, setCart] = useState([]);

    const cartChecker = cart.map(prod => prod._id).includes(id);

    const [isInCart, setIsInCart] = useState(cartChecker);

    const favoritesChecker = favorites.map(fav => fav._id).includes(id);

    const [isInFavorites, setIsInFavorites] = useState(favoritesChecker);

    useEffect(() => {
        getStampDetails(id).then(result => {
            if (!!result === false) {
                navigate('/NOT_FOUND');
            } else if (result.reviews !== undefined) {
                setProduct(result);
            }
        }).catch(err => alert(err.message));
    }, [id, navigate]);

    useEffect(() => {
        if (!!userId) {
            getUserCart().then(result => {
                setCart(result);
            }).catch(err => alert(err.message));
        }
        setIsInCart(cartChecker);
    }, [cartChecker, userId]);

    useEffect(() => {
        if (!!userId) {
            getUserFavorites().then(result => {
                setFavorites(result);
            }).catch(err => alert(err.message));
        }
        setIsInFavorites(favoritesChecker);
    }, [favoritesChecker, cartChecker, userId]);

    return (
        <div id="stamps-details">
            <main>
                <Link to="/stamps" className="back-a">
                    <button type="button" className="back"><i className="fa-solid fa-arrow-left"></i></button>
                </Link>
                <div className="product-card">
                    <img src={stamp.imageUrl} alt="stamps" />
                    <h3>{stamp.title}</h3>
                    <p>{stamp.description}</p>
                    <p>Stone type: {stamp.stoneType}</p>
                    <p>Stamp design: {stamp.stampDesign}</p>
                    <p>Color: {stamp.stoneColor}</p>
                    <p>Price: {stamp.price} BGN</p>
                    {stamp.availability ? <p>In stock</p> : <p>Out of stock</p>}
                    <p><span className="stars"><i className="fa-solid fa-star"></i></span> 4.7 stars from 100 users</p>
                    {(stamp.availability && !!userId) && (
                        (!isInCart && (
                            <button type="button" onClick={onAddToCartClick}><i className="fa-solid fa-cart-shopping"></i> Add to cart</button>
                        ))
                        || (isInCart && (
                            <h4>Product is in your cart! <i className="fa-regular fa-smile"></i> </h4>
                        ))
                    )}
                    {(!stamp.availability && !!userId) && (
                        <h4>Product is unavailable for now! <i className="fa-regular fa-frown"></i> </h4>
                    )}
                    {(stamp._id !== undefined && !!userId) && (
                        isInFavorites && (
                            <button type="button" className="remove-favorites" onClick={onRemoveFromFavClick}><i className="fa-solid fa-heart"></i> Remove from favorites</button>
                        )
                    )}
                    {(stamp._id !== undefined && !!userId) && (
                        !isInFavorites && (
                            <button type="button" className="add-favorites" onClick={onAddToFavClick}><i className="fa-regular fa-heart"></i> Add to favorites</button>
                        )
                    )}
                </div>
                <Comments reviews={stamp.reviews} setProduct={setProduct} />
            </main>
        </div>
    );
};