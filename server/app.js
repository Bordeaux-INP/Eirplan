const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const crypto = require('crypto');
const path = require('path');

// const dataRoutes = require('./api/routes/datas');

const app = express();

app.set('view engine', 'ejs'); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_methode'));

const mongoURI = 'mongodb+srv://eirplan:eirplan@eirplan.dprmb.mongodb.net/Eirplan?retryWrites=true&w=majority';
    
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const conn = mongoose.connection;

let gfs;

// conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => {
    console.log("\nConnected to DB !");
    //Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('plan');
});

//Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {

            console.log('err reject');
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'plan'
          };
          console.log('resolve :', filename,fileInfo);

          resolve(fileInfo);
        });
      });
    }
  });
const plan = multer({ storage });

// @route GET /
// @desc Loads form
app.get('/', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
          res.render('index', { files: false });
        } else {
          files.map(file => {
            if (
              file.contentType === 'image/svg'
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

// @route POST /plan
// @desc Uploads file to DB

app.post('/post',  (req, res) => {
    // console.log(file);
    // req.file.save();
    return res.json({file : req.file});

    // res.redirect('/');
});

// @route GET /files
// @desc Display all files in JSON
app.get('/files', (req, res) => {
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
app.get('/files/:filename', (req, res) => {
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
app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({filename : req.params.filename}, (err, file) => {
        if(!file || file.length === 0 ){
            return res.status(404).json({
                err : 'No file exists'
            });
        }
        //check if image
        if(file.contentType == 'image/svg'){
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


// app.use('/data',dataRoutes);

// app.use((req, res, next) => {
//     const error = new Error('Not found');
//     error.status(404);
//     next(error);
// });

// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message,
//         }
//     });
// });

module.exports = app;