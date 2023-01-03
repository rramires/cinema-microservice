const { test } = require('@jest/globals');
//
const server = require('../server/server');
const catalog = require('./catalog');
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
    app = await server.start(catalog, repositoryMock);
});


/**
 * Execute after tests
 */
afterAll(async() => {
    // finalize server
    await server.stop();
});


/**
 * GET /cities
 */
test('GET /cities 200 OK', async() => {
    // get
    const resp = await request(app).get('/cities');
    // verify
    expect(resp.status).toEqual(200);
    expect(Array.isArray(resp.body)).toBeTruthy();
    expect(resp.body.length).toBeTruthy();
});



/**
 * GET /cities/:cityId/movies
 */
test('GET /cities/:cityId/movies 200 OK', async() => {
   const id = '63a630b1976a1807efb7c1e5';
   // get
   const resp = await request(app).get('/cities/' + id + '/movies');
   // verify
   expect(resp.status).toEqual(200);
   expect(Array.isArray(resp.body)).toBeTruthy();
   expect(resp.body.length).toBeTruthy();
});


/**
 * GET /cities/:cityId/movies 404
 */
test('GET /cities/:cityId/movies 404 not fund', async() => {
    const id =  'none';
    // get
   const resp = await request(app).get('/cities/' + id + '/movies');
    // verify
    expect(resp.status).toEqual(404);
}); 


/**
 * GET /cities/:cityId/movies/:movieId
 */
test('GET /cities/:cityId/movies/:movieId 200 OK', async() => {
    const id = '63a30e1b196151c2773de691'; // cityId
    const id2 = '63a30e1b196151c2773de691'; // movieId
    // get
    const resp = await request(app).get('/cities/' + id + '/movies/' + id2);
    // verify
    expect(resp.status).toEqual(200);
    expect(Array.isArray(resp.body)).toBeTruthy();
    expect(resp.body.length).toBeTruthy();
});
 
 
 /**
  * GET /cities/:cityId/movies/:movieId 404
  */
test('GET /cities/:cityId/movies/:movieId 404 not fund', async() => {
    const id =  'none'; // cityId
    const id2 = 'none'; // movieId
    // get
    const resp = await request(app).get('/cities/' + id + '/movies/' + id2);
    // verify
    expect(resp.status).toEqual(404);
}); 
 

/**
 * GET /cities/:cityId/cinemas
 */
test('GET /cities/:cityId/cinemas 200 OK', async() => {
    const id = '63a30e1b196151c2773de691';
    // get
    const resp = await request(app).get('/cities/' + id + '/cinemas');
    // verify
    expect(resp.status).toEqual(200);
    expect(Array.isArray(resp.body)).toBeTruthy();
    expect(resp.body.length).toBeTruthy();
});
 
 
/**
  * GET /cities/:cityId/cinemas 404
  */
test('GET /cities/:cityId/cinemas 404 not fund', async() => {
    const id =  'none';
     // get
    const resp = await request(app).get('/cities/' + id + '/cinemas');
     // verify
     expect(resp.status).toEqual(404);
}); 


/**
 * GET /cinemas/:cinemaId/movies
 */
test('GET /cinemas/:cinemaId/movies 200 OK', async() => {
    const id = '63a30e1b196151c2773de691';
    // get
    const resp = await request(app).get('/cinemas/' + id + '/movies');
    // verify
    expect(resp.status).toEqual(200);
    expect(Array.isArray(resp.body)).toBeTruthy();
    expect(resp.body.length).toBeTruthy();
});
 
 
/**
  * GET /cinemas/:cinemaId/movies 404
  */
test('GET /cinemas/:cinemaId/movies 404 not fund', async() => {
    const id =  'none';
     // get
    const resp = await request(app).get('/cinemas/' + id + '/movies');
     // verify
     expect(resp.status).toEqual(404);
});


/**
 * GET /cinemas/:cinemaId/movies/:movieId
 */
test('GET /cinemas/:cinemaId/movies/:movieId 200 OK', async() => {
    const id = '63a30e1b196151c2773de691';
    const id2 = '63a30e1b196151c2773de691';
    // get
    const resp = await request(app).get('/cinemas/' + id + '/movies/' + id2);
    // verify
    expect(resp.status).toEqual(200);
    expect(Array.isArray(resp.body)).toBeTruthy();
    expect(resp.body.length).toBeTruthy();
});
 
 
/**
  * GET /cinemas/:cinemaId/movies 404
  */
test('GET /cinemas/:cinemaId/movies 404 not fund', async() => {
    const id = 'none';
    const id2 = 'none';
    // get
    const resp = await request(app).get('/cinemas/' + id + '/movies/' + id2);
    // verify
    expect(resp.status).toEqual(404);
});