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


/**
 * Return cinemas by city id
 */
async function getCinemasByCityId(citiId){
  const db = await database.connect();
  //
  return db.collection('catalog')
           .findOne({ _id: new ObjectId(citiId) }, { projection: { cinemas: 1} });
};


module.exports = { getAllCities,
                   getCinemasByCityId };