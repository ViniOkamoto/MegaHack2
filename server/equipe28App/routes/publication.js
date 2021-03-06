var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../config/config.json')["db"];

var DbModel = require('../model/model');

var tableName = "publications"

var connection = mysql.createPool(dbConfig);
 
var myDbModel = new DbModel(tableName, connection)


router.get(`/feed`, function (req, res, next) {

    connection.query(`select p.*, u.url_avatar, u.name as name_user from ${tableName} as p left join users as u on p.uid_user=u.uid where request=0`, function (error, results, fields) {
        if (error) throw res.json({ status: "falha", resultado: error });
        if (results.length == 0) throw res.json({ status: "falha", resultado: `Nenhum registro foi encontrado` });

        res.json({ status: "sucesso", resultado: results });

    });

});


router.get(`/request`, function (req, res, next) {

    connection.query(`select p.*, u.url_avatar, u.name as name_user from ${tableName} as p left join users as u on p.uid_user=u.uid where request=1`, function (error, results, fields) {
        if (error) throw res.json({ status: "falha", resultado: error });
        if (results.length == 0) throw res.json({ status: "falha", resultado: `Nenhum registro foi encontrado` });

        res.json({ status: "sucesso", resultado: results });

    });

});



router.get('/list', function (req, res, next) {

    myDbModel.dbGetList()
        .then((result) => { res.json({ status: "sucesso", resultado: result }); })
        .catch((err) => { res.json({ status: "falha", resultado: err }); })

});

router.put('/add', function (req, res, next) {
    var newUser = req.body;

    myDbModel.dbInsert(newUser)
        .then((result) => { res.json({ status: "sucesso", resultado: result }); })
        .catch((err) => { res.json({ status: "falha", resultado: err }); })
});

router.post('/update/:id', function (req, res, next) {

    var uid = req.params.id;
    var updUser = req.body;

    myDbModel.dbUpdate(uid, updUser)
        .then((result) => { res.json({ status: "sucesso", resultado: result }); })
        .catch((err) => { res.json({ status: "falha", resultado: err }); })

});

router.delete('/delete/:id', function (req, res, next) {

    var uid = req.params.id;

    myDbModel.dbDelete(uid)
        .then((result) => { res.json({ status: "sucesso", resultado: result }); })
        .catch((err) => { res.json({ status: "falha", resultado: err }); })

});

router.get('/:id', function (req, res, next) {

    var uid = req.params.id;

    myDbModel.dbGetList({"uid":uid})
        .then((result) => { res.json({ status: "sucesso", resultado: result }); })
        .catch((err) => { res.json({ status: "falha", resultado: err }); })

})


module.exports = router;
