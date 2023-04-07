import { Navigate } from "react-router-dom";
import NotFound from "../Components/NotFound/NotFound";

const request = async (method, url, data) => {

    const options = { mode: 'cors', credentials: 'include' };

    if (method !== 'GET') {
        options.method = method;

        if (data) {
            options.headers = {
                'content-type': 'application/json',
            };
            options.body = JSON.stringify(data);
        }
    }

    const response = await fetch(url, options);

    if (response.status === 204) {
        return {};
    }

    const result = await response.json();

    if (!response.ok) {
        if (response.status === 401) {
            localStorage.clear();
            document.cookie += '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
            <Navigate to={'/users/login'} />;
            throw new Error(result.message);
        } else if (response.status === 404) {
            <Navigate to={<NotFound />} />;
            return;
        }
        alert(result.message);
        throw new Error(result.message);
    }
    return result;
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const del = request.bind(null, 'DELETE');