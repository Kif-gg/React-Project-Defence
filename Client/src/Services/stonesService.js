import * as request from './requester';

const url = 'http://localhost:3030/stones';

export const getStonesProducts = async () => {
    const result = await request.get(url);
    return result;
};

export const getStonesDetails = async (id) => {
    const result = await request.get(`${url}/${id}`);
    return result;
};