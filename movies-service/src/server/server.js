// imports
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
// get .env parameters
const appPort = process.env.APP_PORT;
const appName = process.env.APP_NAME;

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
    // split and print request middleware
    app.use(morgan('dev'));
    //
    // app status middleware
    app.use('/health', (req, res, next) => {
        // send app health
        res.send(`${appName} is running at port ${appPort}`);
    });
    //
    // connect APP to to Repository
    api(app, repository);
    //
    // error middleware
    app.use((error, req, res, next) => {
        // print error
        console.error(error);
        // send server internal error to client
        res.sendStatus(500);
    });
    if(!server){
        // app status handler
        server = app.listen(appPort, () => {
            console.log(`${appName} started at port ${appPort}`);
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