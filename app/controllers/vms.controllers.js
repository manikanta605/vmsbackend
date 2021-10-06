const vmsModels = require('../models/vms.models')

const jwt = require('jsonwebtoken');
module.exports = {
    //{ expiresIn: "15m" }
    //create Organization
    login: (req, res) => {
        console.log(req.body);
        vmsModels.login(req.body, (error, result) => {

            if (result.length == 0) {
                return res.status(400).send({ statusCode: 400, data: "Please Enter Valid Details" })
            } else {
               console.log(result);
                const token = jwt.sign({ id: result[0].username }, 'my_secret_key');

                console.log(token);
                return res.status(200).send({
                    statusCode: 200,
                    token: token,
                    data: result
                })

            }

        })



    },

    userList: (req, res) => {

        // jwt.verify(req.token, 'my_secret_key', (err, result) => {
        //     if (err) {
        //         res.sendStatus(403);
        //     } else {
        vmsModels.listData((err, result) => {
            if (err) {
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
        // }
        //})
        // } else {
        //     res.sendStatus(403);
        // }
    },
    voliationTypeList: (req, res) => {
        jwt.verify(req.token, 'my_secret_key', (err, result) => {
            if (err) {
                res.sendStatus(403);
            } else {
                vmsModels.voliationTypeList((err, result) => {
                    if (err) {
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
            }
        })
    }
}