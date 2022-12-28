// mock data
const catalog = require('./catalog.json');


/**
 * Return All movies
 */
async function getAllCities(){
    //
    return catalog;
};


module.exports = { getAllCities };