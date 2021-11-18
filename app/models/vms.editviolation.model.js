const db = require('../config/db');

exports.tbl_voilations = async(id,callback) =>{   
    db.query("SELECT notes FROM `tbl_voilations` WHERE `id`='"+id+"';", [], (error, result) => {
             if (error) {
                 return callback(error);
             }
             return callback(null, result);
         })
}
exports.tbl_voilations_update = async(id,data,callback) =>{   
    console.log("UPDATE `tbl_voilations` SET `notes`='"+data.notes+"' WHERE `id`='"+id+"'");
   
    db.query("UPDATE `tbl_voilations` SET `notes`='"+data.notes+"' WHERE `id`='"+id+"'", [], (error, result) => {
             if (error) {
                 return callback(error);
             }
             return callback(null, result);
         })
}