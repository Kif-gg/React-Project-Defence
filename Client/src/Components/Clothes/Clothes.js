import { useEffect, useState } from "react";
import UniversalProductCard from "../UniversalProductCard/UniversalProductCard";
import ClothesForm from "./ClothesForm/ClothesForm";
import { getClothesProducts } from "../../Services/clothesService";

export default function Clothes() {

    const [clothes, setClothes] = useState([]);

    useEffect(() => {
        getClothesProducts().then(result => setClothes(result));
    }, []);

    return (
        <div>
            <ClothesForm />
            <main>
                {clothes.map(prod => <UniversalProductCard key={prod._id} {...prod} urlPath="/clothes" />)}

                {clothes.length === 0 && (
                    <h3>There is nothing to show yet!</h3>
                )}
            </main>
        </div>
    );
};