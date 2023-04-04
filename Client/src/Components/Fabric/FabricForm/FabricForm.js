import { useState } from "react";

export default function FabricForm() {

    const [formValues, setFormValues] = useState({
        search: '',
        fabricType: 'all',
        extras: 'all',
        sort: 'price',
        direction: 'ascending'
    });

    const onFormValuesChange = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form action="" method="GET" onSubmit={onFormSubmit}>
            <div className="search-box">
                <label htmlFor="search">Search...</label>
                <input type="text" name="search" id="search" value={formValues.search} onChange={onFormValuesChange} />
                <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className="filter-box">
                <div>
                    <i className="fa-solid fa-filter"></i>
                    <label htmlFor="fabric-type">Fabric type</label>
                    <select name="fabric-type" id="fabric-type" value={formValues.fabricType} onChange={onFormValuesChange}>
                        <option value="all">All</option>
                        <option value="chiffon">Chiffon</option>
                        <option value="georgette">Georgette</option>
                        <option value="lace">Lace</option>
                        <option value="lycra">Lycra</option>
                        <option value="organza">Organza</option>
                        <option value="pleat">Pleat</option>
                        <option value="plush">Plush</option>
                        <option value="satin">Satin</option>
                        <option value="silk">Silk</option>
                        <option value="taffeta">Taffeta</option>
                        <option value="tulle">Tulle</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="extras">Extras on fabric</label>
                    <select name="extras" id="extras" value={formValues.extras} onChange={onFormValuesChange}>
                        <option value="all">Not specified</option>
                        <option value="none">None</option>
                        <option value="brocade">Brocade</option>
                        <option value="sequins">Sequins</option>
                        <option value="swarovski-stones">Swarovski stones</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sort">Sort products by</label>
                    <select name="sort" id="sort" value={formValues.sort} onChange={onFormValuesChange}>
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sort-direction">Way of sorting</label>
                    <select name="direction" id="sort-direction" value={formValues.direction} onChange={onFormValuesChange}>
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </div>
            </div>
        </form>
    );
};