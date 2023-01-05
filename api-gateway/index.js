// imports
const express = require('express');
const httpProxy = require('express-http-proxy');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
//
// express app
const app = express();
// slice req
app.use(morgan('dev'));
// protection
app.use(helmet());
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
// proxies
const moviesServiceProxy = httpProxy(process.env.MOVIES_API_URL, options);
const catalogServiceProxy = httpProxy(process.env.CATALOG_API_URL, options);
//
// routes
// movies
app.use('/movies', moviesServiceProxy);
// catalog
app.use('/cities|cinemas/i', catalogServiceProxy);
//
// start app
app.listen(process.env.API_PORT, () =>{
    console.log(`API-Gateway started at port ${process.env.API_PORT}`);
});