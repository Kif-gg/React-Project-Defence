export default function StonesForm() {
    return (
        <form action="">
            <div className="search-box">
                <label htmlFor="search">Search...</label><input type="text" name="search" id="search" /><button type="submit"><i
                    className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className="filter-box">
                <div>
                    <i className="fa-solid fa-filter"></i>
                    <label htmlFor="stone-type">Stone type</label>
                    <select name="stone-type" id="stone-type">
                        <option defaultValue="all" selected>All</option>
                        <option defaultValue="crystal">Crystal</option>
                        <option defaultValue="metal">Metal</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="stone-shape">Stone shape</label>
                    <select name="stone-shape" id="stone-shape">
                        <option defaultValue="all" selected>All</option>
                        <option defaultValue="circle">Circle</option>
                        <option defaultValue="rectangle">Rectangle</option>
                        <option defaultValue="square">Square</option>
                        <option defaultValue="triangle">Triangle</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="stone-size">Stone size</label>
                    <select name="stone-size" id="stone-size">
                        <option defaultValue="all" selected>All</option>
                        <option defaultValue="2">2mm</option>
                        <option defaultValue="3">3mm</option>
                        <option defaultValue="4">4mm</option>
                        <option defaultValue="5">5mm</option>
                        <option defaultValue="6">6mm</option>
                        <option defaultValue="7">7mm</option>
                        <option defaultValue="8">8mm</option>
                        <option defaultValue="9">9mm</option>
                        <option defaultValue="10">10mm</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="stone-color">Stone color</label>
                    <select name="stone-color" id="stone-color">
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