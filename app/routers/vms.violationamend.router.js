const vmsController = require("../controllers/vms.violationamend.controllers")
module.exports = app => {
   app.post('/amendViolation', vmsController.amendViolation);
}