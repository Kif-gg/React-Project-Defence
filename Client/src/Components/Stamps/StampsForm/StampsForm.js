export default function StampsForm() {
    return (
        <form action="">
            <div className="search-box">
                <label htmlFor="search">Search...</label><input type="text" name="search" id="search" /><button type="submit"><i
                    className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className="filter-box">
                <div>
                    <i className="fa-solid fa-filter"></i>
                    <label htmlFor="stamp-type">Stone type</label>
                    <select name="stamp-type" id="stamp-type">
                        <option defaultValue="all" selected>All</option>
                        <option defaultValue="crystal">Crystal</option>
                        <option defaultValue="metal">Metal</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="stamp-design">Select stamp design</label>
                    <select name="stamp-design" id="stamp-design">
                        <option defaultValue="all" selected>All</option>
                        <option defaultValue="client-wish">Client's wish</option>
                        <option defaultValue="animals">Animals</option>
                        <option defaultValue="animated">Animated heroes</option>
                        <option defaultValue="text">Text</option>
                        <option defaultValue="shapes">Shapes</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="stamp-color">Select stone color</label>
                    <select name="stamp-color" id="stamp-color">
                        <option defaultValue="all" selected>All</option>
                        <option defaultValue="black">Black</option>
                        <option defaultValue="blue">Blue</option>
                        <option defaultValue="chameleon">Chameleon</option>
                        <option defaultValue="green">Green</option>
                        <option defaultValue="orange">Orange</option>
                        <option defaultValue="purple">Purple</option>
                        <option defaultValue="red">Red</option>
                        <option defaultValue="turquoise">Turquoise</option>
                        <option defaultValue="white">White</option>
                        <option defaultValue="yellow">Yellow</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sort">Sort products by</label>
                    <select name="sort" id="sort">
                        <option defaultValue="price" selected>Price</option>
                        <option defaultValue="rating">Rating</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sort-direction">Way of sorting</label>
                    <select name="direction" id="sort-direction">
                        <option defaultValue="ascending" selected>Ascending</option>
                        <option defaultValue="descending">Descending</option>
                    </select>
                </div>
            </div>
        </form>
    );
};