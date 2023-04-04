import { useState } from "react";

export default function StampsForm() {

    const [formValues, setFormValues] = useState({
        search: '',
        stoneType: 'all',
        stampDesign: 'all',
        stoneColor: 'all',
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
        <form action="" onSubmit={onFormSubmit}>
            <div className="search-box">
                <label htmlFor="search">Search...</label><input type="text" name="search" id="search" value={formValues.search} onChange={onFormValuesChange} /><button type="submit"><i
                    className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className="filter-box">
                <div>
                    <i className="fa-solid fa-filter"></i>
                    <label htmlFor="stamp-type">Stone type</label>
                    <select name="stamp-type" id="stamp-type" value={formValues.stoneType} onChange={onFormValuesChange}>
                        <option value="all">All</option>
                        <option value="crystal">Crystal</option>
                        <option value="metal">Metal</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="stamp-design">Select stamp design</label>
                    <select name="stamp-design" id="stamp-design" value={formValues.stampDesign} onChange={onFormValuesChange}>
                        <option value="all">All</option>
                        <option value="animals">Animals</option>
                        <option value="animated">Animated heroes</option>
                        <option value="text">Text</option>
                        <option value="shapes">Shapes</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="stamp-color">Select stone color</label>
                    <select name="stamp-color" id="stamp-color" value={formValues.stoneColor} onChange={onFormValuesChange}>
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