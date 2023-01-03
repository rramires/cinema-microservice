

/**
 * Export function for dependency inversion betwin app and repository
 * connection on runtime execute: server->start
 */
module.exports = (app, repository) => {


    /**
     * Get Sessions by city and movie ID
     */
    app.get('/cities/:cityId/movies/:movieId', async(req, res, next) => {
        // get 
        const sessions = await repository.getMovieSessionByCityId(req.params.movieId, req.params.cityId);

        console.log("Aqui!!!", req.params.movieId, req.params.cityId);
        // test
        if(sessions){
            res.json(sessions);
        }
        else{
            // status not found
            res.sendStatus(404);
        }
    });


    /**
     * Get Movies by city ID
     */
    app.get('/cities/:cityId/movies', async(req, res, next) => {
        // get 
        const movies = await repository.getMoviesByCityId(req.params.cityId);
        // test
        if(movies){
            res.json(movies);
        }
        else{
            // status not found
            res.sendStatus(404);
        }
    });


    /**
     * Get Cinemas by city ID
     */
    app.get('/cities/:cityId/cinemas', async(req, res, next) => {
        // get 
        const cinemas = await repository.getCinemasByCityId(req.params.cityId);
        // test
        if(cinemas){
            res.json(cinemas);
        }
        else{
            // status not found
            res.sendStatus(404);
        }
    });


    /**
     * Get Cities
     */
    app.get('/cities', async(req, res, next) => {
        // get 
        const cities = await repository.getAllCities();
        // response
        res.json(cities);
    });


    /**
     * Get Movies by cinema ID
     */
    app.get('/cinemas/:cinemaId/movies/:movieId', async(req, res, next) => {
        // get 
        const sessions = await repository.getMovieSessionByCinemaId(req.params.movieId, req.params.cinemaId);
        // test
        if(sessions){
            res.json(sessions);
        }
        else{
            // status not found
            res.sendStatus(404);
        }
    });


    /**
     * Get Movies by cinema ID
     */
    app.get('/cinemas/:cinemaId/movies', async(req, res, next) => {
        // get 
        const movies = await repository.getMoviesByCinemaId(req.params.cinemaId);
        // test
        if(movies){
            res.json(movies);
        }
        else{
            // status not found
            res.sendStatus(404);
        }
    });
};