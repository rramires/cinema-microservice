const Joi = require('joi');


/**
 * Movie schema
 */
const schema = Joi.object({
    titulo: Joi.string()
               .required()
               .min(2)
               .max(150),
    sinopse: Joi.string()
                .required()
                .min(10)
                .max(512),
    duracao: Joi.number()
                .required()
                .integer()
                .min(10),
    dataLancamento: Joi.date()
                       .required(),
    imagem: Joi.string()
                .required()
               .pattern(/https?:\/\/.+\.(jpe?g|png|gif|svg)/i),
    categorias: Joi.array()
                   .items(Joi.string())
                   .required()
                   
});


module.exports = schema;