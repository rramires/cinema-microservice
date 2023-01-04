const { test } = require('@jest/globals');
//
const repository = require('./repository');

// aux
// get movie Id
let movieId = null;
/**
 * Execute before tests
 */
beforeAll(async() => {
    // call method
    const allMovies = await repository.getAllMovies();
    movieId = allMovies[0]._id;
});


/**
 * Return All Movies
 */
test('Return All Movies', async() => {
    // call method
    const allMovies = await repository.getAllMovies();
    // verify
    expect(allMovies).toBeTruthy();
    expect(Array.isArray(allMovies)).toBeTruthy();
    expect(allMovies.length).toBeTruthy();
});


/**
 * Return movie by ID
 */
test('Return movie by ID', async() => {
    // call method
    const movie = await repository.getMovieById(movieId);
    // verify
    expect(movie).toBeTruthy();
    expect(typeof movie).toBe('object');
    // same ID
    expect(movie._id).toEqual(movieId);
});


/**
 * Return movie by MALFORMED ID
 */
test('Return movie by MALFORMED ID', async() => {
    // call method
    const movie = await repository.getMovieById('MALFORMED_ID');
    // verify
    expect(movie).toBeFalsy();
});


/**
 * Return Premiere movies
 */
test('Return Premiere movies', async() => {
    // take the previous month 
    const monthAgo = new Date();
          monthAgo.setMonth(-1);
    // call method
    const premiereMovies = await repository.getPremiereMovies();
    // verify
    expect(premiereMovies).toBeTruthy();
    expect(Array.isArray(premiereMovies)).toBeTruthy();
    expect(premiereMovies.length).toBeTruthy();
    // date >= previous month ->> Update dataLancamento in movies if fail <<-
    expect(premiereMovies[0].dataLancamento.getTime()).toBeGreaterThanOrEqual(monthAgo.getTime());
}); 


/**
 * Add new Movie
 */
test('Add Movie', async() => {
    //
    let movie = null
    //
    try{
        // call method
        movie = await repository.addMovie({
            titulo: "Test Movie",
            sinopse: "Test Movie summary",
            duracao: 120,
            dataLancamento: new Date(),
            imagem: "test.jpg",
            categorias: ["aventura"],
        });
    }
    finally{ // finally sempre é executado
        if(movie){
            // apaga o registro inserido
            await repository.deleteMovie(movie._id);
        }
    }
    // verify
    expect(movie).toBeTruthy();
    expect(typeof movie).toBe('object');
});


/**
 * Delete Movie
 */
test('Delete Movie', async() => {
    // add
    const movie = await repository.addMovie({
        titulo: "Test Movie",
        sinopse: "Test Movie summary",
        duracao: 120,
        dataLancamento: new Date(),
        imagem: "test.jpg",
        categorias: ["aventura"],
    });
    // apaga o registro inserido
    const deleted = await repository.deleteMovie(movie._id);
    // verify
    expect(deleted).toBeTruthy();
});