import { useParams } from "react-router-dom";
import Comments from "../../Comments/Comments";
import { useEffect, useState } from "react";
import { getFabricDetails } from "../../../Services/fabricService";

export default function FabricDetails() {

    const { id } = useParams();

    const [fabric, setFabric] = useState({});

    useEffect(() => {
        getFabricDetails(id).then(result => setFabric(result));
    }, [id]);

    return (
        <main>
            <a href="fabric.html" className="back-a">
                <button type="button" className="back"><i className="fa-solid fa-arrow-left"></i></button>
            </a>
            <div className="fabric-card">
                <img src={fabric.imageUrl} alt="" />
                <h3>{fabric.title}</h3>
                <p>{fabric.description}</p>
                <p>{fabric.fabricType}</p>
                <p>{fabric.extras}</p>
                <p>{fabric.price} BGN</p>
                {fabric.availability ? <p>In stock</p> : <p>Out of stock</p>}
                <p><span className="stars"><i className="fa-solid fa-star"></i></span> {fabric.average} stars from {fabric.totalPeople} users</p>
                {fabric.availability && (
                    <button type="button"><i className="fa-solid fa-cart-shopping"></i> Add to cart</button>
                )}
                <button type="button" className="add-favorites"><i className="fa-regular fa-heart"></i> Add to favorites</button>
            </div>
            <Comments reviews={fabric.reviews} />
        </main>
    );
};