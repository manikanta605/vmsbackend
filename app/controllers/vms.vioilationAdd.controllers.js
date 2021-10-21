const vmsModels = require('../models/vms.vioilationAdd..models')
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();
exports.addValidation = async (req, res) => {
    var sidecodeData;
    var InsertsidecodeData;
    var violationTitleInsertId;
    var getLastReferenceNumber;
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
   //console.log(req.body);
  

    await this.getLastReferenceNo().then((result)=>{
        //console.log("getLastReferenceNo", result);
        getLastReferenceNumber = result[0].id;
    })


    if(req.body.voilationtitleid == null){
        await this.getsidecodes(req.body).then((result) => {
            //console.log("Side_codes", result);
            sidecodeData = result;
        })
        await this.insertViolationTitle(req.body).then((result) =>{
            //console.log("Violation Title", result);
            violationTitleInsertId = result.insertId;
        })
    }else{
        violationTitleInsertId = req.body.voilationtitleid
    }
    
    if(req.body.sideCodeID == null){
        await this.insertsidecodes(sidecodeData).then((insertResult) =>{
            //console.log("insertResult", insertResult);
            InsertsidecodeData = insertResult.insertId;
        })
    }else{
        InsertsidecodeData = req.body.sideCodeID;
    }
    // console.log("InsertsidecodeData", InsertsidecodeData);
    // console.log("violationTitleInsertId", violationTitleInsertId);
    // console.log("getLastReferenceNo", getLastReferenceNumber);
    var ref = getLastReferenceNumber+1
    var referenceNumber = 'VMS0000'+ref;
    //console.log("referenceNumber", referenceNumber);
    vmsModels.tbl_voilations(req.body, InsertsidecodeData, violationTitleInsertId,referenceNumber, (err, result)=>{
        if (err) {
            throw err;
            // return result.status(500).send({
            //     statusCode: 500,
            //     data: "Database Connection Error",
            // })
        }
        return res.status(200).send({
            statusCode: 200,
            data: result,
        })

    })


}

exports.getsidecodes = async (body) => {
    return new Promise((resolve, reject) => {
        var side_codes;
        if (body.sideCodeID == null) {
            if (body.voilationType == '1') {
                side_codes = {
                    voilationType:'1',
                    description: body.sideCodeDescription,
                    description_eng: body.sideCodeDescription,
                    document_type: body.documentType,
                    document_no: body.documentNo
                }

                resolve(side_codes);
            } else if (body.voilationType == '2') {
                side_codes = {
                    voilationType:'2',
                    description: body.sideCodeDescription,
                    description_eng: body.sideCodeDescription,
                    license_no: body.licenseNo,
                }

                resolve(side_codes);
            }
            else {

                vmsModels.tbl_plate_sources(body.plateCode, (err, res) => {
                    if (err) {
                        return res.status(500).send({
                            statusCode: 500,
                            data: "Database Connection Error",
                        })
                    }
                    if (body.name_ar != '') {
                        var description = 'Car Number ' + body.plateNo + ' - ' + res[0].name_ar;
                        var description_eng = 'Car Number ' + body.plateNo + ' - ' + res[0].name_eng;
                    } else {
                        var description = 'Car Number' + body.plateNo;
                        var description_eng = 'Car Number' + body.plateNo;
                    }

                    side_codes = {
                        voilationType:'3',
                        description: description,
                        description_eng: description_eng,
                        license_no: body.licenseNo,
                        car_no: body.plateNo,
                        calar_pad: body.plateColor,
                        class_pad_new: body.plateCode
                    }
                    resolve(side_codes);

                });
            }

        }
    });
}

exports.insertsidecodes = async (body) => {
    return new Promise((resolve, reject) => {
        //console.log("body", body);
        vmsModels.tbl_side_code(body, (err, result)=>{
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

exports.insertViolationTitle = async(body) =>{
    return new Promise((resolve, reject) => {
        //console.log("voilation title", body);
        if(body.voilationtitleid == null){
             var data = {
                side_type_code:body.side_type_code,
                violation_eng_title:body.violation_eng_title,
                violation_ar_title:body.violation_eng_title,
               
            }   
            vmsModels.tbl_source_code(data, (err, result)=>{
                if (err) {
                    return result.status(500).send({
                        statusCode: 500,
                        data: "Database Connection Error",
                    })
                }
                resolve(result);
            })
        }
        
    })
}
exports.getLastReferenceNo = async() =>{
    return new Promise((resolve, reject) => {
         
            vmsModels.tbl_violation_reference((err, result)=>{
                if (err) {
                    return result.status(500).send({
                        statusCode: 500,
                        data: "Database Connection Error",
                    })
                }
                resolve(result);
            })
       
        
    })
}
