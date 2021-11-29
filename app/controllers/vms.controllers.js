const vmsModels = require('../models/vms.models')
const vmsModelsAdd = require('../models/vms.vioilationAdd..models')
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
    },
    voliationTitleList: (req, res) => {
        jwt.verify(req.token, 'my_secret_key', (err, result) => {
            if (err) {
                res.sendStatus(403);
            } else {
                vmsModels.voliationTitleList(req.params.id,(err, result) => {
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
    },
    sideCode: (req, res) => {
        jwt.verify(req.token, 'my_secret_key', (err, result) => {
            if (err) {
                res.sendStatus(403);
            } else {
                vmsModels.sideCode(req.params.id,(err, result) => {
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
    },
    sideCodeWiseData: (req, res) => {
        jwt.verify(req.token, 'my_secret_key', (err, result) => {
            if (err) {
                res.sendStatus(403);
            } else {
                vmsModels.sideCodeWiseData(req.params.id,(err, result) => {
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
    },
    plateSourceList: (req, res) => {
        jwt.verify(req.token, 'my_secret_key', (err, result) => {
            if (err) {
                res.sendStatus(403);
            } else {
                vmsModels.plateSourceList(req.params.id,(err, result) => {
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
    },
    plateCodeList: (req, res) => {
        jwt.verify(req.token, 'my_secret_key', (err, result) => {
            if (err) {
                res.sendStatus(403);
            } else {
                vmsModels.plateCodeList(req.params.id,(err, result) => {
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
    },
    oldCode: (req, res) => {
        jwt.verify(req.token, 'my_secret_key', (err, result) => {
            if (err) {
                res.sendStatus(403);
            } else {
                vmsModels.oldCode(req.params.id,(err, result) => {
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
    },
    violationCategory: (req, res) => {
        jwt.verify(req.token, 'my_secret_key', (err, result) => {
            if (err) {
                res.sendStatus(403);
            } else {
                vmsModels.violationCategory(req.params.id,(err, result) => {
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
    },
    fineCode: (req, res) => {
        jwt.verify(req.token, 'my_secret_key', (err, result) => {
            if (err) {
                res.sendStatus(403);
            } else {
                vmsModels.fineCategoryCode(req.params.id,(err, result) => {
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
    },
    getFineamount: (req, res) => {
        jwt.verify(req.token, 'my_secret_key', (err, result) => {
            if (err) {
                res.sendStatus(403);
            } else {
                vmsModels.getFineamount(req.params.id,(err, result) => {
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
    },
    documentType: (req, res) => {
        jwt.verify(req.token, 'my_secret_key', (err, result) => {
            if (err) {
                res.sendStatus(403);
            } else {
                vmsModels.documentType(req.params.id,(err, result) => {
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
    },
    getArea: (req, res) => {
        jwt.verify(req.token, 'my_secret_key', (err, result) => {
            if (err) {
                res.sendStatus(403);
            } else {
                vmsModels.getArea(req.params.id,(err, result) => {
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
    },
    reservedCode: (req, res) => {
        jwt.verify(req.token, 'my_secret_key', (err, result) => {
            if (err) {
                res.sendStatus(403);
            } else {
                vmsModels.reservedCode(req.params.id,(err, result) => {
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
    },
    voilations: (req, res) => {
        //console.log(req.params.id);
        jwt.verify(req.token, 'my_secret_key', (err, result) => {
            if (err) {
                res.sendStatus(403);
            } else {
                vmsModels.voilations(req.params.id,(err, result) => {
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
    },
    plateSourceId: (req, res) => {
       
        vmsModelsAdd.tbl_plate_sources(req.params.id,(err, result) => {
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
          
    },

    searchSideCode: (req, res) => {
       var body = req.body;
      console.log("req.body",body);
        vmsModelsAdd.sideCodeSearch(req.params.id,body.search,(err, result) => {
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
          
    },
}