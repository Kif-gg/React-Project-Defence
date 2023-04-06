import * as request from './requester';

const url = 'http://localhost:3030';

export const createReview = async (reviewData) => {
    const pathname = window.location.pathname;
    return await request.post(`${url}${pathname}`, reviewData);
};

export const updateReview = async (reviewData) => {
    const pathname = window.location.pathname;
    return await request.put(`${url}${pathname}`, reviewData);
};

export const deleteReview = async () => {
    const pathname = window.location.pathname;
    return await request.del(`${url}${pathname}`);
};