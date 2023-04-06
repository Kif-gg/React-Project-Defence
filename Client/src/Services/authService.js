import * as request from './requester';

const url = 'http://localhost:3030/users';

export const login = async (loginData) => {
    return await request.post(`${url}/login`, loginData);
};

export const register = async (registerData) => {
    return await request.post(`${url}/register`, registerData);
};

export const logout = async () => {
    return await request.get(`${url}/logout`);
}

export const getUserProfile = async () => {
    return await request.get(`${url}/profile`);
};

export const getUserFavorites = async () => {
    return await request.get(`${url}/profile/favorites`);
};

export const editUserData = async (editedData) => {
    return await request.put(`${url}/profile`, editedData);
};

export const deleteUserProfile = async (password) => {
    return await request.del(`${url}/profile`, password)
}