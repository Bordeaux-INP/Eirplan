const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
// const crypto = require('crypto');
const path = require('path');


const eventRoutes = require('./api/routes/events');
const svgToSchemaRoutes = require('./api/routes/svgToSchema');
const storageFunction = require('./utils/storageFunction');

const conn = require('./utils/connection');
const mongoURI = 'mongodb+srv://eirplan:eirplan@eirplan.dprmb.mongodb.net/Eirplan?retryWrites=true&w=majority';


const app = express();

app.set('view engine', 'ejs'); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_methode'));

let gfs_floors;
let gfs_event_logo;
let gfs_host_logo;


conn.once('open', () => {
    console.log("\nConnected to DB !");
    //Init stream svg
    gfs_floors = Grid(conn.db, mongoose.mongo);
    gfs_floors.collection('floor');

    //Init stream event logo
    gfs_event_logo = Grid(conn.db, mongoose.mongo);
    gfs_event_logo.collection('event_logo');

    //Init stream host logo
    gfs_host_logo = Grid(conn.db, mongoose.mongo);
    gfs_host_logo.collection('host_logo');

    console.log('Created collections');
});

// *************************** Upload SVG to Data Base *****************************************//


const floorStorage = storageFunction('floor', mongoURI);
const eventLogoStorage = storageFunction('event_logo', mongoURI);
const hostLogoStorage = storageFunction('host_logo', mongoURI);

function uploadWrapper(req, res) {
  try{
    console.log('start try');

    eventLogoStorage.single('file_event_logo');
    console.log('event');

    hostLogoStorage.single('file_host_logo');
    console.log('host');
    floorStorage.single('file_floor');
    console.log('file floor');



  }catch(err){
    console.log('Post error:', err)
  }
  

}

function streamToString (stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

async function getEventName (req, res){
  
}

async function getKeyWords (req, res){
  
}

async function getLogos(eventId=0){
  eventLogo = await gfs_event_logo.files.find().toArray();
  if(!eventLogo || eventLogo.length === 0){
    return { 
      status : '404',
      err : 'Error: Event logo does not exist'
    };
  }

  hostLogo = await gfs_host_logo.files.find().toArray();
  if(!hostLogo || hostLogo.length === 0){
    return { 
      status : '404',
      err : 'Error: Host logo does not exist'
    };
  }

  return { 
    status:'200',
    eventLogo: eventLogo,
    hostLogo: hostLogo
  };
}

async function getFloors(eventId=0){
  files = await gfs_floors.files.find().toArray();
  // console.log('files', files);
  
  if(!files || files.length === 0){
    return { 
      status : '404',
      data : 'No floors exist'
    };
  }
  
  let data = []
  for (const file of files) {
    try {
      if(file && file.length != 0){
        const readstream = gfs.createReadStream(file.filename);
        const stringData = await streamToString(readstream);
        data.push(stringData);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { 
    status:'200',
    data : data
  };
} 

// async function getHostLogo (req, res){
//   output = await getCollectionData(gfs_host_logo)
//   res.status(output.status).json({output: output.data})  
// }

// async function getEventLogo (req, res){
//   output = await getCollectionData(gfs_event_logo)
//   res.status(output.status).json({output: output.data})  
// }


// async function getFloors(req, res){
//   output = await getCollectionData(gfs_floors)
//   res.status(output.status).json({output: output.data})  
// }


// async function getCollectionData(gfs){
//   files = await gfs.files.find().toArray();
//   // console.log('files', files);
  
//   if(!files || files.length === 0){
//     return { 
//       status : '404',
//       data : 'No files exist'
//     };
//   }
  
//   let data = []
//   for (const file of files) {
//     try {
//       if(file && file.length != 0){
//         const readstream = gfs.createReadStream(file.filename);
//         const stringData = await streamToString(readstream);
//         data.push(stringData);
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return { 
//     status:'200',
//     data : data
//   };
// } 

async function getEventData (req, res){
  try {
    let floors = await getFloors();
    let logos = await getLogos();

    if (floors.status === 404 || logos.status === 404) {
      throw new Error('Error while fetching data from database, floors: '+floors.status+', logos: '+logos.status);
    }

    var eventData = {
      // eventName: await getEventName(eventId),
      eventLogo: logos.eventLogo,
      hostLogo: logos.hostLogo,
      floors: floors.data
      // keyWords: await getKeyWords(eventId)
    }
    return(res.status(200).json(eventData));
    
  } catch (error) {
    console.log(error);
    return res.status(404).json({err:'Oops, there was an error while fetching event data!'})
  }
}


// app.get('/interactiveDisplay', getFloors);
app.get('/interactiveDisplay', getEventData);

// @route GET /
// @desc Loads form
app.get('/', (req, res) => {
  gfs_floors.files.find().toArray((err, files) => {
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


// user click on submit button => uploads all the file to DBs
// app.post('/post', uploadWrapper, (req, res) => {

//   res.redirect('/');
//   res.end('done');

// });

app.post('/post',floorStorage.single('file_floor'),(req,res) =>{
  res.redirect('/');
});
// app.post('/post',eventLogoStorage.single('file_event_logo'),(req,res) =>{
//   res.redirect('/');
// });

// app.post('/post',hostLogoStorage.single('file_host_logo'),(req,res) =>{
//   res.redirect('/');
// });


// @route GET /files
// @desc Display all files in JSON
app.get('/files', (req, res) => {
  gfs_floors.files.find().toArray((err, files) => {
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
  gfs_floors.files.findOne({filename : req.params.filename}, (err, file) => {
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
  gfs_floors.files.findOne({filename : req.params.filename}, (err, file) => {
    if(!file || file.length === 0 ){
        return res.status(404).json({
            err : 'No file exists'
        });
    }
    //check if image
    if(file.contentType === 'image/svg+xml'){
        //Read output tp browser
        const readstream = gfs_floors.createReadStream(file.filename);
        console.log('File',file);
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
app.delete('/files/:id', (req, res) => {
  gfs_floors.remove({_id: req.params.id, root: 'floor'}, (err, gridStore) => {
      if (err){
          return res.status(404).json({err: err});
      }
      res.redirect('/');
  });
});


// @route DELETE /image/:id
// @desc Delete file
app.delete('/image/:id', (req, res) => {
  gfs_floors.remove({_id: req.params.id, root: 'floor'}, (err, gridStore) => {
      if (err){
          return res.status(404).json({err: err});
      }
      res.redirect('/');
  });
});

app.get('/download', function(req, res){
  const file = `${__dirname}/upload-folder/`;
  res.download(file); // Set disposition and send it.
});


// ****************************************************************************** //

app.use('/svgToSchema', svgToSchemaRoutes);



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