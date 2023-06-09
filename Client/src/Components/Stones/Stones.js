import { useEffect, useState } from "react";
import UniversalProductCard from "../UniversalProductCard/UniversalProductCard";
import StonesForm from "./StonesForm/StonesForm";
import { getStonesProducts } from "../../Services/stonesService";

export default function Stones() {

    const [stones, setStones] = useState([]);

    useEffect(() => {
        getStonesProducts().then(result => setStones(result)).catch(err => alert(err.message))
    }, []);

    return (
        <div id="stones">
            <StonesForm setStones={setStones} />
            <main>
                {stones.map(prod => <UniversalProductCard key={prod._id} {...prod} urlPath="/stones" />)}

                {stones.length === 0 && (
                    <h5>There is nothing to show!</h5>
                )}
            </main>
        </div>
    );
};