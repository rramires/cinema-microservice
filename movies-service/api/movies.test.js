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
const { JsonWebTokenError } = require('jsonwebtoken');


/**
 * Aux
 */
let app = null;

const guestToken = '1';
const adminToken = '2';


/**
 * substitute authentication module for mock
 */ 
jest.mock('../node_modules/jsonwebtoken', () => {
    return { 
        verify: (token) => {
            if(token === guestToken){
                return { userId: 1, profileId: 0 } // Guest
            }
            else if(token === adminToken){
                return { userId: 2, profileId: 1 } // Admin
            }
            else{
                throw new Error('Invalid token!');
            }
        }
    }
});


/**
 * Execute before tests
 */
beforeAll(async() => {
    // port change to avoid conflict with default 3000 at server.test.js
    process.env.APP_PORT = 3001
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
 * GET /movies 200 OK
 */
test('GET /movies 200 OK', async() => {
    // get
    const resp = await request(app).get('/movies')
                                   .set('authorization', `Bearer ${guestToken}`);
    // verify
    expect(resp.status).toEqual(200);
    expect(Array.isArray(resp.body)).toBeTruthy();
    expect(resp.body.length).toBeTruthy();
});


/**
 * GET /movies 401 UNAUTHORIZED
 */
test('GET /movies 401 UNAUTHORIZED', async() => {
    // get
    const resp = await request(app).get('/movies')
                                   .set('authorization', `Bearer INVALID`);
    // verify
    expect(resp.status).toEqual(401);
});


/**
 * GET /movies 401 UNAUTHORIZED - TOKEN EMPTY
 */
test('GET /movies 401 UNAUTHORIZED TOKEN EMPTY', async() => {
    // get
    const resp = await request(app).get('/movies')
                                   .set('authorization', ``);
    // verify
    expect(resp.status).toEqual(401);
});


/**
 * GET /movies/:id 200 OK
 */
test('GET /movies/:id 200 OK', async() => {
   const id = '63a30e1b196151c2773de691';
   // get
   const resp = await request(app).get('/movies/' + id)
                                  .set('authorization', `Bearer ${guestToken}`);
   // verify
   expect(resp.status).toEqual(200);
   expect(typeof resp.body).toBe('object');
   expect(resp.body._id).toEqual(id);
});


/**
 * GET /movies/:id 401 UNAUTHORIZED
 */
test('GET /movies/:id 401 UNAUTHORIZED', async() => {
    const id = '63a30e1b196151c2773de691';
    // get
    const resp = await request(app).get('/movies/' + id)
                                   .set('authorization', `Bearer INVALID`);
    // verify
    expect(resp.status).toEqual(401);
 });


/**
 * GET /movies/:id 404 NOT FOUND
 */
test('GET /movies/:id 404 NOT FOUND', async() => {
    const id =  'none';
    // get
    const resp = await request(app).get('/movies/' + id)
                                   .set('authorization', `Bearer ${guestToken}`);
    // verify
    expect(resp.status).toEqual(404);
 });


/**
 * GET /movies/premieres 200 OK
 */
test('GET /movies/premieres 200 OK', async() => {
    // get
    const resp = await request(app).get('/movies/premieres')
                                   .set('authorization', `Bearer ${guestToken}`);
    // verify
    expect(resp.status).toEqual(200);
    expect(Array.isArray(resp.body)).toBeTruthy();
    expect(resp.body.length).toBeTruthy();
});


/**
 * GET /movies/premieres 401 UNAUTHORIZED
 */
test('GET /movies/premieres 401 UNAUTHORIZED', async() => {
    // get
    const resp = await request(app).get('/movies/premieres')
                                   .set('authorization', `Bearer INVALID`);
    // verify
    expect(resp.status).toEqual(401);
});


/**
 * POST /movies/ 201 OK
 */
test('POST /movies/ 201 OK', async() => {
    const movie = {
        titulo: "Test Movie",
        sinopse: "Test Movie summary",
        duracao: 120,
        dataLancamento: new Date(),
        imagem: "http://teste.com/test.jpg",
        categorias: ["aventura"]
    };
    // post
    const resp = await request(app)
                         .post('/movies/')
                         .set('Content-Type', 'application/json')
                         .set('authorization', `Bearer ${adminToken}`)
                         .send(movie);                  
    // verify
    expect(resp.status).toEqual(201);
    expect(typeof resp.body).toBe('object');
}); 


/**
 * POST /movies/ 401 UNAUTHORIZED
 */
test('POST /movies/ 401 UNAUTHORIZED', async() => {
    const movie = {
        titulo: "Test Movie",
        sinopse: "Test Movie summary",
        duracao: 120,
        dataLancamento: new Date(),
        imagem: "http://teste.com/test.jpg",
        categorias: ["aventura"]
    };
    // post
    const resp = await request(app)
                         .post('/movies/')
                         .set('Content-Type', 'application/json')
                         .set('authorization', `Bearer INVALID`)
                         .send(movie);                  
    // verify
    expect(resp.status).toEqual(401);
}); 


/**
 * POST /movies/ 403 FORBIDDEN
 */
test('POST /movies/ 403 FORBIDDEN', async() => {
    const movie = {
        titulo: "Test Movie",
        sinopse: "Test Movie summary",
        duracao: 120,
        dataLancamento: new Date(),
        imagem: "http://teste.com/test.jpg",
        categorias: ["aventura"]
    };
    // post
    const resp = await request(app)
                         .post('/movies/')
                         .set('Content-Type', 'application/json')
                         .set('authorization', `Bearer ${guestToken}`)
                         .send(movie);                  
    // verify
    expect(resp.status).toEqual(403);
    expect(typeof resp.body).toBe('object');
}); 


/**
 * POST /movies/ 422 NOT OK
 */
test('POST /movies/ 422 NOT OK', async() => {
    const movie = {  };
    // post
    const resp = await request(app)
                         .post('/movies/')
                         .set('Content-Type', 'application/json')
                         .set('authorization', `Bearer ${adminToken}`)
                         .send(movie);                  
    // verify
    expect(resp.status).toEqual(422);
}); 


/**
 * DELETE /movies/:id 204 OK NO CONTENT
 */
test('DELETE /movies/:id 204 OK NO CONTENT', async() => {
    const id = '63a30e1b196151c2773de691';
    // get
    const resp = await request(app).delete('/movies/' + id)
                                   .set('authorization', `Bearer ${adminToken}`);
    // verify
    expect(resp.status).toEqual(204);
 });


 /**
 * DELETE /movies/:id 401 UNAUTHORIZED
 */
test('DELETE /movies/:id 401 UNAUTHORIZED', async() => {
    const id = '63a30e1b196151c2773de691';
    // get
    const resp = await request(app).delete('/movies/' + id)
                                   .set('authorization', `Bearer INVALID`);
    // verify
    expect(resp.status).toEqual(401);
 });


 /**
 * DELETE /movies/:id 403 FORBIDDEN
 */
test('DELETE /movies/:id 403 FORBIDDEN', async() => {
    const id = '63a30e1b196151c2773de691';
    // get
    const resp = await request(app).delete('/movies/' + id)
                                   .set('authorization', `Bearer ${guestToken}`);
    // verify
    expect(resp.status).toEqual(403);
 });