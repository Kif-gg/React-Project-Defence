import * as request from './requester';

const url = 'http://localhost:3030';

const pathname = window.location.pathname;

export const createReview = async (reviewData) => {
    return await request.post(`${url}${pathname}`, reviewData);
};

export const updateReview = async (reviewData) => {
    return await request.put(`${url}${pathname}`, reviewData);
}