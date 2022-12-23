// imports
const MongoClient = require('mongodb').MongoClient;
//
// silgleton client
let client = null;


/**
 * connect and return database
 */
async function connect(){
    if(!client){
        // get .env URL and connect
        client = new MongoClient(process.env.MONGO_URL);
    }
    // connect 
    await client.connect();
    // return Database
    return client.db(process.env.MONGO_DB);
};


/**
 * disconnect from db
 */
async function disconnect(){
    if(client){
        await client.close();
        client = null;
    }
    return true;
};

module.exports = { connect,
                   disconnect };