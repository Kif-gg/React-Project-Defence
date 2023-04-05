import { Link, useParams } from "react-router-dom";
import Comments from "../../Comments/Comments";
import { useEffect, useState } from "react";
import { getClothesDetails } from "../../../Services/clothesService";

export default function ClothesDetails() {

    const { id } = useParams();

    const [clothes, setClothes] = useState({});

    useEffect(() => {
        getClothesDetails(id).then(result => setClothes(result));
    }, [id]);

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
                    <p>{clothes.clothingType}</p>
                    <p>{clothes.targetCustomers}</p>
                    <p>{clothes.price} BGN</p>
                    {clothes.availability ? <p>In stock</p> : <p>Out of stock</p>}
                    <p><span className="stars"><i className="fa-solid fa-star"></i></span> 4.7 stars from 100 users</p>
                    {clothes.availability && (
                        <button type="button"><i className="fa-solid fa-cart-shopping"></i> Add to cart</button>
                    )}
                    <button type="button" className="add-favorites"><i className="fa-regular fa-heart"></i> Add to favorites</button>
                </div>
                <Comments reviews={clothes.reviews} />
            </main>
        </div>
    );
};