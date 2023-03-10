// imports
const jwt = require('jsonwebtoken');
const schema = require('../schemas/loginSchema');
const repository = require('../repository/repository');


// mock level profiles
const PROFILE_GUEST = 0;
const PROFILE_ADMIN = 1;


async function doLogin(req, res, next){
    const email = req.body.email;
    const pass = req.body.pass;
    //
    try{
        // check
        const user = await repository.getUserByCheck(email, pass);
        //
        // create token
        const token = jwt.sign( { userId: user._id, profileId: user.profileId }, 
            process.env.JWT_SECRET,
            { algorithm: 'HS256',
              expiresIn: parseInt(process.env.JWT_EXPIRES) });
        // return json with base64 token
        res.json( { token } );
    }
    catch(error){
        // send 401 unauthorized
        res.sendStatus(401);
    }
}


async function validateBlackList(req, res, next){
    // get from header autorizarion
    let token = req.headers['authorization'];
    if(!token){
        next();
    }
    else{
        // remove unnecessary part
        token = token.replace('Bearer ', '');
        // verify
        const isBlacklisted = await repository.checkBlackList(token);
        if(isBlacklisted){
            // send 401 unauthorized
            res.sendStatus(401);
        }
        else{
            next();
        }
    }
}


async function validateSchema(req, res, next){
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
    // get from header autorizarion
    let token = req.headers['authorization'];
    // remove unnecessary part
    token = token.replace('Bearer ', '');
    // insert in blacklist
    await repository.blacklistToken(token);
    // Ok
    res.sendStatus(200);
}


module.exports = { doLogin,
                   doLogout,
                   validateToken,
                   validateBlackList,
                   validateSchema };