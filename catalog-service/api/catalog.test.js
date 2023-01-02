const { test } = require('@jest/globals');
//
const server = require('../server/server');
const movies = require('./movies');
//
const repositoryMock = require('../repository/__mocks__/repository');
//
// Supertest testing http requests 
// install dev extension: npm i --save-dev supertest  
const request = require('supertest');

/**
 * Aux
 */
let app = null;


/**
 * Execute before tests
 */
beforeAll(async() => {
    // port change to avoid conflict with default 3001 at server.test.js
    process.env.APP_PORT = 3002
    // initialize server
    app = await server.start(movies, repositoryMock);
});


/**
 * Execute after tests
 */
afterAll(async() => {
    // finalize server
    await server.stop();
});


/**
 * GET /movies
 */
test('GET /movies 200 OK', async() => {
    // get
    const resp = await request(app).get('/movies');
    // verify
    expect(resp.status).toEqual(200);
    expect(Array.isArray(resp.body)).toBeTruthy();
    expect(resp.body.length).toBeTruthy();
});



/**
 * GET /movies/:id
 */
test('GET /movies/:id 200 OK', async() => {
   const id = '63a30e1b196151c2773de691';
   // get
   const resp = await request(app).get('/movies/' + id);
   // verify
   expect(resp.status).toEqual(200);
   expect(typeof resp.body).toBe('object');
   expect(resp.body._id).toEqual(id);
});


/**
 * GET /movies/:id
 */
test('GET /movies/:id 404 not fund', async() => {
    const id =  'none';
    // get
    const resp = await request(app).get('/movies/' + id);
    // verify
    expect(resp.status).toEqual(404);
 });


/**
 * GET /movies/premieres
 */
test('GET /movies/premieres 200 OK', async() => {
    // get
    const resp = await request(app).get('/movies/premieres');
    // verify
    expect(resp.status).toEqual(200);
    expect(Array.isArray(resp.body)).toBeTruthy();
    expect(resp.body.length).toBeTruthy();
}); 