import { Link, useParams } from "react-router-dom";
import Comments from "../../Comments/Comments";
import { useEffect, useState } from "react";
import { getStampDetails } from "../../../Services/stampService";
import { addToCart, addToFavorites, getUserCart, getUserFavorites, removeFromFavorites } from "../../../Services/authService";

export default function StampDetails() {

    const { id } = useParams();

    const onAddToFavClick = () => {
        addToFavorites();
        setIsInFavorites(true);
    };

    const onRemoveFromFavClick = () => {
        removeFromFavorites();
        setIsInFavorites(false);
    };

    const onAddToCartClick = () => {
        addToCart();
        setIsInCart(true);
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
            setProduct(result);
        });
    }, [id]);

    useEffect(() => {
        getUserFavorites().then(result => {
            setFavorites(result);
        });
        setIsInFavorites(favoritesChecker);
    }, [favoritesChecker]);

    useEffect(() => {
        getUserCart().then(result => {
            setCart(result);
        });
        setIsInCart(cartChecker);
    }, [cartChecker]);

    return (
        <div id="stamps-details">
            <main>
                <Link to="/stamps" className="back-a">
                    <button type="button" className="back"><i className="fa-solid fa-arrow-left"></i></button>
                </Link>
                <div className="product-card">
                    <img src={stamp.imgUrl} alt="stamps" />
                    <h3>{stamp.title}</h3>
                    <p>{stamp.description}</p>
                    <p>Stone type: {stamp.stoneType}</p>
                    <p>Stamp design: {stamp.stampDesign}</p>
                    <p>Color: {stamp.stoneColor}</p>
                    <p>Price: {stamp.price} BGN</p>
                    {stamp.availability ? <p>In stock</p> : <p>Out of stock</p>}
                    <p><span className="stars"><i className="fa-solid fa-star"></i></span> 4.7 stars from 100 users</p>
                    {stamp.availability && (
                        (isInCart && (
                            <button type="button" onClick={onAddToCartClick}><i className="fa-solid fa-cart-shopping"></i> Add to cart</button>
                        ))
                        || (!isInCart && (
                            <h4>Product is in your cart! <i className="fa-regular fa-smile"></i> </h4>
                        ))
                    )}
                    {!stamp.availability && (
                            <h4>Product is unavailable for now! <i className="fa-regular fa-frown"></i> </h4>
                    )}
                    {stamp._id !== undefined && (
                        isInFavorites && (
                            <button type="button" className="remove-favorites" onClick={onRemoveFromFavClick}><i className="fa-solid fa-heart"></i> Remove from favorites</button>
                        )
                    )}
                    {stamp._id !== undefined && (
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