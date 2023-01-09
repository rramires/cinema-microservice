// imports
const database = require('../config/database');
//const { ObjectId } = require('mongodb');


/**
 * Return user by E-mail and Password
 */
async function getUserByCheck(email, password){
    const db = await database.connect();
    //
    const user = db.collection('users').findOne( { email } );
    //
    if(!user){
        throw new Error('User not found!');
    }
    else{
        //TODO: Implementar checagem de senha
        return user;
    }
};


module.exports = { getUserByCheck };