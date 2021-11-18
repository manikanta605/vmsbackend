
const vmsModels = require('../models/vms.editviolation.model')
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();

exports.editViolation = async (req, res) =>{

    
    return new Promise((resolve, reject) =>{
        vmsModels.tbl_voilations(req.params.id, (err, result)=>{
            if (err) {
               // throw err;
                return res.status(500).send({
                    statusCode: 500,
                    data: "Database Connection Error",
                })
            }
            return res.status(200).send({
                statusCode: 200,
                data: result
            })
        })
    })
}


exports.updateViolationIdWise = async (req, res) =>{

    var body = req.body
    
    return new Promise((resolve, reject) =>{
        vmsModels.tbl_voilations_update(req.params.id,body, (err, result)=>{
            if (err) {
               // throw err;
                return res.status(500).send({
                    statusCode: 500,
                    data: "Database Connection Error",
                })
            }
            return res.status(200).send({
                statusCode: 200,
                data: result
            })
        })
    })
}