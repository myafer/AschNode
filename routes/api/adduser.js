var express = require('express');
var router = express.Router();
var HandleDB = require("../../dao/HandleDB");

/* GET home page. */
router.get('/', function(req, res, next) {

    HandleDB.adduser({asch_adress: "4444", asch_node_name: "222", create_time: "111", vote_image: "222"}, function (result) {
        console.log(result);
        res.send(result);
    });
});

module.exports = router;
