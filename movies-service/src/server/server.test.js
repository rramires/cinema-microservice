const { test } = require('@jest/globals');
//
const server = require('./server');
//
// Supertest testing http requests 
// install dev extension: npm i --save-dev supertest  
const request = require('supertest');


//
// Mocks
const apiMock = jest.fn((app, repository) => {
    // mock route for error 500 test
    app.get('/error', (req, res, next) => {
        throw new Error('Mock Error !!!');
    });
});


/**
 * Aux
 */
let app = null;


/**
 * Server Start
 */
test('Server Start', async() => {
    // initialize server
    app = await server.start(apiMock);
    // verify
    expect(app).toBeTruthy();
});


/**
 * Health check
 */
test('Health check', async() => {
    // call method
    const resp = await request(app).get('/health');
    // verify
    expect(resp.status).toEqual(200);
});


/**
 * Error 500 check
 */
test('Error 500 check', async() => {
    // call method
    const resp = await request(app).get('/error');
    // verify
    expect(resp.status).toEqual(500);
});


/**
 * Server Stop
 */
test('Server Stop', async() => {
    // call method
    const isStopped = await server.stop();
    // verify
    expect(isStopped).toBeTruthy();
});