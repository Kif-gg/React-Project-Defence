import { useParams } from "react-router-dom";
import Comments from "../../Comments/Comments";
import { useEffect, useState } from "react";
import { getStonesDetails } from "../../../Services/stonesService";

export default function StonesDetails() {

    const { id } = useParams();

    const [stones, setStones] = useState({});

    useEffect(() => {
        getStonesDetails(id).then(result => setStones(result));
    }, [id]);

    return (
        <main>
            <a href="stones.html" className="back-a">
                <button type="button" className="back"><i className="fa-solid fa-arrow-left"></i></button>
            </a>
            <div className="stones-card">
                <img src={stones.imgUrl} alt="" />
                <h3>{stones.title}</h3>
                <p>{stones.description}</p>
                <p>{stones.stoneType}</p>
                <p>{stones.stoneShape}</p>
                <p>{stones.stoneSize}</p>
                <p>{stones.stoneColor}</p>
                <p>{stones.price}</p>
                {stones.availability ? <p>In stock</p> : <p>Out of stock</p>}
                <p><span className="stars"><i className="fa-solid fa-star"></i></span> 4.7 stars from 100 users</p>
                {stones.availability && (
                    <button type="button"><i className="fa-solid fa-cart-shopping"></i> Add to cart</button>
                )}
                <button type="button" className="remove-favorites"><i className="fa-solid fa-heart"></i> Remove from favorites</button>
            </div>
            <Comments reviews={stones.reviews} />
        </main>
    );
};