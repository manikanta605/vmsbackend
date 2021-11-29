const db = require('../config/db');

exports.tbl_plate_sources = async (plat_code, callback) => {
    db.query("SELECT car_sid,raqab_code,adp_code,name_eng,name_ar FROM `tbl_plate_sources` where raqab_code='" + plat_code + "' limit 1", [plat_code], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    })
}

exports.tbl_source_code = async (data, callback) => {

    db.query("INSERT INTO `tbl_violation_titles`(`side_type_code`, `violation_eng_title`, `violation_ar_title`, `created_on`, `created_by`,`status`) VALUES ('" + data.side_type_code + "','" + data.violation_eng_title + "','" + data.violation_ar_title + "','" + data.created_by + "','" + data.created_on + "','Active')", [], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    })
}

exports.tbl_side_code = async (data, callback) =>{
    if(data.voilationType == '1'){

        var sqlDb = "INSERT INTO `tbl_side_codes`(`side_type_code`,`description`, `description_eng`, `document_type`, `document_no`) VALUES ('" + data.voilationType + "','" + data.description + "','" + data.description_eng + "','" + data.document_type + "','" + data.document_no + "')";

    }else if(data.voilationType == '2'){
        var sqlDb = "INSERT INTO `tbl_side_codes`(`side_type_code`,`description`, `description_eng`, `license_no`) VALUES ('" + data.voilationType + "','" + data.description + "','" + data.description_eng + "','" + data.license_no + "')";

    }else{
        var sqlDb = "INSERT INTO `tbl_side_codes`(`side_type_code`,`description`, `description_eng`, `car_no`, `calar_pad`, `class_pad_new`) VALUES ('" + data.voilationType + "','" + data.description + "','" + data.description_eng + "','" + data.car_no + "','" + data.calar_pad + "','" + data.class_pad_new + "')";

    }
    //console.log("sqlDb", sqlDb);
    db.query(sqlDb, [], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    })
}

// Insert tbl_voilations Creation
exports.tbl_voilations = async (data,InsertsidecodeData,violationTitleInsertId,referenceNumber,fineNo,callback) => {
       var sql = "INSERT INTO `tbl_voilations`(`reference_number`,`side_type`, `violation_title_id`, `side_code`, `document_type`, `document_no`,`description_side_code`,`license_no`,`license_plate_no`,`plate_source`,`plate_code`,`plate_color`,`old_code`,`fine_category`,`fine_code`,`fine_place`,`area`,`fine_no`,`notes`,`recipient_person`,`phone`,`recipient_mobile`,`email`,`reserved_code`,`reserved_number`,`address`,`description`,`daily_fines`,`violation_docs`,`fine_amount`,`front_image`,`plate_category`,`source`,`source_id`,`created_by`,`created_on`,`origin`,`identity_doc`,`violation_video`) VALUES ('" + referenceNumber + "','" + data.voilationType + "','" + violationTitleInsertId + "','" +InsertsidecodeData + "','" + data.documentType + "','" + data.documentNo + "','" + data.sideCodeDescription + "','" + data.licenseNo + "','" + data.plateNo + "','" + data.plateSource + "','" + data.plateCode + "','" + data.plateColor + "','" + data.oldCode + "','" + data.violationCategory + "','" + data.fineCode + "','" + data.finePlace + "','" + data.area + "','" + fineNo + "','" + data.fineNotes + "','" + data.recipientPerson + "','" + data.phone + "','" + data.recipientMobile + "','" + data.email + "','" + data.reservedCode + "','" + data.reservedIdNumber + "','" + data.address + "','" + data.description + "','" + data.dailyFines + "','" + data.mulltifiles + "','" + data.fineAmount + "','" + data.camerafiles + "','1','MANUAL','2','" + data.created_by + "','" + data.created_on + "','Mobile','"+data.identityDoc+"','"+data.video+"')";
      
   db.query(sql, [], (error, result) => {
       if (error) {
           return callback(error);
       }
       return callback(null, result);
   })
}


exports.tbl_violation_reference = async(voilationType,callback) =>{
      db.query("select id,reference_number from `tbl_voilations` where side_type='"+voilationType+"' order by id DESC limit 1", [], (error, result) => {
               if (error) {
                   return callback(error);
               }
               return callback(null, result);
           })
}
exports.sideCodeSearch = async(id,body,callback) =>{
 

//    console.log("SELECT side_code_id,side_code_no,description,description_eng,side_code_id,side_type_code,side_code_no,car_no,car_sid,class_pad_new,class_pad,calar_pad,license_no,document_type,document_no FROM `tbl_side_codes` where side_type_code='"+id+"' and description  LIKE '%"+body+"%' limit 20");
//    return;
    db.query("SELECT side_code_id,side_code_no,description,description_eng,side_code_id,side_type_code,side_code_no,car_no,car_sid,class_pad_new,class_pad,calar_pad,license_no,document_type,document_no FROM `tbl_side_codes` where side_type_code='"+id+"' and description  LIKE '%"+body+"%' limit 20", [], (error, result) => {
             if (error) {
                 return callback(error);
             }
             return callback(null, result);
         })
}

