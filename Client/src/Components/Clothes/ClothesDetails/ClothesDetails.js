import { Link, useParams } from "react-router-dom";
import Comments from "../../Comments/Comments";
import { useEffect, useState } from "react";
import { getClothesDetails } from "../../../Services/clothesService";
import { addToCart, addToFavorites, getUserCart, getUserFavorites, removeFromFavorites } from "../../../Services/authService";

export default function ClothesDetails() {

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

    const [clothes, setProduct] = useState({});

    const [favorites, setFavorites] = useState([]);

    const [cart, setCart] = useState([]);

    const cartChecker = cart.map(prod => prod._id).includes(id);

    const [isInCart, setIsInCart] = useState(cartChecker);

    const favoritesChecker = favorites.map(fav => fav._id).includes(id);

    const [isInFavorites, setIsInFavorites] = useState(favoritesChecker);

    useEffect(() => {
        getClothesDetails(id).then(result => {
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
        <div id="clothes-details">
            <main>
                <Link to="/clothes" className="back-a">
                    <button type="button" className="back"><i className="fa-solid fa-arrow-left"></i></button>
                </Link>
                <div className="product-card">
                    <img src={clothes.imgUrl} alt="clothes" />
                    <h3>{clothes.title}</h3>
                    <p>{clothes.description}</p>
                    <p>Type: {clothes.clothingType}</p>
                    <p>For: {clothes.targetCustomers}</p>
                    <p>Price: {clothes.price} BGN</p>
                    {clothes.availability && (
                        (isInCart && (
                            <button type="button" onClick={onAddToCartClick}><i className="fa-solid fa-cart-shopping"></i> Add to cart</button>
                        ))
                        || (!isInCart && (
                            <h4>Product is in your cart! <i className="fa-regular fa-smile"></i> </h4>
                        ))
                    )}
                    {!clothes.availability && (
                            <h4>Product is unavailable for now! <i className="fa-regular fa-frown"></i> </h4>
                    )}
                    {clothes._id !== undefined && (
                        isInFavorites && (
                            <button type="button" className="remove-favorites" onClick={onRemoveFromFavClick}><i className="fa-solid fa-heart"></i> Remove from favorites</button>
                        )
                    )}
                    {clothes._id !== undefined && (
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