// imports
require('express-async-errors'); // express async error patch
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('../config/logger');

/**
 * Aux
 */
let server = null;

/**
 * Start express application
 */
async function start(api, repository){
    // create express app
    const app = express();
    //
    // filter malicious requests middleware
    app.use(helmet());
    //
    app.use(express.json());
    //
    // split and print request middleware
    app.use(morgan('dev'));
    //
    // app status middleware
    app.use('/health', (req, res, next) => {
        // send app health
        res.send(`${process.env.APP_NAME} is running at port ${process.env.APP_PORT}`);
    });
    //
    // connect APP to to Repository
    api(app, repository);
    //
    // error middleware
    app.use((error, req, res, next) => {
        // print error
        logger.error(`${error.stack}`);
        // send server internal error to client
        res.sendStatus(500);
    });
    if(!server){
        // app status handler
        server = app.listen(process.env.APP_PORT, () => {
            console.log(`${process.env.APP_NAME} started at port ${process.env.APP_PORT}`);
        });
    }
    return server;
};


/**
 * Finish express application
 */
async function stop(api){
    if(server){
        await server.close();
        server = null;
    }
    return true;
};

module.exports = { start, 
                   stop };