import { useEffect, useState } from "react";
import UniversalProductCard from "../UniversalProductCard/UniversalProductCard";
import StonesForm from "./StonesForm/StonesForm";
import { getStonesProducts } from "../../Services/stonesService";

export default function Stones() {

    const [stones, setStones] = useState([]);

    useEffect(() => {
        getStonesProducts().then(result => setStones(result))
    }, []);

    return (
        <div>
            <StonesForm />
            <main>
                {stones.map(prod => <UniversalProductCard key={prod._id} {...prod} urlPath="/stones" />)}

                {stones.length === 0 && (
                    <h3>There is nothing to show yet!</h3>
                )}
            </main>
        </div>
    );
};