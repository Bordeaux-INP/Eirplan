const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const localizedKeywordsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    logo: String,
    position : { type: String , coordinates: [Number, Number] } 

});

const floorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, unique: true},
    description: String,
    svg: String,
    keywords : [localizedKeywordsSchema]
});

floorSchema.plugin(mongooseUniqueValidator);

const planSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    floors: [floorSchema]
});

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : String,
    logo : String,
    companyLogo : String,
    plan: planSchema
});

module.exports = mongoose.model('LocalKeywords', localizedKeywordsSchema);
module.exports = mongoose.model('Floor', floorSchema);
module.exports = mongoose.model('Plan', planSchema);
module.exports = mongoose.model('Event', eventSchema);