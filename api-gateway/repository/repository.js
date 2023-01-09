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


module.exports = { getUserByCheck };