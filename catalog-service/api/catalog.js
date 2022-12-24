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
        const movies = await repository.getPremiereMovies();
        // response
        res.json(movies);
    });


    /**
     * Get Movie by ID
     */
    app.get('/movies/:id', async(req, res, next) => {
        // get 
        const movie = await repository.getMovieById(req.params.id);
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
        const movies = await repository.getAllMovies();
        // response
        res.json(movies);
    });
};