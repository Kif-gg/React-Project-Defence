import * as request from './requester';

const url = 'http://localhost:3030/stamps';

export const getStampsProducts = async () => {
    const result = await request.get(url);
    return result;
};

export const getStampDetails = async (id) => {
    const result = await request.get(`${url}/${id}`);
    return result;
};