const vmsController = require("../controllers/vms.editviolation.controllers")
module.exports = app => {
   
   app.get('/editViolation/:id', vmsController.editViolation);
   app.post('/updateViolationIdWise/:id', vmsController.updateViolationIdWise);
}