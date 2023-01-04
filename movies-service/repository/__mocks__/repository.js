// mock data
const movies = [{
    "_id": {
      "$oid": "63a30e1b196151c2773de691"
    },
    "titulo": "Os Vingadores: Ultimato",
    "sinopse": "Os heróis mais poderosos da Terra enfrentando o Thanos. De novo.",
    "duracao": 181,
    "dataLancamento": {
      "$date": {
        "$numberLong": "1670630400000"
      }
    },
    "imagem": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "categorias": [
      "Aventura",
      "Ação"
    ]
}];


/**
 * Return All movies
 */
async function getAllMovies(){
    //
    return movies;
};


/**
 * Return movie filtered by ID
 */
async function getMovieById(id){
    // ID -1 used for error 404 test
    if(id === 'none'){
      return null;
    }
    else{
      movies[0]._id = id;
      return movies[0];
    }
};


/**
 * Return Premiere movies
 */
async function getPremiereMovies(){
    // 
    movies[0].dataLancamento = new Date();
    // 
    return [movies[0]];
};


/**
 * Add movie
 */
async function addMovie(movie){
  return movies[0];
};


/**
 * Delete movie
 */
async function deleteMovie(id){
  return id;
};


module.exports = { getAllMovies,
                   getMovieById,
                   getPremiereMovies,
                   addMovie,
                   deleteMovie };