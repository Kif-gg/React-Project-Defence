import { useState } from "react";
import { getClothesProducts } from "../../../Services/clothesService";

export default function ClothesForm(props) {

    const [formValues, setFormValues] = useState({
        search: '',
        'clothes-type': 'all',
        'target-customers': 'all',
        sort: 'price',
        direction: 'ascending'
    });

    const onFormValuesChange = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        getClothesProducts(formValues).then(result => { props.setClothes(result) }).catch(err => alert(err.message));
    };

    return (
        <form method="POST" onSubmit={onFormSubmit}>
            <div className="search-box">
                <label htmlFor="search">Search...</label><input type="text" name="search" id="search" value={formValues.search} onChange={onFormValuesChange} /><button
                    type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className="filter-box">
                <div>
                    <i className="fa-solid fa-filter"></i>
                    <label htmlFor="clothes-type">Select clothes type</label>
                    <select name="clothes-type" id="clothes-type" value={formValues['clothes-type']} onChange={onFormValuesChange}>
                        <option value="all">All</option>
                        <option value="bridal-dresses">Bridal dresses</option>
                        <option value="jersey">Jersey</option>
                        <option value="muslim">Muslim wear</option>
                        <option value="pants">Pants</option>
                        <option value="prom-dresses">Prom dresses</option>
                        <option value="sportswear">Sportswear</option>
                        <option value="t-shirts">T-shirts</option>
                        <option value="underwear">Underwear</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="target-customers">For who</label>
                    <select name="target-customers" id="target-customers" value={formValues['target-customers']} onChange={onFormValuesChange}>
                        <option value="all">All</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="children">Children</option>
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