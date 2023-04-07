import * as request from './requester';

const url = 'http://localhost:3030/clothes';

export const getClothesProducts = async (searchForm) => {
    if (searchForm === undefined) {
        return await request.get(url);
    }

    const search = searchForm.search;
    const clothingType = searchForm['clothes-type'];
    const targetCustomers = searchForm['target-customers'];
    const sort = searchForm.sort;
    const direction = searchForm.direction;

    return await request.get(`${url}?search=${search}&clothes-type=${clothingType}&target-customers=${targetCustomers}&sort=${sort}&direction=${direction}`);
};

export const getClothesDetails = async (id) => {
    return await request.get(`${url}/${id}`);
};