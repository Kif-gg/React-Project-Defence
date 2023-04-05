import * as request from './requester';

const url = 'http://localhost:3030/users';

export const login = async (loginData) => {
    const result = await request.post(`${url}/login`, loginData);
    return result;
};

export const register = async (registerData) => {
    const result = await request.post(`${url}/register`, registerData);
    return result;
};

export const logout = async () => {
    const result = await request.get(`${url}/logout`);
    return result;
}

export const getUserProfile = async () => {
    const result = await request.get(`${url}/profile`);
    return result;
};

export const getUserFavorites = async () => {
    const result = await request.get(`${url}/profile/favorites`);
    return result;
};