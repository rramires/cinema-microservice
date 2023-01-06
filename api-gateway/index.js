// imports
const express = require('express');
const httpProxy = require('express-http-proxy');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
//
const authController = require('./authController');
//
// express app
const app = express();
// slice req
app.use(morgan('dev'));
// protection
app.use(helmet());
// json
app.use(express.json());
// cookies
app.use(cookieParser());
//
// URL resolver
const options = {
    proxyReqPathResolver: (req) => {
        // this to not cut the URL
        return req.originalUrl;
    }
}
//
// auth routes
app.post('/login', authController.doLogin);
app.post('/logout', authController.validateToken, authController.doLogout);
//
// proxies
const moviesServiceProxy = httpProxy(process.env.MOVIES_API_URL, options);
const catalogServiceProxy = httpProxy(process.env.CATALOG_API_URL, options);
//
// movies
app.use('/movies', moviesServiceProxy);
// catalog
app.use('/cities|cinemas/i', catalogServiceProxy);
//
// start app
app.listen(process.env.API_PORT, () =>{
    console.log(`API-Gateway started at port ${process.env.API_PORT}`);
});