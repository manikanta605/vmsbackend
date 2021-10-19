const vmsController = require("../controllers/vms.vioilationAdd.controllers")
module.exports = app => {
   app.post('/addValidation', vmsController.addValidation);



}