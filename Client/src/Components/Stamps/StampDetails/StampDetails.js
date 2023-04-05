import { Link, useParams } from "react-router-dom";
import Comments from "../../Comments/Comments";
import { useEffect, useState } from "react";
import { getStampDetails } from "../../../Services/stampService";

export default function StampDetails() {

    const { id } = useParams();

    const [stamp, setStamp] = useState({});

    useEffect(() => {
        getStampDetails(id).then(result => setStamp(result));
    }, [id]);

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
                    <p>{stamp.stoneType}</p>
                    <p>{stamp.stampDesign}</p>
                    <p>{stamp.stoneColor}</p>
                    <p>{stamp.price} BGN</p>
                    {stamp.availability ? <p>In stock</p> : <p>Out of stock</p>}
                    <p><span className="stars"><i className="fa-solid fa-star"></i></span> 4.7 stars from 100 users</p>
                    {stamp.availability && (
                        <button type="button"><i className="fa-solid fa-cart-shopping"></i> Add to cart</button>
                    )}
                    <button type="button" className="add-favorites"><i className="fa-regular fa-heart"></i> Add to favorites</button>
                </div>
                <Comments reviews={stamp.reviews} />
            </main>
        </div>
    );
};