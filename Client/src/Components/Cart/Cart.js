import ProductCard from "./ProductCard/ProductCard";

export default function Cart() {
    return (
        <div id="cart">
            <main>
                <h2>Cart</h2>
                <section>
                    <ProductCard />
                </section>
                <p className="total">Total cost: BGN</p>
                <button type="button" className="order">Make order</button>
            </main>
        </div>
    );
};