const db = require('../config/db');

exports.tbl_plate_sources = async (plat_code, callback) => {
    //console.log("SELECT car_sid,raqab_code,adp_code,name_eng,name_ar FROM `tbl_plate_sources` where raqab_code='" + plat_code + "' limit 1");
    db.query("SELECT car_sid,raqab_code,adp_code,name_eng,name_ar FROM `tbl_plate_sources` where raqab_code='" + plat_code + "' limit 1", [plat_code], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    })
}

exports.tbl_source_code = async (data, callback) => {
     //console.log("tbl_source_code",data);

    db.query("INSERT INTO `tbl_violation_titles`(`side_type_code`, `violation_eng_title`, `violation_ar_title`, `created_on`, `created_by`,`status`) VALUES ('" + data.side_type_code + "','" + data.violation_eng_title + "','" + data.violation_ar_title + "','" + data.created_by + "','" + data.created_on + "','Active')", [], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    })
}

exports.tbl_side_code = async (data, callback) =>{
    //console.log("model Data", data);
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
exports.tbl_voilations = async (data,InsertsidecodeData,violationTitleInsertId,referenceNumber,callback) => {
    // console.log("INSERT INTO `tbl_voilations`(`reference_number`,`side_type`, `violation_title_id`, `side_code`, `document_type`, `document_no`,`description_side_code`,`license_no`,`license_plate_no`,`plate_source`,`plate_code`,`plate_color`,`old_code`,`fine_category`,`fine_code`,`fine_place`,`area`,`fine_no`,`notes`,`recipient_person`,`phone`,`recipient_mobile`,`email`,`reserved_code`,`identity_doc`,`address`,`description`,`daily_fines`,`violation_docs`,`fine_amount`,`front_image`,`plate_category`,`source`,`source_id`,`created_by`,`created_on`) VALUES ('" + referenceNumber + "','" + data.voilationType + "','" + violationTitleInsertId + "','" +InsertsidecodeData + "','" + data.documentType + "','" + data.documentNo + "','" + data.sideCodeDescription + "','" + data.licenseNo + "','" + data.plateNo + "','" + data.plateSource + "','" + data.plateCode + "','" + data.plateColor + "','" + data.oldCode + "','" + data.violationCategory + "','" + data.fineCode + "','" + data.finePlace + "','" + data.area + "','" + data.fineNo + "','" + data.fineNotes + "','" + data.recipientperson + "','" + data.phone + "','" + data.recipientmobile + "','" + data.email + "','" + data.reservedCode + "','" + data.reservedIdNumber + "','" + data.address + "','" + data.description + "','" + data.dailyFines + "','" + data.violationDocument + "','" + data.fineAmount + "','" + data.camerafiles + "','1','MANUAL','2','" + data.created_by + "','" + data.created_on + "')")
    // console.log("tbl_voilations",data);
    // console.log("insertViolationTitle",insertViolationTitle);
    // console.log("violationTitleInsertId",violationTitleInsertId);
    // console.log("referenceNumber",referenceNumber);
       var sql = "INSERT INTO `tbl_voilations`(`reference_number`,`side_type`, `violation_title_id`, `side_code`, `document_type`, `document_no`,`description_side_code`,`license_no`,`license_plate_no`,`plate_source`,`plate_code`,`plate_color`,`old_code`,`fine_category`,`fine_code`,`fine_place`,`area`,`fine_no`,`notes`,`recipient_person`,`phone`,`recipient_mobile`,`email`,`reserved_code`,`reserved_number`,`address`,`description`,`daily_fines`,`violation_docs`,`fine_amount`,`front_image`,`plate_category`,`source`,`source_id`,`created_by`,`created_on`) VALUES ('" + referenceNumber + "','" + data.voilationType + "','" + violationTitleInsertId + "','" +InsertsidecodeData + "','" + data.documentType + "','" + data.documentNo + "','" + data.sideCodeDescription + "','" + data.licenseNo + "','" + data.plateNo + "','" + data.plateSource + "','" + data.plateCode + "','" + data.plateColor + "','" + data.oldCode + "','" + data.violationCategory + "','" + data.fineCode + "','" + data.finePlace + "','" + data.area + "','" + data.fineNo + "','" + data.fineNotes + "','" + data.recipientPerson + "','" + data.phone + "','" + data.recipientMobile + "','" + data.email + "','" + data.reservedCode + "','" + data.reservedIdNumber + "','" + data.address + "','" + data.description + "','" + data.dailyFines + "','" + data.violationDocument + "','" + data.fineAmount + "','" + data.camerafiles + "','1','MANUAL','2','" + data.created_by + "','" + data.created_on + "')";

       
   db.query(sql, [], (error, result) => {
       if (error) {
           return callback(error);
       }
       return callback(null, result);
   })
}


exports.tbl_violation_reference = async(callback) =>{
      db.query("select id from `tbl_voilations` order by id DESC limit 1", [], (error, result) => {
               if (error) {
                   return callback(error);
               }
               return callback(null, result);
           })
}
