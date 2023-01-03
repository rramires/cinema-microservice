const { ObjectId } = require('mongodb');
// mock data
const catalog = require('./catalog.json');


/**
 * Return All cities
 */
function getAllCities(){
    //
    return catalog.map(catalog => {
        return {
            _id: ObjectId(),
            pais: catalog.pais,
            uf: catalog.uf,
            cidade: catalog.cidade
        }
    });
};


/**
 * Return cinemas by city id
 */
function getCinemasByCityId(citiId){
    // ID -1 used for error 404 test
    if(citiId === 'none'){
        return null;
    }
    else{
        //
        return catalog[catalog.length -1].cinemas;
    }
};


/**
 * Return cinemas by city id
 */
function getMoviesByCinemaId(cinemaId){
    // ID "none" used for error 404 test
    if(cinemaId === 'none'){
        return null;
    }
    else{
        return (getCinemasByCityId()).map(cinema => {
            return {
                titulo: cinema.salas[0].sessoes[0].filme,
                _id: cinema.salas[0].sessoes[0].idFilme
            }
        });
    }
}; 


/**
 * Return movies by city id
 */
async function getMoviesByCityId(cityId){
    // ID "none" used for error 404 test
    if(cityId === 'none'){
        return null;
    }
    else{
        return getMoviesByCinemaId(cityId);
    }
}; 


/**
 * Return sessions by city id
 */
async function getMovieSessionByCityId(movieId, cityId){
    // ID "none" used for error 404 test
    if(movieId === 'none' || cityId === 'none'){
        return null;
    }
    else{
        return (getCinemasByCityId()).map(cinema => {
            return {
                titulo: cinema.salas[0].sessoes[0].filme,
                _id: cinema.salas[0].sessoes[0].idFilme,
                cinema: cinema.nome,
                idCinema: cinema._id,
                sala: cinema.salas[0].nome,
                sessao: cinema.salas[0].sessoes[0]
            }
        });
    }
}; 


/**
 * Return sessions by cinema id
 */
async function getMovieSessionByCinemaId(movieId, cinemaId){
    if(movieId === 'none' || cinemaId === 'none'){
        return null;
    }
    else{
        return getMovieSessionByCityId();
    }
}
  

module.exports = { getAllCities,
                   getCinemasByCityId,
                   getMoviesByCinemaId,
                   getMoviesByCityId,
                   getMovieSessionByCityId,
                   getMovieSessionByCinemaId };