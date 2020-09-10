const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const localizedKeywordsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    logo: String,
    position : String
    // position : { type: String , coordinates: [Number, Number] } 

});

module.exports = mongoose.model('LocalKeywords', localizedKeywordsSchema);
