const { test } = require('@jest/globals');
//
const repository = require('./repository');

// aux
/**
 * Execute before tests
 */
beforeAll(async() => {
    
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
