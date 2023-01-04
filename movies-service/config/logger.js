// imports
const winston = require('winston');

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
            filename: 'logs.txt',
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