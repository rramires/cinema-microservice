// imports
const database = require('../config/database');
const { ObjectId } = require('mongodb');


/**
 * Return All cities
 */
async function getAllCities(){
    const db = await database.connect();
    //
    return db.collection('catalog')
             .find({/* filter */})
             .project({ cidade: 1, uf: 1, pais: 1 /* fields with 1 or 0 */})
             .toArray();
};


/**
 * Return cinemas by city id
 */
async function getCinemasByCityId(citiId){
  const db = await database.connect();
  //
  const city = await db.collection('catalog')
                 .findOne({ _id: new ObjectId(citiId) }, { projection: { cinemas: 1 } });
  //
  return city.cinemas;
};


/**
 * Return cinemas by city id
 */
async function getMoviesByCinemaId(cinemaId){
  const db = await database.connect();
  //
  const group = await db.collection('catalog')
                        .aggregate([ 
                                      /* match mesma coisa que os filtros */
                                      { $match: { "cinemas._id": new ObjectId(cinemaId) } },
                                      /* unwind +- desenrola! joga tudo no mesmo nível */
                                      { $unwind: "$cinemas" },
                                      { $unwind: "$cinemas.salas" },
                                      { $unwind: "$cinemas.salas.sessoes" },
                                      /* agrupamento, para tirar as repetições */
                                      { $group: { _id: { titulo: "$cinemas.salas.sessoes.filme", _id: "$cinemas.salas.sessoes.idFilme" } } }
                                    ])
                        .toArray();
  // mapeia pra subir 1 nivel, retirando objeto inutil 
  // de { _id: { titulo, _id } }
  // para titulo, _id
  return group.map(g => g._id); 
}; 


/**
 * Return movies by city id
 */
async function getMoviesByCityId(cityId){
  const db = await database.connect();
  //
  const group = await db.collection('catalog')
                        .aggregate([ 
                                      /* match mesma coisa que os filtros */
                                      { $match: { "_id": new ObjectId(cityId) } },
                                      /* unwind +- desenrola! joga tudo no mesmo nível */
                                      { $unwind: "$cinemas" },
                                      { $unwind: "$cinemas.salas" },
                                      { $unwind: "$cinemas.salas.sessoes" },
                                      /* agrupamento, para tirar as repetições */
                                      { $group: { _id: { titulo: "$cinemas.salas.sessoes.filme", _id: "$cinemas.salas.sessoes.idFilme" } } }
                                    ])
                        .toArray();
  // mapeia pra subir 1 nivel, retirando objeto inutil 
  // de { _id: { titulo, _id } }
  // para titulo, _id
  return group.map(g => g._id); 
}; 


/**
 * Return sessions by city id
 */
async function getMovieSessionByCityId(movieId, cityId){
  const db = await database.connect();
  //
  const group = await db.collection('catalog')
                        .aggregate([ 
                                      /* match mesma coisa que os filtros */
                                      { $match: { "_id": new ObjectId(cityId) } },
                                      /* unwind +- desenrola! joga tudo no mesmo nível */
                                      { $unwind: "$cinemas" },
                                      { $unwind: "$cinemas.salas" },
                                      { $unwind: "$cinemas.salas.sessoes" },
                                      { $match: { "cinemas.salas.sessoes.idFilme": new ObjectId(movieId)} },
                                      /* agrupamento, para tirar as repetições */
                                      { $group: { _id: { 
                                                        _id: "$cinemas.salas.sessoes.idFilme",
                                                        titulo: "$cinemas.salas.sessoes.filme", 
                                                        idCinema: "$cinemas._id",
                                                        cinema: "$cinemas.nome",
                                                        sala: "$cinemas.salas.nome",
                                                        sessao: "$cinemas.salas.sessoes"
                                                       } } }
                                    ])
                        .toArray();
  // mapeia pra subir 1 nivel, retirando objeto inutil 
  // de { _id: { titulo, _id } }
  // para titulo, _id
  return group.map(g => g._id); 
}; 


module.exports = { getAllCities,
                   getCinemasByCityId,
                   getMoviesByCinemaId,
                   getMoviesByCityId,
                   getMovieSessionByCityId };
