const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Data = require('../models/data');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message : "Handeling GET requests to /datas",
    });
});

router.post('/', (req, res, next) => {
    const data = new Data({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description

    });

    data
     .save()
    .then(result => {
        console.log(result);
    })
   .catch(err => console.log(err)) ;
   res.status(200).json({
        message : 'Handeling POST requests to /datas',
        createdData: data
    });
    

});

router.get("/:dataId", (req, res, next) => {
    const id = req.params.dataId;
    Data.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({error :err});
    });
})

// router.post('/:dataId', (req, res, next) => {
//     const id = req.params.dataId,
    
// });
module.exports = router;