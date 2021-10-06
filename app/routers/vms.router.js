const vmsController = require("../controllers/vms.controllers")
module.exports = app => {
   app.post('/loginValidation', vmsController.login);

   app.get('/userList', vmsController.userList);


   //Geting VoliationType List

   app.get('/voliationTypeList',ensureToken, vmsController.voliationTypeList);
   //app.post('/singleCreate', vmsController.singleCreate);
}


function ensureToken(req, res, next){
   const bearerHeader = req.headers["authorization"];
 if(typeof bearerHeader !== 'undefined'){
 
 //const bearer = bearerHeader.split(" ");
 const bearerToken = bearerHeader;
 req.token = bearerToken;
 next();
 
 }else{
 res.sendStatus(403);
 }
 }