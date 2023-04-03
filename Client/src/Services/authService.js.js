import * as request from './requester';

const url = 'http://localhost:3030/users';

export const getUserProfile = async () => {
    const result = await request.get(`${url}/profile`);
    return result;
}

export const getUserFavorites = async () => {
    const result = await request.get(`${url}/profile/favorites`);
    return result;
};