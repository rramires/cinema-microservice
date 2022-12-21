const { test } = require('@jest/globals');
//
const database = require('./database');

/**
 * Connecting to the Database
 */
test('Connecting to the Database', async() => {
    // call method
    const connection = await database.connect();
    // verify
    expect(connection).toBeTruthy();
});


/**
 * Disconnecting from the Database
 */
test('Disconnecting from the Database 2x', async() => {
    await database.disconnect();
    const isDisconnected = await database.disconnect();
    // verify
    expect(isDisconnected).toBeTruthy();
});