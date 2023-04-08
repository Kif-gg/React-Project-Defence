import { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";
import { checkoutAndBuy, getUserCart } from "../../Services/authService";
import { AuthContext } from "../../Contexts/AuthContext";


export default function Cart() {

    const { userId } = useContext(AuthContext);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (!!userId) {
            getUserCart().then(result => {
                setCart(result);
            }).catch(setCart([]));
        }
    }, [userId]);

    let total = 0;

    if (cart[0] !== undefined) {
        for (let product of cart) {
            total += product.price;
        }
    }

    const [totalCost, setTotalCost] = useState(0);

    total += totalCost;

    const onCheckOutClick = () => {
        if (window.confirm('Are you sure you want to buy these products?')) {
            checkoutAndBuy().then(alert('Thank you for your purchase! :)'), setCart([])).catch(err => alert(err.message));
        }
    }

    return (
        <div id="cart">
            <main>
                <h2>Cart</h2>
                {cart.length > 0 && (
                    <div>
                        <section>
                            {cart.map(product => <ProductCard key={product._id} setCart={setCart} cart={cart} setTotalCost={setTotalCost} totalCost={totalCost} {...product} />)}
                        </section>
                        <p className="total">Total cost: {Number(total).toFixed(2)} BGN</p>
                        <button type="button" className="order" onClick={onCheckOutClick}>Make order</button>
                    </div>
                )}
                {cart.length === 0 && (
                    <h5>You haven't added anything to your cart yet!</h5>
                )}
            </main>
        </div>
    )
};