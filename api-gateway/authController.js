// imports
const jwt = require('jsonwebtoken');

// mock level profiles
const PROFILE_GUEST = 0;
const PROFILE_ADMIN = 1;


async function doLogin(req, res, next){
    const email = req.body.email;
    const pass = req.body.pass;
    // mock auth
    if(email === 'guest@test.com' &&
       pass === 'abc123'){
        // create token
        const token = jwt.sign( { userId: 1, profileId: PROFILE_GUEST }, 
                                process.env.JWT_SECRET,
                                { algorithm: 'HS256',
                                  expiresIn: parseInt(process.env.JWT_EXPIRES) });
        // return json with base64 token
        res.json( { token } );
    }
    else if(email === 'admin@test.com' &&
            pass === 'abc123'){
        // create token
        const token = jwt.sign( { userId: 2, profileId: PROFILE_ADMIN }, 
            process.env.JWT_SECRET,
            { algorithm: 'HS256',
              expiresIn: parseInt(process.env.JWT_EXPIRES) });
        // return json with base64 token
        res.json( { token } );
    }
    else{
        // send 401 unauthorized
        res.sendStatus(401);
    }
}


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


async function doLogout(req, res, next){
    // check if userId and profileId is stored in locals
    const { userId, profileId } = res.locals;
    //console.log('userId: ', userId, ' profileId:', profileId);
    //
    res.sendStatus(200);
}


module.exports = { doLogin,
                   doLogout,
                   validateToken };