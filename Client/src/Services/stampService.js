import * as request from './requester';

const url = 'http://localhost:3030/stamps';

export const getStampsProducts = async (searchForm) => {
    if (searchForm === undefined) {
        return await request.get(url);
    }

    const search = searchForm.search;
    const stoneType = searchForm['stone-type'];
    const stampDesign = searchForm['stamp-design'];
    const stoneColor = searchForm['stamp-color'];
    const sort = searchForm.sort;
    const direction = searchForm.direction;

    return await request.get(`${url}?search=${search}&stone-type=${stoneType}&stamp-design=${stampDesign}&stamp-color=${stoneColor}&sort=${sort}&direction=${direction}`);
};

export const getStampDetails = async (id) => {
    return await request.get(`${url}/${id}`);
};