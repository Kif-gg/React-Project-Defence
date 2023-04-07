import * as request from './requester';

const url = 'http://localhost:3030/fabric';

export const getFabricProducts = async (searchForm) => {
    if (searchForm === undefined) {
        return await request.get(url);
    }

    const { search, extras, sort, direction } = searchForm;
    const fabricType = searchForm['fabric-type'];

    return await request.get(`${url}?search=${search}&fabric-type=${fabricType}&extras=${extras}&sort=${sort}&direction=${direction}`);
};

export const getFabricDetails = async (id) => {
    return await request.get(`${url}/${id}`);
};