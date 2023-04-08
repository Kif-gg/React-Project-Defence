import { useState } from "react";
import { getStampsProducts } from "../../../Services/stampService";

export default function StampsForm(props) {

    const [formValues, setFormValues] = useState({
        search: '',
        'stone-type': 'all',
        'stamp-design': 'all',
        'stamp-color': 'all',
        sort: 'price',
        direction: 'ascending'
    });

    const onFormValuesChange = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        getStampsProducts(formValues).then(result => { props.setStamps(result) }).catch(err => alert(err.message));
    };

    return (
        <form method="POST" onSubmit={onFormSubmit}>
            <div className="search-box">
                <label htmlFor="search">Search...</label><input type="text" name="search" id="search" value={formValues.search} onChange={onFormValuesChange} /><button type="submit"><i
                    className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className="filter-box">
                <div>
                    <i className="fa-solid fa-filter"></i>
                    <label htmlFor="stone-type">Stone type</label>
                    <select name="stone-type" id="stone-type" value={formValues['stone-type']} onChange={onFormValuesChange}>
                        <option value="all">All</option>
                        <option value="crystal">Crystal</option>
                        <option value="metal">Metal</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="stamp-design">Select stamp design</label>
                    <select name="stamp-design" id="stamp-design" value={formValues['stamp-design']} onChange={onFormValuesChange}>
                        <option value="all">All</option>
                        <option value="animals">Animals</option>
                        <option value="animated">Animated heroes</option>
                        <option value="text">Text</option>
                        <option value="shapes">Shapes</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="stamp-color">Select stone color</label>
                    <select name="stamp-color" id="stamp-color" value={formValues['stone-color']} onChange={onFormValuesChange}>
                        <option value="all">All</option>
                        <option value="mixed">Mixed</option>
                        <option value="black">Black</option>
                        <option value="blue">Blue</option>
                        <option value="chameleon">Chameleon</option>
                        <option value="green">Green</option>
                        <option value="orange">Orange</option>
                        <option value="purple">Purple</option>
                        <option value="red">Red</option>
                        <option value="turquoise">Turquoise</option>
                        <option value="white">White</option>
                        <option value="yellow">Yellow</option>
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