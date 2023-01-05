// imports
const winston = require('winston');
const path = require('path');

// create log
const logger = winston.createLogger({
    format: winston.format.combine(
        // take all steps
        winston.format.errors( { stack: true  } ), 
        // in json format
        winston.format.json() 
    ),
    transports: [
        // save in disk
        new winston.transports.File({
            filename: path.join(__dirname, '..', 'logs', 'errors.log'),
            // "error" only errors - other option "info" catch all infos
            level: 'error' 
        }) 
    ]
});

// if not in production
if(process.env.NODE_ENV !== 'production'){
    // add log in console, too
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}


module.exports = logger;