// imports
const database = require('../config/database');
//const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');


/**
 * Return user by E-mail and Password
 */
async function getUserByCheck(email, pass){
    const db = await database.connect();
    //
    const user = await db.collection('users').findOne( { email } );
    //
    if(!user){
        throw new Error('Wrong user or/and password!');
    }
    else{
        // check password
        const isValid = bcrypt.compareSync(pass, user.pass);
        if(!isValid){
            throw new Error('Wrong user or/and password!');
        }
        else{
            return user;
        }
    }
};


async function blacklistToken(token){
    const db = await database.connect();
    // insert *** data used for expire ttl index created in mongodb
    return await db.collection('blacklist').insertOne( { _id: token, data: new Date() } );
}


async function checkBlackList(token){
    const db = await database.connect();
    // check
    const tk = await db.collection('blacklist').findOne( { _id: token } );
    return tk ? true : false;
}


module.exports = { getUserByCheck,
                   blacklistToken,
                   checkBlackList };