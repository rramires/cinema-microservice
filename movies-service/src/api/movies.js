/**
 * Export function for dependency inversion betwin app and repository
 * connection on runtime execute: server->start
 */
module.exports = (app, repository) => {

    /**
     * Get Premiere Movies
     */
    app.get('/movies/premieres', async(req, res, next) => {
        // get 
        const movies = repository.getPremiereMovies();
        // test
        if(movies && movies.length){
            res.json(movies);
        }
        else{
            // status not found
            res.sendStatus(404);
        }
    });


    /**
     * Get Movie by ID
     */
    app.get('/movies/:id', async(req, res, next) => {
        // get 
        const movie = repository.getMovieById(req.params.id);
        // test
        if(movie){
            res.json(movie);
        }
        else{
            // status not found
            res.sendStatus(404);
        }
    });


    /**
     * Get ALL Movies
     */
    app.get('/movies', async(req, res, next) => {
        // get 
        const movies = repository.getAllMovies();
        // test
        if(movies && movies.length){
            res.json(movies);
        }
        else{
            // status not found
            res.sendStatus(404);
        }
    });
};