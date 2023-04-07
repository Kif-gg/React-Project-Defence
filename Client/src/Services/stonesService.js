import * as request from './requester';

const url = 'http://localhost:3030/stones';

export const getStonesProducts = async (searchForm) => {
    if (searchForm === undefined) {
        return await request.get(url);

    }

    const search = searchForm.search;
    const stoneType = searchForm['stone-type'];
    const stoneShape = searchForm['stone-shape'];
    const stoneSize = searchForm['stone-size'];
    const stoneColor = searchForm['stone-color'];
    const sort = searchForm.sort;
    const direction = searchForm.direction;

    return await request.get(`${url}?search=${search}&stone-type=${stoneType}&stone-shape=${stoneShape}&stone-size=${stoneSize}&stone-color=${stoneColor}&sort=${sort}&direction=${direction}`);

};

export const getStonesDetails = async (id) => {
    return await request.get(`${url}/${id}`);
};