const mongoose = require('mongoose');

const floorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    svg : String

});

module.exports = mongoose.model('Floor', floorSchema);