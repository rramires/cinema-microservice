const { test } = require('@jest/globals');
//
const server = require('./server');
//
// Supertest testing http requests 
// install dev extension: npm i --save-dev supertest  
const request = require('supertest');

// Mocks
const apiMock = jest.fn((app, repository) => {
    return true;
});


/**
 * Server Start
 */
test('Server Start', async() => {
    // initialize server
    const app = await server.start(apiMock);
    // verify
    expect(app).toBeTruthy();
});


/**
 * Health check
 */
test('Health check', async() => {
    // initialize server
    const app = await server.start(apiMock);
    // call method
    const resp = await request(app).get('/health');
    // verify
    expect(resp.status).toEqual(200);
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