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
        <div>
            <StampsForm />
            <main>
                {stamps.map(prod => <UniversalProductCard key={prod._id} {...prod} urlPath="/stamps" />)}

                {stamps.length === 0 && (
                    <h3>There is nothing to show yet!</h3>
                )}
            </main>
        </div>
    );
};