const db = require('../config/db');

exports.tbl_violations = async (id, callback) => {
    // console.log("SELECT violation_video,identity_doc,phone,side_code,document_type,side_type,violation_cat_id,violation_title_id,license_no, license_plate_no,plate_source,plate_code,plate_color, document_no, description_side_code, old_code,fine_category, fine_place,area, notes, fine_no, recipient_person,recipient_mobile,email,reserved_code, reserved_number, address, description,daily_fines,violation_docs, fine_amount,reference_number,status FROM `tbl_voilations` where reference_number='" + id + "' limit 1");

    
    db.query("SELECT violation_video,identity_doc,phone,side_code,document_type,side_type,violation_cat_id,violation_title_id,license_no, license_plate_no,plate_source,plate_code,plate_color, document_no, description_side_code, old_code,fine_category, fine_place,area, notes, fine_no, recipient_person,recipient_mobile,email,reserved_code, reserved_number, address, description,daily_fines,violation_docs, fine_amount,reference_number,status FROM `tbl_voilations` where reference_number='" + id + "' limit 1", [], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    })
}
exports.tbl_side_codes = async (id, callback) => {
    db.query("SELECT side_code_id,description,description_eng FROM `tbl_side_codes` where side_code_id='" + id + "' limit 1", [], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    })
}
exports.tbl_violation_titles = async (id, callback) => {
    db.query("SELECT title_id,violation_eng_title,violation_ar_title FROM `tbl_violation_titles` where title_id='" + id + "' limit 1", [], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    })
}
exports.tbl_side_types = async (id, callback) => {
    db.query("SELECT side_type_id,name_eng,name_ar FROM `tbl_side_types` where side_type_id='" + id + "' limit 1", [], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    })
}
exports.tbl_document_type = async (id, callback) => {
    db.query("SELECT id,name_eng,name_arb FROM `tbl_document_type` where code='" + id + "' limit 1", [], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    })
}
exports.tbl_fine_categories = async (id, callback) => {
    db.query("SELECT fine_category_id,description,description_eng from tbl_fine_categories  where fine_category_id='" + id + "' limit 1", [], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    })
}
exports.tbl_fine_category_codes = async (id, callback) => {
    db.query("SELECT fine_code_id,fine_code_reffer_no,description,description_eng FROM `tbl_fine_category_codes` where fine_category_id='" + id + "' limit 1", [], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    })
}
exports.tbl_side_types = async (id, callback) => {
    db.query("SELECT side_type_id,name_eng,name_ar FROM `tbl_side_types` where side_type_id='" + id + "' limit 1", [], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result);
    })
}
