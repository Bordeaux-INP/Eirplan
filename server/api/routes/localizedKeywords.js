// const express = require('express');
// const router = express.Router();

// const mongoose = require('mongoose');

// const LocalKeywords = require('../models/localKeyword');


// const XmlReader = require('../../xmlReader');
// let svgFile = XmlReader.svgReader('RDC.svg');
// // console.log('RDC', RDC);
// let Stands = svgFile.svg.g.g.path;
// console.log(Stands[0].d);


// router.get('/', (req, res, next) => {
//     res.status(200).json({
//         message : "Handeling GET requests to /datas",
//     });
// });

// router.post('/', (req, res, next) => {
//     const forLoop = async _ =>{
//         for (let key in Stands) {
//             // key = 0;
//             console.log(key);
//             if(Stands[key].desc){
//                 try{
//                 const localKeyword = await new LocalKeywords({
//                     _id: new mongoose.Types.ObjectId(),
//                     name: Stands[key].id,
//                     description: Stands[key].desc.$t,
//                     position : Stands[key].d
            
//                 });
             
            
//                 console.log('after if');
//                 localKeyword
//                 .save()
//                 .then(result => {
//                     console.log(result);
//                 })
//                 .catch(err => console.log(err)) ;
//                 res.status(200).json({
//                     message : 'Handeling POST requests to /localKeywords',
//                     createdData: localKeyword
//                 });
            
//             }catch(error){
//                 console.log(error);
//             }
//             }
//         }
//     }
//     forLoop();

// });

// router.get("/:localKeywordId", (req, res, next) => {
//     const id = req.params.localKeywordId;
//     LocalKeywords.findById(id)
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