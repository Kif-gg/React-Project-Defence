import { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";
import { getUserCart } from "../../Services/authService";
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

    return (
        <div id="cart">
            <main>
                <h2>Cart</h2>
                <section>
                    {cart.map(product => <ProductCard key={product._id} setCart={setCart} cart={cart} setTotalCost={setTotalCost} totalCost={totalCost} {...product} />)}
                </section>
                <p className="total">Total cost: {Number(total).toFixed(2)} BGN</p>
                <button type="button" className="order">Make order</button>
            </main>
        </div>
    )
};