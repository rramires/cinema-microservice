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
                                  expiresIn: process.env.JWT_EXPIRES });
        // return json with base64 token
        res.json( { token } );
    }
    else{
        // send 401 unauthorized
        res.sendStatus(401);
    }
}


async function doLogout(req, res, next){

}


module.exports = { doLogin,
                   doLogout };