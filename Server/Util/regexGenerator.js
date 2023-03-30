function createRegExp(query) {
    query = query.split(' ');
    query = query.filter(q => q != '');
        let match = '';

    if (query.length > 1) {
        query = query.join('\\b)(?=.*\\b');
        match = '^(?=.*\\b' + query + '\\b).*$';
    } else {
        match = query.join();
    }
    return match;
}

module.exports = {
    createRegExp
}