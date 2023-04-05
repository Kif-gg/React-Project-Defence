import * as request from './requester';

const url = 'http://localhost:3030/fabric';

export const getFabricProducts = async (searchForm) => {
    if (searchForm === undefined) {
        const result = await request.get(url);
        return result;
    }

    const { search, extras, sort, direction } = searchForm;
    const fabricType = searchForm['fabric-type'];

    const result = await request.get(`${url}?search=${search}&fabric-type=${fabricType}&extras=${extras}&sort=${sort}&direction=${direction}`);
    return result;
};

export const getFabricDetails = async (id) => {
    return await request.get(`${url}/${id}`);
};

export const createReview = async (reviewData, productId) => {
    return await request.post(`${url}/${productId}`, reviewData);
}