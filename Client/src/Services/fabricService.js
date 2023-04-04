import * as request from './requester';

const url = 'http://localhost:3030/fabric';

export const getFabricProducts = async () => {
    const result = await request.get(url);
    return result;
};

export const getFabricDetails = async (id) => {
    const result = await request.get(`${url}/${id}`);
    return result;
};