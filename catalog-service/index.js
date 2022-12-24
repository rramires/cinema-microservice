// imports
const catalog = require('./api/catalog');
const repository = require('./repository/repository');
const server = require('./server/server');

// IIFE (immediately invoked function expression)
(async () => {
    // start app
    try{
        await server.start(catalog, repository);
    }
    catch(err){
        console.error(err);
    }
})();
