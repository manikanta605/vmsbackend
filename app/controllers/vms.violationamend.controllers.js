const vmsAmend = require('../models/vms.violationamend.models');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();

exports.amendViolation = async (req, res) =>{

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
   

    await this.violationamendData(req.body).then((result)=>{
     
        return res.status(200).send({
            statusCode: 500,
            data: result,
        })
    })
}

exports.violationamendData = async (body) =>{
    return new Promise((resolve, reject) =>{
        vmsAmend.tbl_violations_amend_requests(body, (err, res)=>{
            if (err) {
                return res.status(500).send({
                    statusCode: 500,
                    data: "Database Connection Error",
                })
            }
            resolve(res);
        })
    })
}


exports.violationamendlist = async (req, res) =>{
    return new Promise((resolve, reject) =>{
        vmsAmend.tbl_violations_amend_requests_list(req.params.id, (err, result)=>{
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

exports.amendReqestList = async (req, res) =>{
    return new Promise((resolve, reject) =>{
        vmsAmend.amendReqestList(req.params.id, (err, result)=>{
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






