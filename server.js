
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const jwt = require("jsonwebtoken");
var methodOverride = require('method-override');
var multer  =   require('multer');
var fs = require("fs");
const app = express();
app.use(cors())
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) { //allow cross origin requests
  if (req.method === 'OPTIONS') {
    console.log('!OPTIONS');
    var headers = {};
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
    res.writeHead(200, headers);
    res.end();
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

// configuration
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users

app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

require("./app/routers/vms.router")(app);
require("./app/routers/vms.vioilationAdd.router")(app);
require("./app/routers/vms.violationView.router")(app);
require("./app/routers/vms.violationamend.router")(app);

// set port, listen for requests

global.__basedir = __dirname;


app.use(express.static('resources'));

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader == null) return
  next({ status: 401, message: 'authorization missing' })
  jwt.verify(authHeader, Constant.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return next({ status: 403, message: err.message })
    req.user = user;
    next()
  })

  if (typeof bearerHeader !== 'undefined') {

    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();

  } else {
    res.sendStatus(403);
  }
}

// file upload code
var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, process.env.UPLOADPATH)
  },
  filename: function (req, file, cb) {
      // console.log(file);
      var datetimestamp = Date.now();
      //cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
      cb(null, file.originalname)
  }
});

var uploadMultiple = multer({ //multer settings
      storage: storage
  }).array('file',20);

var uploadSingle = multer({ //multer settings
      storage: storage
  }).single('file');

//app.get('*', function(req, res) {
//  res.sendfile('./public/index.html'); // load our public/index.html file
//});

var upload = multer({
  storage: storage,
  limits: {
      // Setting Image Size Limit to 2MBs
      fileSize: 2000000
  },
  fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          //Error 
          cb(new Error('Please upload JPG and PNG images only!'))
      }
      //Success 
      cb(undefined, true)
  },
  filename: function (req, file, cb) {
    // console.log(file);
    var datetimestamp = Date.now();
    cb(null, )
  }
  })
app.post('/uploadfile', upload.single('uploadedImage'), (req, res, next) => {
  const file = req.file
  console.log(req);
  if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
  }
  res.status(200).send({
      statusCode: 200,
      status: 'success',
      uploadedFile: file
  })

}, (error, req, res, next) => {
  console.log(error);
  res.status(400).send({
      error: error.message
  })
});


// app.post('/uploadBulkImage', upload.array('image',4), (req, res,next) => {
//   const file = req.file;
//   console.log(req.file);
//   if (!file) {
//       const error = new Error('Please upload a file')
//       error.httpStatusCode = 400
//       return next(error)
//   }
//   res.status(200).send({
//       statusCode: 200,
//       status: 'success',
//       uploadedFile: file
//   })

// }, (error, req, res, next) => {
//   console.log(error);
//   res.status(400).send({
//       error: error.message
//   })
// });

app.post('/uploadBulkImage', upload.array('files',4), (req, res, next) => {
  const file = req.files
  console.log(req.files);
  if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
  }
  res.status(200).send({
      statusCode: 200,
      status: 'success',
      uploadedFile: file
  })

}, (error, req, res, next) => {
  console.log(error);
  res.status(400).send({
      error: error.message
  })
});


// require('dotenv').config();
// const express = require("express");
// const bodyParser = require("body-parser");


// const app = express();
// app.use(bodyParser.json());


/** API for single file upload */
app.post('/uploadPhotos', function(req, res) {
  console.log('upload',req.files);
  uploadMultiple(req.file,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json(req.file);
    })
});


app.get('/api', (req, res) => {
  res.json({
    statuCode: 0,
    message: "This is Server"
  })
})

app.post('/api/login', (req, res) => {
  // auther User

  const user = { id: 3 };
  const token = jwt.sign({ user }, 'my_secret_key');
  res.json({
    token: token
  })
})

app.get('/api/protected', ensureToken, (req, res) => {

  jwt.verify(req.token, 'my_secret_key', (err, result) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        text: 'this is protected'
      })
    }
  })

});


// require("./app/routers/organization.routers")(app);
// require("./app/routers/menu.router")(app);




// const PORT = process.env.APP_PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


