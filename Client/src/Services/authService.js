import * as request from './requester';

const url = 'http://localhost:3030/users';

const altUrl = 'http://localhost:3030';

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

export const addToFavorites = async () => {
    const pathname = window.location.pathname;
    return await request.post(`${altUrl}${pathname}/favorite`);
};

export const removeFromFavorites = async () => {
    const pathname = window.location.pathname;
    return await request.del(`${altUrl}${pathname}/favorite`);
};

export const getUserCart = async () => {
    return await request.get(`${altUrl}/cart`);
};

export const addToCart = async () => {
    const pathname = window.location.pathname;
    return await request.post(`${altUrl}${pathname}/cart`);
};

export const removeFromCart = async () => {
    return await request.del(`${altUrl}/cart`);
};

export const editUserData = async (editedData) => {
    return await request.put(`${url}/profile`, editedData);
};

export const deleteUserProfile = async (password) => {
    return await request.del(`${url}/profile`, password)
}