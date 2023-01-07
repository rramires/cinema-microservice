//
const jwt = require('jsonwebtoken');
const schema = require('../schemas/movieSchema');
const logger = require('../config/logger');


// mock level profiles
const PROFILE_ADMIN = 1;


/**
 * Validate token
 */
async function validateToken(req, res, next){
    // get from header autorizarion
    let token = req.headers['authorization'];
    if(!token){
        // send 401 unauthorized
        res.sendStatus(401);
    }
    else{
        // remove unnecessary part
        token = token.replace('Bearer ', '');
        // check token content at: base64decode.org
        //console.log('token:', token);
        // 
        try{
            // verify token, and get user and profile ID
            const { userId, profileId } = jwt.verify(token, process.env.JWT_SECRET);
            // check userId
            //console.log('userId: ', userId, ' profileId:', profileId);
            // store userId and profileId for next methods
            res.locals.userId = userId;
            res.locals.profileId = profileId;
            next();
        }
        catch(err){
            console.error('validateToken-error:', err.message, '!!!');
            // send 401 unauthorized
            res.sendStatus(401);
        }
    }
}


/**
 * Validate admin
 */
function validateAdmin(req, res, next){
    const { profileId } = res.locals;

    if(profileId == PROFILE_ADMIN){
        next();
    }
    else{
        // add log info
        logger.info(`${new Date()} - User: ${res.locals.userId} - Level: ${res.locals.profileId} - Try unauthorized: ${req.method} in ${req.path}`);
        //send 403 forbidden
        res.sendStatus(403);
    }
}


/**
 * Validate movie schema
 */
const validateMovie = (req, res, next) => {
    const { error } = schema.validate(req.body);
    //
    if(error){
        // 422 Unprocessable Entity
        return res.status(422).json(error.details.map(d => d.message));
    }
    else{
        next();
    }
}


module.exports = { validateToken,
                   validateAdmin,
                   validateMovie };