const db = require('../config/db');

module.exports = {
    login:(data, callback) =>{
        //console.log("SELECT * FROM `tbl_user` WHERE email_id='"+data.email+"' and password='"+data.password+"' and user_type='12'");
        db.query("SELECT * FROM `tbl_user` WHERE email_id='"+data.email+"' and password='"+data.password+"' and user_type='12'", [], (error, result)=>{
            if(error){
                return callback(error);
            }
            return callback(null, result);
        }) 
           
        },
        listData:(callback) =>{
            db.query("SELECT * FROM `tbl_user`",[], (error, result)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, result);
            })
        },
        voliationTypeList:(callback) =>{
            db.query("SELECT * FROM `tbl_side_types` where source_id='2'",[], (error, result)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, result);
            })
        }
}