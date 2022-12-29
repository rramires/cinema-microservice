const { test } = require('@jest/globals');
//
const repository = require('./repository');

// aux
let cityId = null;
let cinemaId = null;

/**
 * Execute before tests
 */
beforeAll(async() => {
    const cities = await repository.getAllCities();
    cityId = cities[1]._id;
    //
    const cinemas = await repository.getCinemasByCityId(cityId);
    cinemaId = cinemas[0]._id;
});


/**
 * Return All Cities
 */
test('Return All Cities', async() => {
    // call method
    const allCities = await repository.getAllCities();
    // verify
    expect(allCities).toBeTruthy();
    expect(Array.isArray(allCities)).toBeTruthy();
    expect(allCities.length).toBeTruthy();
});


/**
 * Return cinemas by city ID
 */
test('Return cinemas by city ID', async() => {
    // call method
    const cinemas = await repository.getCinemasByCityId(cityId);
    // verify
    expect(cinemas).toBeTruthy();
    expect(Array.isArray(cinemas)).toBeTruthy();
});


/**
 * Return movies by cinema ID
 */
test('Return movies by cinema ID', async() => {
    // call method
    const movies = await repository.getMoviesByCinemaId(cinemaId);
    // verify
    expect(movies).toBeTruthy();
    expect(Array.isArray(movies)).toBeTruthy();
});


/**
 * Return movies by city ID
 */
test('Return movies by city ID', async() => {
    // call method
    const movies = await repository.getMoviesByCityId(cityId);
    // verify
    expect(movies).toBeTruthy();
    expect(Array.isArray(movies)).toBeTruthy();
});