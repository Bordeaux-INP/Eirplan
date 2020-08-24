const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Floor = require('../models/floor');

const plan = require('../../app');

// @route GET /
// @desc Loads form
router.get('/', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
          res.render('index', { files: false });
        } else {
          files.map(file => {
            if (
              file.contentType === 'image/svg+xml' || file.contentType === 'image/png'
            ) {
              file.isImage = true;
            } else {
              file.isImage = false;
            }
          });
          res.render('index', { files: files });
        }
      });
});

// @route Post /
// @desc post schema

router.post('/post', (req, res) => {
    const floor = new Floor({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        svg : plan.single('file')
    });

    floor
     .save()
    .then(result => {
        console.log(result);
    })
   .catch(err => console.log(err)) ;
   res.status(200).json({
        message : 'Handeling POST requests to /datas',
        createdData: floor
    });
    
    res.redirect('/');

});

// @route POST /plan
// @desc Uploads file to DB

// router.post('/post', plan.single('file'), (req, res) => {
//     // console.log(file);
//     // req.file.save();
//     // return res.json({file : req.file});

//     res.redirect('/');
// });

// @route GET /files
// @desc Display all files in JSON
router.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if(!files || files.length === 0){
            return res.status(404).json({
                err : 'No files exist'
            });
        }

        return res.json(files);
    });
});


// @route GET /file/:filename
// @desc Display one file in JSON
router.get('/files/:filename', (req, res) => {
    gfs.files.findOne({filename : req.params.filename}, (err, file) => {
        if(!file || file.length === 0 ){
            return res.status(404).json({
                err : 'No file exists'
            });
        }
        return res.json(file);
    });
});


// @route GET /Image/:filename
// @desc Display one file in JSON
router.get('/image/:filename', (req, res) => {
    gfs.files.findOne({filename : req.params.filename}, (err, file) => {
        if(!file || file.length === 0 ){
            return res.status(404).json({
                err : 'No file exists'
            });
        }
        //check if image
        if(file.contentType == 'image/svg+xml' || file.contentType === 'image/png'){
            //Read output tp browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err : 'Not an SVG'
            });
        }
    });
});

// @route DELETE /files/:id
// @desc Delete file
router.delete('/files/:id', (req, res) => {
    gfs.remove({_id: req.params.id, root: 'plan'}, (err, gridStore) => {
        if (err){
            return res.status(404).json({err: err});
        }
        res.redirect('/');
    });
});

module.exports = router;

