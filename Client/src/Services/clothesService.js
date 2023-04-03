import * as request from './requester';

const url = 'http://localhost:3030/clothes';

export const getClothesProducts = async () => {
    const result = await request.get(url);
    return result;
};

export const getClothesDetails = async (id) => {
    const result = await request.get(`${url}/${id}`);
    return result;
};