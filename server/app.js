const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dataRoutes = require('./api/routes/datas');

const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(
    'mongodb+srv://eirplan:' +
     process.env.MONGO_ATLAS_PW +
    '@eirplan.dprmb.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {
        useMongoClient: true 
    });

app.use('/data',dataRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    });
});

module.exports = app;