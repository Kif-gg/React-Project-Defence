import { useEffect, useState } from "react";
import UniversalProductCard from "../UniversalProductCard/UniversalProductCard";
import { getUserFavorites } from "../../Services/authService.js";
import { Link } from "react-router-dom";

export default function Favorites() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getUserFavorites().then(result => setProducts(result));
    }, []);

    return (
        <div id="favorites">
            <Link to="/users/profile" className="back-a">
                <button type="button" className="back"><i className="fa-solid fa-arrow-left"></i></button>
            </Link>
            <main>
                {products.map(prod => {
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

                {products.length === 0 && (
                    <h5>You haven't added anything to your favorites yet!</h5>
                )}
            </main>
        </div>
    );
};