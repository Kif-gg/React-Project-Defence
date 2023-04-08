import { Link, useNavigate, useParams } from "react-router-dom";
import Comments from "../../Comments/Comments";
import { useContext, useEffect, useState } from "react";
import { getClothesDetails } from "../../../Services/clothesService";
import { addToCart, addToFavorites, getUserCart, getUserFavorites, removeFromFavorites } from "../../../Services/authService";
import { AuthContext } from "../../../Contexts/AuthContext";


export default function ClothesDetails() {

    const { userId } = useContext(AuthContext);

    const navigate = useNavigate();

    const { id } = useParams();

    const onAddToFavClick = () => {
        addToFavorites().then(setIsInFavorites(true)).catch(err => console.log(err.message));
    };

    const onRemoveFromFavClick = () => {
        removeFromFavorites().then(setIsInFavorites(false)).catch(err => console.log(err.message));
    };

    const onAddToCartClick = () => {
        addToCart().then(setIsInCart(true)).catch(err => console.log(err.message));
    };

    const [clothes, setProduct] = useState({});

    const [favorites, setFavorites] = useState([]);

    const [cart, setCart] = useState([]);

    const cartChecker = cart.map(prod => prod._id).includes(id);

    const [isInCart, setIsInCart] = useState(cartChecker);

    const favoritesChecker = favorites.map(fav => fav._id).includes(id);

    const [isInFavorites, setIsInFavorites] = useState(favoritesChecker);

    useEffect(() => {
        getClothesDetails(id).then(result => {
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
        <div id="clothes-details">
            <main>
                <Link to="/clothes" className="back-a">
                    <button type="button" className="back"><i className="fa-solid fa-arrow-left"></i></button>
                </Link>
                <div className="product-card">
                    <img src={clothes.imageUrl} alt="clothes" />
                    <h3>{clothes.title}</h3>
                    <p>{clothes.description}</p>
                    <p>Type: {clothes.clothingType}</p>
                    <p>For: {clothes.targetCustomers}</p>
                    <p>Price: {clothes.price} BGN</p>
                    {clothes.availability ? <p>In stock</p> : <p>Out of stock</p>}
                    {(clothes.availability && !!userId) && (
                        (!isInCart && (
                            <button type="button" onClick={onAddToCartClick}><i className="fa-solid fa-cart-shopping"></i> Add to cart</button>
                        ))
                        || (isInCart && (
                            <h4>Product is in your cart! <i className="fa-regular fa-smile"></i> </h4>
                        ))
                    )}
                    {(!clothes.availability && !!userId) && (
                        <h4>Product is unavailable for now! <i className="fa-regular fa-frown"></i> </h4>
                    )}
                    {(clothes._id !== undefined && !!userId) && (
                        isInFavorites && (
                            <button type="button" className="remove-favorites" onClick={onRemoveFromFavClick}><i className="fa-solid fa-heart"></i> Remove from favorites</button>
                        )
                    )}
                    {(clothes._id !== undefined && !!userId) && (
                        !isInFavorites && (
                            <button type="button" className="add-favorites" onClick={onAddToFavClick}><i className="fa-regular fa-heart"></i> Add to favorites</button>
                        )
                    )}
                </div>
                <Comments reviews={clothes.reviews} setProduct={setProduct} />
            </main>
        </div>
    );
};