var express = require('express');
var router = express.Router();
var SDB = require("../dao/SDB");

/* GET home page. */
router.get('/', function(req, res, next) {

    // HandleDB.adduser({asch_adress: "4444", asch_node_name: "222", create_time: "111", vote_image: "222"}, function (result) {
    //     console.log(result);
    // });
    //
    //
    // HandleDB.queryUserByAdress("1111", function (res) {
    //    console.log(res);
    // });
    //
    // HandleDB.queryalluser(function (result) {
    //     console.log(result);
    // })

  res.render('index', { title: '阿希分红节点' });
});

module.exports = router;
