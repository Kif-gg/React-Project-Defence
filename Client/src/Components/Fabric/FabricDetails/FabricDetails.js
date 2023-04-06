import { Link, useParams } from "react-router-dom";
import Comments from "../../Comments/Comments";
import { useEffect, useState } from "react";
import { getFabricDetails } from "../../../Services/fabricService";
import { getUserFavorites, addToFavorites, removeFromFavorites, getUserCart, addToCart } from "../../../Services/authService";

export default function FabricDetails() {

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

    const [fabric, setProduct] = useState({});

    const [favorites, setFavorites] = useState([]);

    const [cart, setCart] = useState([]);

    const cartChecker = cart.map(prod => prod._id).includes(id);

    const [isInCart, setIsInCart] = useState(cartChecker);

    const favoritesChecker = favorites.map(fav => fav._id).includes(id);

    const [isInFavorites, setIsInFavorites] = useState(favoritesChecker);
    
    useEffect(() => {
        getFabricDetails(id).then(result => {
            if (result.reviews !== undefined) {
                console.log(result.reviews);
                setProduct(result);
            }
        });
    }, [id]);
    
    useEffect(() => {
        getUserCart().then(result => {
            setCart(result);
        });
        setIsInCart(cartChecker);
    }, [cartChecker]);
    
    useEffect(() => {
        getUserFavorites().then(result => {
            setFavorites(result);
        });
        setIsInFavorites(favoritesChecker);
    }, [favoritesChecker, cartChecker]);

    return (
        <div id="fabric-details">
            <main>
                <Link to="/fabric" className="back-a">
                    <button type="button" className="back"><i className="fa-solid fa-arrow-left"></i></button>
                </Link>
                <div className="product-card">
                    <img src={fabric.imageUrl} alt="" />
                    <h3>{fabric.title}</h3>
                    <p>{fabric.description}</p>
                    <p>Type: {fabric.fabricType}</p>
                    <p>Extras: {fabric.extras}</p>
                    <p>Price: {fabric.price} BGN</p>
                    {fabric.availability ? <p>In stock</p> : <p>Out of stock</p>}
                    <p><span className="stars"><i className="fa-solid fa-star"></i></span> {fabric.average} stars from {fabric.totalPeople} users</p>
                    {fabric.availability && (
                        (!isInCart && (
                            <button type="button" onClick={onAddToCartClick}><i className="fa-solid fa-cart-shopping"></i> Add to cart</button>
                        ))
                        || (isInCart && (
                            <h4>Product is in your cart! <i className="fa-regular fa-smile"></i> </h4>
                        ))
                    )}
                    {!fabric.availability && (
                        <h4>Product is unavailable for now! <i className="fa-regular fa-frown"></i> </h4>
                    )}
                    {fabric._id !== undefined && (
                        isInFavorites && (
                            <button type="button" className="remove-favorites" onClick={onRemoveFromFavClick}><i className="fa-solid fa-heart"></i> Remove from favorites</button>
                        )
                    )}
                    {fabric._id !== undefined && (
                        !isInFavorites && (
                            <button type="button" className="add-favorites" onClick={onAddToFavClick}><i className="fa-regular fa-heart"></i> Add to favorites</button>
                        )
                    )}
                </div>
                <Comments reviews={fabric.reviews} setProduct={setProduct} />
            </main>
        </div>
    );
};