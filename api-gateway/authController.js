// imports
const jwt = require('jsonwebtoken');


async function doLogin(req, res, next){
    const email = req.body.email;
    const pass = req.body.pass;
    // mock auth
    if(email === 'test@test.com' &&
       pass === 'abc123'){
        // create token
        const token = jwt.sign( { userId: 1 }, 
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


async function doLogout(req, res, next){
    // check if userId is stored in locals
    console.log('userId: ', res.locals.userId);
    //
    res.sendStatus(200);
}


module.exports = { doLogin,
                   doLogout,
                   validateToken };