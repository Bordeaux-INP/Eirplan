// const express = require('express');
// const router = express.Router();

// const mongoose = require('mongoose');


// const Plan = require('../models/plan');
// const Event = require('../models/event');


// router.get('/', (req, res, next) => {
//     res.status(200).json({
//         message : "Handeling GET requests to /datas",
//     });
// });

// router.post('/', (req, res, next) => {
//     const event = new Event({
//         _id: new mongoose.Types.ObjectId(),
//         name: req.body.name,
//         logo: req.body.logo,
//         companyLogo: req.body.companyLogo,
//         plan: Plan

//     });

//     event
//     .save()
//     .then(result => {
//         console.log(result);
//     })
//    .catch(err => console.log(err)) ;
//    res.status(200).json({
//         message : 'Handeling POST requests to /events',
//         createdData: event
//     });
    

// });

// router.get("/:eventId", (req, res, next) => {
//     const id = req.params.eventId;
//     Event.findById(id)
//     .exec()
//     .then(doc => {
//         console.log(doc);
//         res.status(200).json(doc);
//     })
//     .catch(err => {
//         console.log(err),
//         res.status(500).json({error :err});
//     });
// })

// // router.post('/:dataId', (req, res, next) => {
// //     const id = req.params.dataId,
    
// // });
// module.exports = router;