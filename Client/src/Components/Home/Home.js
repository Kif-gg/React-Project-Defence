import { useEffect, useState } from "react";
import UniversalProductCard from "../UniversalProductCard/UniversalProductCard";
import { getHomeProducts } from "../../Services/homeService";

export default function Home() {

    const [homeProducts, setHomeProducts] = useState([]);

    useEffect(() => {
        getHomeProducts().then(result => { setHomeProducts(result) });
    }, []);

    return (
        <main>
            <h2>Check out these 3 random products with higher average rating!</h2>
            <article className="top-3">
                {/* 3 CARDS */}
                {homeProducts.map(prod => {
                    let urlPath = '';
                    if (!!prod.fabricType) {
                        urlPath = '/fabric';
                    } else if (!!prod.stoneShape) {
                        urlPath = '/stones';
                    } else if (!!prod.stampDesign) {
                        urlPath = '/stamps';
                    } else if (!!prod.targetCustomers) {
                        urlPath = '/clothes';
                    }

                    return <UniversalProductCard key={prod._id} {...prod} urlPath={urlPath} />
                })}

                {homeProducts.length === 0 && (
                    <h3>There is nothing to show yet!</h3>
                )}
            </article>
        </main>
    );
};