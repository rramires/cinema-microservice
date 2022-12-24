// imports
const database = require('../config/database');
const { ObjectId } = require('mongodb');


/**
 * Return All movies
 */
async function getAllMovies(){
    const db = await database.connect();
    //
    return db.collection('movies').find().toArray();
};


/**
 * Return movie filtered by ID
 */
async function getMovieById(id){
    // test 4 chars hex format
    if(/^[a-fA-F0-9]{24}$/.test(id)){
        const db = await database.connect();
         // filter by DB ID
        return db.collection('movies').findOne({ _id: ObjectId(id) });
    }
    else{
        return null;
    }
};


/**
 * Return Premiere movies
 */
async function getPremiereMovies(){
    const db = await database.connect();
    // take the previous month 
    const monthAgo = new Date();
          monthAgo.setMonth(-1);
    // filter by date >= previous month
    return db.collection('movies').find({ dataLancamento: { $gte: monthAgo } }).toArray();
};


module.exports = { getAllMovies,
                   getMovieById,
                   getPremiereMovies };