import { useState } from "react";
import { getStonesProducts } from "../../../Services/stonesService";

export default function StonesForm(props) {

    const [formValues, setFormValues] = useState({
        search: '',
        'stone-type': 'all',
        'stone-shape': 'all',
        'stone-size': 'all',
        'stone-color': 'all',
        sort: 'price',
        direction: 'ascending'
    });

    const onFormValuesChange = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        getStonesProducts(formValues).then(result => { props.setStones(result) });
    };

    return (
        <form action="" onSubmit={onFormSubmit}>
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
                    <label htmlFor="stone-shape">Stone shape</label>
                    <select name="stone-shape" id="stone-shape" value={formValues['stone-shape']} onChange={onFormValuesChange}>
                        <option value="all">All</option>
                        <option value="circle">Circle</option>
                        <option value="rectangle">Rectangle</option>
                        <option value="square">Square</option>
                        <option value="triangle">Triangle</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="stone-size">Stone size</label>
                    <select name="stone-size" id="stone-size" value={formValues['stone-size']} onChange={onFormValuesChange}>
                        <option value="all">All</option>
                        <option value="2">2mm</option>
                        <option value="3">3mm</option>
                        <option value="4">4mm</option>
                        <option value="5">5mm</option>
                        <option value="6">6mm</option>
                        <option value="7">7mm</option>
                        <option value="8">8mm</option>
                        <option value="9">9mm</option>
                        <option value="10">10mm</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="stone-color">Stone color</label>
                    <select name="stone-color" id="stone-color" value={formValues['stone-color']} onChange={onFormValuesChange}>
                        <option value="all">All</option>
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