var express = require('express');
var router = express.Router();
var SDB = require("../dao/SDB");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '阿希分红节点' });
});

router.get('/login', function (req, res) {

  var user = {
    telnum: "122322",
    asch_adress: "224444",
    asch_node_name: "22",
    create_time: "22"
  }
  SDB.adduser(user, function (result) {
    console.log(result);
    res.send("11111");
  });

});


module.exports = router;
