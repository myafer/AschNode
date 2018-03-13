/**
 * Created by afer on 2018/3/3.
 */
var request = require('request');
var config = require('../../config/config');

var express = require('express');
var router = express.Router();



router.get("/", function (req, res) {
    request(config.asch_api + "accounts?address=" + config.asch_adress, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(body);
        }
    })
});



router.get("/voteusers", function (req, res) {

    request(config.asch_api + "delegates/voters?publicKey=" + config.asch_publicKey, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(body);
        } else {
            res.send(error);
        }
    });
});

router.get("/rank", function (req, res) {
    console.log(config.asch_api + "delegates/get?publicKey=" + config.asch_publicKey);
    request(config.asch_api + "delegates/get?publicKey=" + config.asch_publicKey, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(body);
        } else {
            res.send("");
        }
    })
});



module.exports = router;
