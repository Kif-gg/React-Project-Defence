import { useEffect, useState } from "react";
import UniversalProductCard from "../UniversalProductCard/UniversalProductCard";
import ClothesForm from "./ClothesForm/ClothesForm";
import { getClothesProducts } from "../../Services/clothesService";

export default function Clothes() {

    const [clothes, setClothes] = useState([]);

    useEffect(() => {
        getClothesProducts().then(result => setClothes(result)).catch(err => alert(err.message));
    }, []);

    return (
        <div id="clothes">
            <ClothesForm setClothes={setClothes} />
            <main>
                {clothes.map(prod => <UniversalProductCard key={prod._id} {...prod} urlPath="/clothes" />)}

                {clothes.length === 0 && (
                    <h5>There is nothing to show!</h5>
                )}
            </main>
        </div>
    );
};