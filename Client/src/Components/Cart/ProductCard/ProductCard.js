import { useState } from "react";
import { removeFromCart } from "../../../Services/authService";

export default function ProductCard({ imageUrl, title, price, setTotalCost, totalCost, _id, cart }) {

    const [quantity, setQuantity] = useState(1);

    const onPlusClick = (e) => {
        if (quantity >= 50) {
            setQuantity(50);
            e.target.disabled = true;
        } else {
            setQuantity(quantity + 1);
            setTotalCost(totalCost + price);
        }
    };

    const onMinusClick = (e) => {
        if (quantity - 1 === 0) {
            e.target.disabled = true;
        } else {
            setQuantity(quantity - 1);
            setTotalCost(totalCost - price);
        }
    };

    const onRemove = () => {
        if (window.confirm('Are you sure you want to remove this item from your cart?')) {
            removeFromCart(_id).then(setTotalCost(totalCost - (price * (quantity - 1))));
            cart.splice(cart.findIndex(prod => prod._id === _id), 1);
        }
    };

    return (
        <div className="product-card">
            <img src={imageUrl} alt="" />
            <p>{title}</p>
            <p>Price: ${price} BGN</p>
            <label>Quantity</label>
            <br />
            <button type="button" className="quantity-up" onClick={onPlusClick}><i className="fa-solid fa-circle-plus"></i></button>
            <span className="quantity">{quantity}</span>
            <button type="button" className="quantity-down" onClick={onMinusClick}><i className="fa-solid fa-circle-minus"></i></button>
            <br />
            <button type="button" className="remove" onClick={onRemove}>Remove item</button>
        </div>
    );
};