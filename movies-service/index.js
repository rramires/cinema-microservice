// imports
const movies = require('./api/movies');
const repository = require('./repository/repository');
const server = require('./server/server');

// IIFE (immediately invoked function expression)
(async () => {
    // start app
    try{
        await server.start(movies, repository);
    }
    catch(err){
        console.error(err);
    }
})();
