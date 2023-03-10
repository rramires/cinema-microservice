// imports
const { validateToken, validateAdmin, validateMovie } = require('../middlewares/validationMiddeware');
const logger = require('../config/logger');

/**
 * Export function for dependency inversion betwin app and repository
 * connection on runtime execute: server->start
 */
module.exports = (app, repository) => {

    /**
     * Get Premiere Movies
     */
    app.get('/movies/premieres', validateToken, async(req, res, next) => {
        // get 
        const movies = await repository.getPremiereMovies();
        // response
        res.json(movies);
    });


    /**
     * Get Movie by ID
     */
    app.get('/movies/:id', validateToken, async(req, res, next) => {
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
    app.get('/movies', validateToken, async(req, res, next) => {
        // get 
        const movies = await repository.getAllMovies();
        // response
        res.json(movies);
    });


    /**
     * Add Movie
     */
    app.post('/movies', validateToken, validateAdmin, validateMovie, async(req, res, next) => {
        //
        const titulo = req.body.titulo;
        const sinopse = req.body.sinopse;
        const duracao = parseInt(req.body.duracao);
        const dataLancamento = new Date(req.body.dataLancamento);
        const imagem = req.body.imagem;
        const categorias = req.body.categorias; 
        // insert
        const result = await repository.addMovie({
            titulo,
            sinopse,
            duracao,
            dataLancamento,
            imagem,
            categorias
        });
        // add log info
        logger.info(`${new Date()} - User: ${res.locals.userId} - Level: ${res.locals.profileId} - Add movie: ${result._id}`);
        // 201 Created success
        res.status(201).json(result);
    });


    /**
     * Delete Movie
     */
    app.delete('/movies/:id', validateToken, validateAdmin, async(req, res, next) => {
        const id = req.params.id;
        // delete
        const result = await repository.deleteMovie(id);
        // add log info
        logger.info(`${new Date()} - User: ${res.locals.userId} - Level: ${res.locals.profileId} - Delete movie: ${id}`);
        // 204 OK - No Content
        res.status(204).json(result);
    });
};