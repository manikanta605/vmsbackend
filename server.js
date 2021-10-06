
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const jwt = require("jsonwebtoken");

const app = express();
app.use(cors())
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) { //allow cross origin requests
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

// set port, listen for requests

global.__basedir = __dirname;
 

app.use(express.static('resources'));

function ensureToken(req, res, next){
  const bearerHeader = req.headers["authorization"];


  if (bearerHeader == null) return
  next({status:401,message:'authorization missing'})  
  jwt.verify(authHeader, Constant.ACCESS_TOKEN_SECRET,(err, user) =>
  {
    if (err) return next({status:403,message:err.message})
    req.user = user;
    next()
   })

   
if(typeof bearerHeader !== 'undefined'){

const bearer = bearerHeader.split(" ");
const bearerToken = bearer[1];
req.token = bearerToken;
next();

}else{
res.sendStatus(403);
}
}


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});




// require('dotenv').config();
// const express = require("express");
// const bodyParser = require("body-parser");


// const app = express();
// app.use(bodyParser.json());

app.get('/api', (req, res) => {
    res.json({
        statuCode:0,
        message:"This is Server"
    })
})

app.post('/api/login', (req, res)=>{
  // auther User

  const user = { id: 3};
  const token = jwt.sign({user}, 'my_secret_key');
  res.json({
    token:token
  })
})

app.get('/api/protected', ensureToken, (req, res)=>{

  jwt.verify(req.token, 'my_secret_key', (err, result)=>{
    if(err){
      res.sendStatus(403);
    }else{
      res.json({
        text:'this is protected'
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
