//
const jwt = require('jsonwebtoken');


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
        //send 403 forbidden
        res.sendStatus(403);
    }
}


module.exports = { validateToken,
                   validateAdmin };