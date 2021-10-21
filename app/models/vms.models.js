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
        },
        voliationTitleList:(id,callback) =>{
            
            db.query("SELECT * FROM `tbl_violation_titles` where side_type_code=?",[id], (error, result)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, result);
            })
        },
        sideCode:(id,callback) =>{
            
            db.query("SELECT side_code_id,side_code_no,description,description_eng,side_code_id,side_type_code,side_code_no,car_no,car_sid,class_pad_new,class_pad,calar_pad,license_no,document_type,document_no FROM `tbl_side_codes` where side_type_code=? limit 10",[id], (error, result)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, result);
            })
        },
        sideCodeWiseData:(id,callback) =>{
            db.query("SELECT side_code_id,side_code_no,description,description_eng FROM `tbl_side_codes` where side_code_id=?",[id], (error, result)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, result);
            })
        },
        plateSourceList:(id,callback) =>{
            db.query("SELECT car_sid,raqab_code,adp_code,name_eng,name_ar FROM `tbl_plate_sources`",[], (error, result)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, result);
            })
        },
        plateCodeList:(id,callback) =>{
            db.query("SELECT id,source_code,raqab_code,raqab_desc_eng,raqab_desc_arb FROM `tbl_plate_codes`",[], (error, result)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, result);
            })
        },
        oldCode:(id,callback) =>{
            db.query("SELECT id,class_code,class_name,class_name_eng FROM  `tbl_class_pad` where status='1'",[], (error, result)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, result);
            })
        },
        violationCategory:(id,callback) =>{
            db.query("SELECT fine_category_id,description,description_eng FROM  `tbl_fine_categories` where side_type=?",[id], (error, result)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, result);
            })
        },
        fineCategoryCode:(id,callback) =>{
            db.query("SELECT fine_amount,per_day,fine_code_id,fine_code_reffer_no,description,description_eng FROM  `tbl_fine_category_codes` where fine_category_id=?",[id], (error, result)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, result);
            })
        },
        getFineamount:(id,callback) =>{
            db.query("SELECT fine_amount,per_day,fine_code_id,fine_code_reffer_no,description,description_eng FROM  `tbl_fine_category_codes` where fine_code_id=?",[id], (error, result)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, result);
            })
        },
        documentType:(id,callback) =>{
            db.query("SELECT id,name_eng,name_arb FROM  `tbl_document_type`",[], (error, result)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, result);
            })
        },
        getArea:(id,callback) =>{
            db.query("SELECT area_id,area_code,name_eng,name_ar FROM  `tbl_areas`",[], (error, result)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, result);
            })
        },
        reservedCode:(id,callback) =>{
            db.query("SELECT reserved_id,reserved_code,name_eng,name_arb FROM  `tbl_reserved`",[], (error, result)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, result);
            })
        },
        voilations:(id,callback) =>{
            // console.log("SELECT reference_number,license_plate_no,fine_amount,created_on,fine_place,payment_status,side_type FROM  `tbl_voilations` where created_by='90' order by id DESC;")
            db.query("SELECT document_no,license_no,reference_number,license_plate_no,fine_amount,created_on,fine_place,payment_status,side_type FROM  `tbl_voilations` where created_by='93' order by id DESC;",[], (error, result)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, result);
            })
        },
        // getViolationListIdWise:(id, callback) =>{
        //     db.query("SELECT reference_number,license_plate_no,fine_amount,created_on,fine_place,payment_status,side_type FROM  `tbl_voilations` where created_by='?'",[id], (error, result)=>{
        //         if(error){
        //             return callback(error);
        //         }
        //         return callback(null, result);
        //     })
        // }
        
        
}