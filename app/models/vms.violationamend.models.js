const db = require('../config/db');

exports.tbl_violations_amend_requests = async (data, callback) =>{

var sql = "INSERT INTO `tbl_violations_amend_requests`(`violation_id`, `amend_message`, `user_id`, `status`, `created_on`) VALUES ('" + data.violation_id + "','" + data.amend_message + "','" + data.user_id + "','Not Approved','" + data. created_on + "')";
    db.query(sql, [], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    })
}