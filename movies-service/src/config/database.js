// imports
const MongoClient = require('mongodb').MongoClient;
// get .env parameters
const mongoURL = process.env.MONGO_URL;
const mongoDB = process.env.MONGO_DB;
//
// silgleton client
let client = null;


/**
 * connect and return database
 */
async function connect(){
    if(!client){
        // get .env URL and connect
        client = new MongoClient(mongoURL);
    }
    // connect 
    await client.connect();
    // return Database
    return client.db(mongoDB);
};


/**
 * disconnect from db
 */
async function disconnect(){
    if(!client){
        return true;
    }
    await client.close();
    client = null;
    return true;
};


module.exports = { connect,
                   disconnect };