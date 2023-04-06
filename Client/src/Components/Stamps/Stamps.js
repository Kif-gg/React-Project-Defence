import StampsForm from "./StampsForm/StampsForm";
import UniversalProductCard from "../UniversalProductCard/UniversalProductCard";
import { useEffect, useState } from "react";
import { getStampsProducts } from "../../Services/stampService";

export default function Stamps() {

    const [stamps, setStamps] = useState([]);

    useEffect(() => {
        getStampsProducts().then(result => setStamps(result));
    }, []);

    return (
        <div id="stamps">
            <StampsForm setStamps={setStamps} />
            <main>
                {stamps.map(prod => <UniversalProductCard key={prod._id} {...prod} urlPath="/stamps" />)}

                {stamps.length === 0 && (
                    <h5>There is nothing to show!</h5>
                )}
            </main>
        </div>
    );
};