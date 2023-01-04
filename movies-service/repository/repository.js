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


/**
 * Add movie
 */
async function addMovie(movie){
    const db = await database.connect();
    // insert
    const result = await db.collection('movies').insertOne(movie);
    movie._id = result.insertedId;
    return movie;
};


/**
 * Delete movie
 */
async function deleteMovie(id){
    const db = await database.connect();
    // delete
    const result = await db.collection('movies').deleteOne({ _id: new ObjectId(id) });
    return result;
};


module.exports = { getAllMovies,
                   getMovieById,
                   getPremiereMovies,
                   addMovie,
                   deleteMovie };