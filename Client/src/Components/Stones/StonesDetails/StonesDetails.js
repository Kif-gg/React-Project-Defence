import { Link, useNavigate, useParams } from "react-router-dom";
import Comments from "../../Comments/Comments";
import { useContext, useEffect, useState } from "react";
import { getStonesDetails } from "../../../Services/stonesService";
import { addToCart, addToFavorites, getUserCart, getUserFavorites, removeFromFavorites } from "../../../Services/authService";
import { AuthContext } from "../../../Contexts/AuthContext";


export default function StonesDetails() {

    const { userId } = useContext(AuthContext);
    
    const navigate = useNavigate();

    const { id } = useParams();

    const onAddToFavClick = () => {
        addToFavorites().then(setIsInFavorites(true)).catch(err => console.log(err));
    };

    const onRemoveFromFavClick = () => {
        removeFromFavorites().then(setIsInFavorites(false)).catch(err => console.log(err));
    };

    const onAddToCartClick = () => {
        addToCart().then(setIsInCart(true)).catch(err => console.log(err));
    };

    const [stones, setProduct] = useState({});

    const [favorites, setFavorites] = useState([]);

    const [cart, setCart] = useState([]);

    const cartChecker = cart.map(prod => prod._id).includes(id);

    const [isInCart, setIsInCart] = useState(cartChecker);

    const favoritesChecker = favorites.map(fav => fav._id).includes(id);

    const [isInFavorites, setIsInFavorites] = useState(favoritesChecker);

    useEffect(() => {
        getStonesDetails(id).then(result => {
            if (!!result === false) {
                navigate('/NOT_FOUND');
            } else if (result.reviews !== undefined) {
                setProduct(result);
            }
        });
    }, [id, navigate]);

    useEffect(() => {
        if (!!userId) {
            getUserCart().then(result => {
                setCart(result);
            });
        }
        setIsInCart(cartChecker);
    }, [cartChecker, userId]);

    useEffect(() => {
        if (!!userId) {
            getUserFavorites().then(result => {
                setFavorites(result);
            });
        }
        setIsInFavorites(favoritesChecker);
    }, [favoritesChecker, cartChecker, userId]);

    return (
        <div id="stones-details">
            <main>
                <Link to="/stones" className="back-a">
                    <button type="button" className="back"><i className="fa-solid fa-arrow-left"></i></button>
                </Link>
                <div className="product-card">
                    <img src={stones.imageUrl} alt="" />
                    <h3>{stones.title}</h3>
                    <p>{stones.description}</p>
                    <p>Type: {stones.stoneType}</p>
                    <p>Shape: {stones.stoneShape}</p>
                    <p>Size: {stones.stoneSize}</p>
                    <p>Color: {stones.stoneColor}</p>
                    <p>Price: {stones.price} BGN</p>
                    {stones.availability ? <p>In stock</p> : <p>Out of stock</p>}
                    <p><span className="stars"><i className="fa-solid fa-star"></i></span> 4.7 stars from 100 users</p>
                    {(stones.availability && !!userId) && (
                        (!isInCart && (
                            <button type="button" onClick={onAddToCartClick}><i className="fa-solid fa-cart-shopping"></i> Add to cart</button>
                        ))
                        || (isInCart && (
                            <h4>Product is in your cart! <i className="fa-regular fa-smile"></i> </h4>
                        ))
                    )}
                    {(!stones.availability && !!userId) && (
                        <h4>Product is unavailable for now! <i className="fa-regular fa-frown"></i> </h4>
                    )}
                    {(stones._id !== undefined && !!userId) && (
                        isInFavorites && (
                            <button type="button" className="remove-favorites" onClick={onRemoveFromFavClick}><i className="fa-solid fa-heart"></i> Remove from favorites</button>
                        )
                    )}
                    {(stones._id !== undefined && !!userId) && (
                        !isInFavorites && (
                            <button type="button" className="add-favorites" onClick={onAddToFavClick}><i className="fa-regular fa-heart"></i> Add to favorites</button>
                        )
                    )}
                </div>
                <Comments reviews={stones.reviews} setProduct={setProduct} />
            </main>
        </div>
    );
};