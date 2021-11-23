const vmsModels = require('../models/vms.violationView.models')
const db = require('../config/db');
const express = require("express");
const app = express();
exports.viewViolations = async (req, res) => {
var getViolationlistIdwise;
 var tbl_side_codesList;
 var violation_title_idlist;
 var tbl_side_types_list;
 var tbl_document_type_list;
 var tbl_fine_categories_list;
 var tbl_fine_categories_code_list;

 

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
   
    await this.getViolationlistIdwise(req.params.id).then((result)=>{
        getViolationlistIdwise = result[0];
       
    })
    await this.tbl_side_codes(getViolationlistIdwise.side_code).then((result) =>{
        tbl_side_codesList =  result[0]
    })
    await this.tbl_violation_titles(getViolationlistIdwise.violation_title_id).then((result) =>{
     
        violation_title_idlist =  result[0]
    })
    await this.tbl_side_types(getViolationlistIdwise.side_type).then((result) =>{
      
        tbl_side_types_list =  result[0]
    })
    await this.tbl_document_type(getViolationlistIdwise.document_type).then((result) =>{
        
        tbl_document_type_list =  result[0]
    })
    await this.tbl_fine_categories(getViolationlistIdwise.fine_category).then((result) =>{
     
        tbl_fine_categories_list =  result[0]
    })
    await this.tbl_fine_category_codes(tbl_fine_categories_list.fine_category_id).then((result) =>{
        
        tbl_fine_categories_code_list =  result[0]
    })
    var obj = [{
        ViolatiionList:getViolationlistIdwise,
        tbl_side_codesList:tbl_side_codesList,
        violation_title_idlist:violation_title_idlist,
        tbl_side_types_list:tbl_side_types_list,
        tbl_document_type_list:tbl_document_type_list,
        tbl_fine_categories_list:tbl_fine_categories_list,
        tbl_fine_categories_code_list:tbl_fine_categories_code_list
    }]

        return res.status(200).send({
            statusCode: 200,
            data: obj
        })
}


exports.getViolationlistIdwise = async (id) => {
    return new Promise((resolve, reject) => {
        vmsModels.tbl_violations(id, (err, result)=>{
            if (err) {
                return result.status(500).send({
                    statusCode: 500,
                    data: "Database Connection Error",
                })
            }
            resolve(result);
        })
        
    });
}
exports.tbl_side_codes = async (id) => {
    return new Promise((resolve, reject) => {
        vmsModels.tbl_side_codes(id, (err, result)=>{
            if (err) {
                return result.status(500).send({
                    statusCode: 500,
                    data: "Database Connection Error",
                })
            }
            resolve(result);
        })
        
    });
}
exports.tbl_violation_titles = async (id) => {
    return new Promise((resolve, reject) => {
        vmsModels.tbl_violation_titles(id, (err, result)=>{
            if (err) {
                return result.status(500).send({
                    statusCode: 500,
                    data: "Database Connection Error",
                })
            }
            resolve(result);
        })
        
    });
}
exports.tbl_side_types = async (id) => {
    return new Promise((resolve, reject) => {
        vmsModels.tbl_side_types(id, (err, result)=>{
            if (err) {
                throw err;
                // return result.status(500).send({
                //     statusCode: 500,
                //     data: "Database Connection Error",
                // })
            }
            resolve(result);
        })
        
    });
}
exports.tbl_document_type = async (id) => {
    return new Promise((resolve, reject) => {
        vmsModels.tbl_document_type(id, (err, result)=>{
            if (err) {
                return result.status(500).send({
                    statusCode: 500,
                    data: "Database Connection Error",
                })
            }
            resolve(result);
        })
        
    });
}
exports.tbl_fine_categories = async (id) => {
    return new Promise((resolve, reject) => {
        vmsModels.tbl_fine_categories(id, (err, result)=>{
            if (err) {
                return result.status(500).send({
                    statusCode: 500,
                    data: "Database Connection Error",
                })
            }
            resolve(result);
        })
        
    });
}
exports.tbl_fine_category_codes = async (id) => {
    return new Promise((resolve, reject) => {
        vmsModels.tbl_fine_category_codes(id, (err, result)=>{
            if (err) {
                return result.status(500).send({
                    statusCode: 500,
                    data: "Database Connection Error",
                })
            }
            resolve(result);
        })
        
    });
}



