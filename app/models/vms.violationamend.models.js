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

exports.tbl_violations_amend_requests_list = async(data, callback) =>{

    console.log(data);
    //return;
// console.log("SELECT amend.`violation_id`,amend.`amend_message`,amend.`user_id`,amend.`status`,amend.`created_on`,vio.id,vio.reference_number FROM tbl_violations_amend_requests as amend INNER JOIN tbl_voilations as vio ON amend.violation_id=vio.id where user_id='"+data+"'");
// return;
    db.query("SELECT ar.* FROM `tbl_voilations` v INNER JOIN tbl_violations_amend_requests ar " + 
    "ON v.id=ar.violation_id " +
    "where v.reference_number='"+data+"'", [], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    }) 
}

