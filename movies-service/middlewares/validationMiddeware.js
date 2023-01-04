//
const schema = require('../schemas/movieSchema');


/**
 * Validate movie schema
 */
const validateMovie = (req, res, next) => {
    const { error } = schema.validate(req.body);
    //
    if(error){
        // 422 Unprocessable Entity
        return res.status(422).json(error.details.map(d => d.message));
    }
    else{
        next();
    }
}


module.exports = { validateMovie };