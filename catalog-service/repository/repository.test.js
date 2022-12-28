const { test } = require('@jest/globals');
//
const repository = require('./repository');

// aux
let cityId = null;


/**
 * Execute before tests
 */
beforeAll(async() => {
    const cities = await repository.getAllCities();
    cityId = cities[0]._id;
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

    console.log('cityId:', cityId)
    // call method
    const city = await repository.getCinemasByCityId(cityId);
    // verify
    expect(city).toBeTruthy();
    expect(Array.isArray(city.cinemas)).toBeTruthy();
});