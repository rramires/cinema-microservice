// imports
const database = require('../config/database');
const { ObjectId } = require('mongodb');


/**
 * Return All cities
 */
async function getAllCities(){
    const db = await database.connect();
    //
    return db.collection('catalog')
             .find({/* filter */})
             .project({ cidade: 1, uf: 1, pais: 1 /* fields with 1 or 0 */})
             .toArray();
};


module.exports = { getAllCities };