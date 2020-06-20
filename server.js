'use strict';

require('make-promises-safe');
const Hapi = require('@hapi/hapi');

const routes = require('./routes');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();