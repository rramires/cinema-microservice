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
            // verify token, and get user ID
            const { userId } = jwt.verify(token, process.env.JWT_SECRET);
            // check userId
            //console.log('userId: ', res.locals.userId);
            // store userId for next methods
            res.locals.userId = userId;
            next();
        }
        catch(err){
            console.error('validateToken-error:', err.message, '!!!');
            // send 401 unauthorized
            res.sendStatus(401);
        }
    }
}


module.exports = { validateToken };