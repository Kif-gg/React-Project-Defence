export default function ClothesForm() {
    return (
        <form action="">
            <div className="search-box">
                <label htmlFor="search">Search...</label><input type="text" name="search" id="search" /><button
                    type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className="filter-box">
                <div>
                    <i className="fa-solid fa-filter"></i>
                    <label htmlFor="clothes-type">Select clothes type</label>
                    <select name="clothes-type" id="clothes-type">
                        <option defaultdefaultValue="all" selected>All</option>
                        <option defaultValue="bridal-dresses">Bridal dresses</option>
                        <option defaultValue="jersey">Jersey</option>
                        <option defaultValue="muslim">Muslim wear</option>
                        <option defaultValue="pants">Pants</option>
                        <option defaultValue="prom-dresses">Prom dresses</option>
                        <option defaultValue="sportswear">Sportswear</option>
                        <option defaultValue="t-shirts">T-shirts</option>
                        <option defaultValue="underwear">Underwear</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="target-customers">For who</label>
                    <select name="target-customers" id="target-customers">
                        <option defaultValue="all" selected>All</option>
                        <option defaultValue="men">Men</option>
                        <option defaultValue="women">Women</option>
                        <option defaultValue="children">Children</option>
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