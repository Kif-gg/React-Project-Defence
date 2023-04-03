import { Link } from "react-router-dom";

export default function UniversalProductCard({
    _id,
    imageUrl,
    title,
    average,
    totalPeople,
    urlPath
}) {
    return (
        <div className="product-card">
            <img src={imageUrl} alt="" />
            <p>{title}</p>
            <p><span className="stars"><i className="fa-solid fa-star"></i></span> {average} stars from {totalPeople} users</p>
            <Link to={`${urlPath}/${_id}`}><button className="details" type="button">Details</button></Link>
        </div>
    );
};