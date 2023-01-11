const { test } = require('@jest/globals');
//
const app = require('../server/index');
const repository = require('../repository/repository');
//
// Supertest testing http requests 
// install dev extension: npm i --save-dev supertest  
const request = require('supertest');
//
const { ObjectId } = require('mongodb');

/**
 * Aux
 */
const loginOk = {
    email: "guest@test.com",
    pass: "abc123"
}
const loginInvalid = {
    email: "none@none.com",
    pass: "invalidpass",
    data: new Date()
}
const loginEmailNotOk = {
    email: "none@none.com",
    pass: "invalidpass"
}
const loginPassNotOk = {
    email: "guest@test.com",
    pass: "invalidpass"
}

let token = '';
let tokenBlacklist = '';


/**
 * Execute before tests
 */
beforeAll(async() => {
    // port change to avoid conflict with default 3000 at server.test.js
    process.env.APP_PORT = 5001
    //
    // make login
    const resp = await request(app)
                         .post('/login/')
                         .set('Content-Type', 'application/json')
                         .send(loginOk);  
    // get token
    token = resp.body.token;
    //
    // add fake token to blacklist
    tokenBlacklist = new ObjectId().toHexString();
    await repository.blacklistToken(tokenBlacklist);    
});


/**
 * Execute after tests
 */
afterAll(async() => {
    // finalize server
    await app.close();
});


/**
 * POST /login
 */
test('POST /login 200 OK', async() => {
    // post
    const resp = await request(app)
                         .post('/login/')
                         .set('Content-Type', 'application/json')
                         .send(loginOk);                  
    // verify
    expect(resp.status).toEqual(200);
    expect(typeof resp.body.token).toBe('string');
});


/**
 * POST /login 422 UNPROCESSABLE ENTITY
 */
test('POST /login 422 UNPROCESSABLE ENTITY', async() => {
    // post
    const resp = await request(app)
                         .post('/login/')
                         .set('Content-Type', 'application/json')
                         .send(loginInvalid);                  
    // verify
    expect(resp.status).toEqual(422);
}); 


/**
 * POST /login 401 UNAUTHORIZED Email
 */
test('POST /login 401 UNAUTHORIZED Email', async() => {
    // post
    const resp = await request(app)
                         .post('/login/')
                         .set('Content-Type', 'application/json')
                         .send(loginEmailNotOk);                  
    // verify
    expect(resp.status).toEqual(401);
});


/**
 * POST /login 401 UNAUTHORIZED Pass
 */
test('POST /login 401 UNAUTHORIZED Pass', async() => {
    // post
    const resp = await request(app)
                         .post('/login/')
                         .set('Content-Type', 'application/json')
                         .send(loginPassNotOk);                  
    // verify
    expect(resp.status).toEqual(401);
});


/**
 * POST /logout
 */
test('POST /logout 200 OK', async() => {
    // post
    const resp = await request(app)
                         .post('/logout/')
                         .set('Content-Type', 'application/json')
                         .set('authorization', `Bearer ${token}`);                  
    // verify
    expect(resp.status).toEqual(200);
});


/**
 * POST /logout 401 UNAUTHORIZED
 */
test('POST /logout 401 UNAUTHORIZED', async() => {
     // post
     const resp = await request(app)
                        .post('/logout/')
                        .set('Content-Type', 'application/json')
                        .set('authorization', `Bearer ${token} invalid`);                  
    // verify
    expect(resp.status).toEqual(401);
});


/**
 * POST /logout 401 UNAUTHORIZED by Blacklist
 */
test('POST /logout 401 UNAUTHORIZED by Blacklist', async() => {
    // post
    const resp = await request(app)
                        .post('/logout/')
                        .set('Content-Type', 'application/json')
                        .set('authorization', `Bearer ${tokenBlacklist}`);                  
   // verify
   expect(resp.status).toEqual(401);
});


/**
 * POST /logout NO TOKEN
 */
test('POST /logout 401 UNAUTHORIZED NO TOKEN', async() => {
    // post
    const resp = await request(app)
                        .post('/logout/')
                        .set('Content-Type', 'application/json');                 
   // verify
   expect(resp.status).toEqual(401);
});