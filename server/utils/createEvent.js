const mongoose = require('mongoose');

const Event = require('../models/event');
const xmlToFloor = require('./xmlToFloorSchema');

const createEvent = function(floorXmls, floorNames){
    let floors = [];

    for (let index = 0; index < floorXmls.length; index++) {
        floors.push(xmlToFloor(floorXmls[index], floorNames[index]));    
    }
    
    var plan = {
        name: 'ENSEIRB-Matmeca',
        floors: floors
    }
    
    var event = new Event ({
        _id: new mongoose.Types.ObjectId(),
        name: 'Forum Ingénib',
        logoEvent: 'logo Ingénib',
        logoHost: 'logo ENSEIRB',
        plan: plan
    
    });

    return(event);
}

module.exports.createEvent = createEvent;
