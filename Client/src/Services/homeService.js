import * as request from './requester';

const url = 'http://localhost:3030/';

export const getHomeProducts = async () => {
    const result = await request.get(url);
    return result;
};