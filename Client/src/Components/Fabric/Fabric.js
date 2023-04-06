import { useEffect, useState } from "react";
import UniversalProductCard from "../UniversalProductCard/UniversalProductCard";
import FabricForm from "./FabricForm/FabricForm";
import { getFabricProducts } from "../../Services/fabricService";

export default function Fabric() {

    const [fabrics, setFabrics] = useState([]);

    useEffect(() => {
        getFabricProducts().then(result => { setFabrics(result) });
    }, []);

    return (
        <div id="fabric">
            <FabricForm setFabrics={setFabrics} />
            <main>
                {/* IF ANY PRODUCTS */}
                {fabrics.map(prod => <UniversalProductCard key={prod._id} {...prod} urlPath="/fabric" />)}
                {/* ELSE: Show sth */}
                {fabrics.length === 0 && (
                    <h5>There is nothing to show!</h5>
                )}
            </main>
        </div >
    );
};