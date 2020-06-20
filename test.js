'use strict';

const test = require('ava');
const Hapi = require('@hapi/hapi');
const Wreck = require('@hapi/wreck');

const routes = require('./routes');

test('route / should return ok on GET inject', async (t) => {
    const server = Hapi.server();

    server.route(routes);

    const { statusCode, payload } = await server.inject('/');

    t.is(payload, 'ok');
    t.is(statusCode, 200);
});

test('route / should return ok on GET request', async (t) => {
    const server = Hapi.server();

    server.route(routes);

    await server.start();

    const { res, payload } = await Wreck.get(`${server.info.uri}/`);

    t.is(payload.toString(), 'ok');
    t.is(res.statusCode, 200);
});

test('initialize server to have cache configured', async (t) => {
    const server = Hapi.server();

    server.ext({
        type: 'onPreStart',
        async method(s) {
            server.app.value = 1;
        }
    });

    await server.initialize();

    t.is(server.app.value, 1);
});

test.cb('listen to custom event',(t) => {
    const server = Hapi.server();

    server.event('custom');

    server.events.on('custom', (message) => {
        t.is(message, 'ok');
        t.end();
    });

    server.events.emit('custom', 'ok');
});

test('listen to custom event await', async (t) => {
    t.plan(1); // change to 0 to see it fail

    const server = Hapi.server();

    server.event('custom');

    server.events.on('custom', (message) => {
        t.is(message, 'ok');
    });

    await server.events.emit('custom', 'ok');
});