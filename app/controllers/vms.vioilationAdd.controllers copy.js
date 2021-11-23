const vmsModels = require('../models/vms.vioilationAdd..models')
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();
exports.addValidation = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      return;
}
// module.exports = {
//     addValidation: (req, res) => {
//         var body = req.body;
//         //console.log(req.body);
//         var titleInsertId = [];
//         var GlobalTemp = {};
//         var GlobalViolationTitle = {};
//         var dataSor={};
//         if(body.sideCode == null){
//             if(body.voilationType == '1'){
//                 GlobalTemp.side_codes = {
//                     description: body.sideCodeDescription,
//                     description_eng: body.sideCodeDescription,
//                     document_type:body.documentType,
//                     document_no:body.documentNo
//                 }
               
//                 //console.log("side_codes", GlobalTemp.side_codes);
//             }else if(body.voilationType == '2'){
//                 GlobalTemp.side_codes = {
//                     description: body.sideCodeDescription,
//                     description_eng: body.sideCodeDescription,
//                     license_no:body.licenseNo,
//                 }
//                 //console.log("side_codes", GlobalTemp.side_codes);
//             }else{
//                 if(body.name_ar != ''){
//                     var description= 'Car Number '+ body.plateNo + ' - '+body.plateNo_name_ar;
//                     var description_eng= 'Car Number '+ body.plateNo+' - '+body.plateNo_name_eng;
//                 }else{
//                 var description= 'Car Number'+ body.plateNo;
//                 var description_eng= 'Car Number'+ body.plateNo;
//                 }
              
//                     GlobalTemp.side_codes = {
//                         description: description,
//                         description_eng: description_eng,
//                         license_no:body.licenseNo,
//                         car_no:body.plateNo,
//                         calar_pad:body.plateColor,
//                         class_pad_new:body.plateCode
//                     }
                  
//             }

//             console.log("side_codes out", GlobalTemp.side_codes);
//             //Insert the data Into the Table side Codes

//         }
//         if(body.voilationtitleid == null){
//             GlobalViolationTitle.title = {
//                 side_type_code: body.voilationType,
//                 violation_eng_title: body.voilationTitle,
//                 violation_ar_title:body.voilationTitle,
//                 created_by:body.created_by,
//                 created_on:new Date()
//             }
//             vmsModels.tbl_source_code(GlobalViolationTitle.title,(err, result) => {
//                 if (err) {
//                     return res.status(500).send({
//                         statusCode: 500,
//                         data: "Database Connection Error",
//                     })
//                 }else res.send(result);
                
               
               
//                 // GlobalViolationTitle.title = {
//                 //     insertId:result.insertId
//                 // }
//                 // return res.status(200).send({
//                 //     statusCode: 200,
//                 //     data: result
//                 // })
//                 console.log(result.insertId);
//             })
//             console.log(" GlobalViolationTitle.title",  GlobalViolationTitle.title);
//             console.log("title Id titleInsertId", app.get('result'));
//         }

       
//     }
// }