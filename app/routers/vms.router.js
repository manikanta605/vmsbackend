const vmsController = require("../controllers/vms.controllers")
module.exports = app => {
   app.post('/loginValidation', vmsController.login);

   app.get('/userList', vmsController.userList);


   //Get VoliationType List

   app.get('/voliationTypeList',ensureToken, vmsController.voliationTypeList);


   //Get Voliation Title
   app.get('/voliationTitleList/:id',ensureToken, vmsController.voliationTitleList);

   //Get Side Code
   app.get('/sideCode/:id',ensureToken, vmsController.sideCode);
   //Get Side Code Wise Data
   app.get('/sideCodeWiseData/:id',ensureToken, vmsController.sideCodeWiseData);



   //Get Plate Source
   app.get('/plateSourceList',ensureToken, vmsController.plateSourceList);

    //Get Plate Code
    app.get('/plateCodeList',ensureToken, vmsController.plateCodeList);

    //Get Old Code
    app.get('/oldCode',ensureToken, vmsController.oldCode);

    //Get Violation Category
    app.get('/violationCategory/:id',ensureToken, vmsController.violationCategory);


    //Get Fine Code
    app.get('/fineCode/:id',ensureToken, vmsController.fineCode);

    //Get Document type
    app.get('/documentType',ensureToken, vmsController.documentType);


    //Get Area
    app.get('/getArea',ensureToken, vmsController.getArea);
    
    
     //Get Area
     app.get('/reservedCode',ensureToken, vmsController.reservedCode);

     //Get voilations
     app.get('/voilations',ensureToken, vmsController.voilations);

      //Get voilations
      app.get('/plateSourceId/:id', vmsController.plateSourceId);
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