export default function ProductCard() {
    return (
        <div className="product-card">
            <img src="../../Resources-images/clothes.jpg" alt="clothes" />
            <p>Title</p>
            <p>Price BGN</p>
            <p>In or Out of Stock</p>
            <label>Quantity</label>
            <br />
            <button type="button" className="quantity-up"><i className="fa-solid fa-circle-plus"></i></button>
            <input type="text" name="quantity" size="4" inputMode="numeric" />
            <button type="button" className="quantity-down"><i className="fa-solid fa-circle-minus"></i></button>
            <br />
            <button type="button" className="remove">Remove item</button>
        </div>
    );
};