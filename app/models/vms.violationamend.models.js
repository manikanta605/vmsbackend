const db = require('../config/db');

exports.tbl_violations_amend_requests = async (data, callback) =>{
var sql = "INSERT INTO `tbl_violations_amend_requests`(`violation_id`, `amend_message`, `user_id`, `status`, `created_on`,`images`) VALUES ('" + data.violation_id + "','" + data.amend_message + "','" + data.user_id + "','Not Approved','" + data.created_on + "','" + data.file + "')";
    db.query(sql, [], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    })
}

exports.tbl_violations_amend_requests_list = async(data, callback) =>{
    db.query("SELECT ar.* FROM `tbl_voilations` v INNER JOIN tbl_violations_amend_requests ar " + 
    "ON v.id=ar.violation_id " +
    "where v.reference_number='"+data+"'", [], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    }) 
}


exports.amendReqestList = async(data, callback) =>{
    db.query("SELECT * FROM `tbl_violations_amend_requests` where user_id='"+data+"'", [], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    }) 
}

