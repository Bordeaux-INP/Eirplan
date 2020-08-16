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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_methode'));

const mongoURI = 'mongodb+srv://eirplan:eirplan@eirplan.dprmb.mongodb.net/Eirplan?retryWrites=true&w=majority';
    
const conn = mongoose.createConnection(
    'mongodb+srv://eirplan:eirplan@eirplan.dprmb.mongodb.net/Eirplan?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

let gfs;


// conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => {
    console.log("\nConnected to DB !");
    //Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

//Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });

// @route GET /
// @desc Loads form
app.get('/', (req, res) => {
    res.render('index');
});

// @route POST /plan
// @desc Uploads file to DB

app.post('/upload', upload.single('file'), (req, res) => {
    // res.json({file : req.file});
    res.redirect('/');
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

mongoose.Promise = global.Promise;

// app.use('/data',dataRoutes);

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