const vmsModels = require('../models/vms.vioilationAdd..models')
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();
exports.addValidation = async (req, res) => {

    console.log(req.body);
   
    var sidecodeData;
    var getsidecodeMatchData;
    var InsertSidecode;
    var sideCodeDataMatch;
    var InsertsidecodeData;
    var violationTitleInsertId;
    var getLastReferenceNumber;
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    await this.getsideCodeDataMatch(req.body).then((result) => {
        getsidecodeMatchData = result;
        })
    if(getsidecodeMatchData.length >0){
        console.log("Match")
    }else{
        if(req.body.voilationType == '1'){
            var sidecodeDescription = req.body.documentNo +'-'+req.body.sideCodeDescription;
        }else if(req.body.voilationType == '2'){
            var sidecodeDescription = req.body.licenseNo +'-'+req.body.sideCodeDescription;
        }else{
            var sidecodeDescription = req.body.plateNo +'-'+req.body.plateSource +'-'+req.body.plateCode+'-'+req.body.plateColor;
        }
        
        await this.latestinsertsidecodes(req.body).then((result) => {
        InsertSidecode = result.insertId;
        })
        req.body.sideCode = sidecodeDescription;
        req.body.sideCodeID = InsertSidecode;
    }
  
    console.log(req.body);

    await this.getLastReferenceNo(req.body.voilationType).then((result)=>{
        getLastReferenceNumber = result[0].reference_number;
    })


    if(req.body.voilationtitleid == null){
        await this.getsidecodes(req.body).then((result) => {
            sidecodeData = result;
        })
        await this.insertViolationTitle(req.body).then((result) =>{
            violationTitleInsertId = result.insertId;
        })
    }else{
        violationTitleInsertId = req.body.voilationtitleid
    }
    
    if(req.body.sideCodeID == null){
        await this.insertsidecodes(sidecodeData).then((insertResult) =>{
            InsertsidecodeData = insertResult.insertId;
        })
    }else{
        InsertsidecodeData = req.body.sideCodeID;
    };
    var ref = getLastReferenceNumber+1;


    if(req.body.voilationType === 1){

        var split= getLastReferenceNumber.split("IVRAQ");
        var ref = parseInt(split[1])+1
         var Refer = 'IVRAQ';
         var referenceNumber =Refer.padEnd(10, '0')+ref;
        //var referenceNumber = 'IVRAQ0000'+ref;
    }else if(req.body.voilationType === 2){
        var split= getLastReferenceNumber.split("CVRAQ");
        var ref = parseInt(split[1])+1
        var Refer = 'CVRAQ';
        var referenceNumber = Refer.padEnd(10, '0')+ref;
    }else{
        var split= getLastReferenceNumber.split("VVRAQ");
        var ref = parseInt(split[1])+1
        var Refer = 'VVRAQ';
        var referenceNumber = Refer.padEnd(10, '0')+ref;
    }
    var date = new Date();
    var year =date.getFullYear();
    //console.log(year.toString());
    var fineNo = year.toString().padEnd(12, '0')+ref;
    //console.log(fineNo);
    
    //var referenceNumber
    await this.get3daysViolationValid(req.body).then((result) =>{
      
        if(result.length > 0){
            return res.send({
                statusCode: 409,
                data: 'Dublicate Violation Found !',
            })
        }else{
            vmsModels.tbl_voilations(req.body, InsertsidecodeData, violationTitleInsertId,referenceNumber,fineNo, (err, result)=>{
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

exports.getsidecodesLatest = async (body) => {
    console.log("getSideCode", body);
    return new Promise((resolve, reject) => {
        var side_codes;
       
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
    });
}
exports.latestinsertsidecodes = async (body) => {
    return new Promise((resolve, reject) => {
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

exports.insertsidecodes = async (body) => {
    return new Promise((resolve, reject) => {
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
exports.getLastReferenceNo = async(voilationType) =>{
    return new Promise((resolve, reject) => {
         
            vmsModels.tbl_violation_reference(voilationType,(err, result)=>{
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


exports.getsideCodeDataMatch = async (body) => {
    console.log(body);
    return new Promise((resolve, reject) => {
        vmsModels.tbl_side_code_search(body, (err, result)=>{
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

exports.get3daysViolationValid = async (body) =>{
    return new Promise((resolve, reject) =>{
        vmsModels.get3daysViolatino(body, (err, result) =>{
            if(err){
                return result.status(500).send({
                    statusCode:500,
                    data:"Database Connection Error",
                })
            }
            resolve(result);
        })
    })
}