'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/',
        async handler(request, h) {
            return 'ok';
        }
    }
];