const vmsController = require("../controllers/vms.violationView.controllers")
module.exports = app => {
   app.get('/viewViolations/:id', vmsController.viewViolations);
}