export default function FabricForm() {
    return (
        <form action="">
            <div className="search-box">
                <label htmlFor="search">Search...</label><input type="text" name="search" id="search" /><button type="submit"><i
                    className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className="filter-box">
                <div>
                    <i className="fa-solid fa-filter"></i>
                    <label htmlFor="fabric-type">Fabric type</label>
                    <select name="fabric-type" id="fabric-type">
                        <option defaultValue="all" selected>All</option>
                        <option defaultValue="chiffon">Chiffon</option>
                        <option defaultValue="georgette">Georgette</option>
                        <option defaultValue="lace">Lace</option>
                        <option defaultValue="lycra">Lycra</option>
                        <option defaultValue="organza">Organza</option>
                        <option defaultValue="pleat">Pleat</option>
                        <option defaultValue="plush">Plush</option>
                        <option defaultValue="satin">Satin</option>
                        <option defaultValue="silk">Silk</option>
                        <option defaultValue="taffeta">Taffeta</option>
                        <option defaultValue="tulle">Tulle</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="extras">Extras on fabric</label>
                    <select name="extras" id="extras">
                        <option defaultValue="all" selected>Not specified</option>
                        <option defaultValue="none">None</option>
                        <option defaultValue="brocade">Brocade</option>
                        <option defaultValue="sequins">Sequins</option>
                        <option defaultValue="swarovski-stones">Swarovski stones</option>
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