var express = require('express');
var router = express.Router();
var SDB = require("../../dao/SDB");

var UploaduserVoteImage = require('../uploadImage').uploaduserVoteImage;


/* add vote user */
router.post('/', function(req, res) {

    UploaduserVoteImage(req, res, function (path, fields) {
        var name = fields.name[0];
        var platformurl = fields.platformurl[0];
        var ICOPrice = fields.ICOPrice[0];
        var nowPrice = fields.nowPrice[0];
        var allmarketvalue = fields.allmarketvalue[0];
        var icodate = fields.icodate[0];
        var icodes = fields.icodes[0];
        var model = new JsonModel.JsonModel();
        model.status = 0;
        try {
            if (!name) {
                throw  new Error('name 不能为空！');
            }
            if (!platformurl) {
                throw  new Error('platformurl 不能为空！');
            }
            if (!ICOPrice) {
                throw  new Error('ICOPrice 不能为空！');
            }
            if (!nowPrice) {
                throw  new Error('nowPrice 不能为空！');
            }
            if (!allmarketvalue) {
                throw  new Error('allmarketvalue 不能为空！');
            }
            if (!icodate) {
                throw  new Error('icodate 不能为空！');
            }
            if (!icodes) {
                throw  new Error('icodes 不能为空！');
            }
        } catch (error) {
            model.content = {};
            model.msg = error.message;
            return res.send(model);
        }
        var icoinfo = {
            name: name,
            platformurl: platformurl,
            ICOPrice: ICOPrice,
            nowPrice: nowPrice,
            allmarketvalue: allmarketvalue,

            iconimage: path.replace(Path.resolve(__dirname, '..') + '/client', ''),
            icodes: icodes,
            icodate: icodate,
        };
        ICOInfodao.create(icoinfo).then(function (result) {
            var ss = result.ops[0];
            if (!ss) {
                fs.unlinkSync(path); //删除文件
                model.content = {};
                model.msg = '创建失败!';
                model.status = 0;
                return res.send(model);
            }
            model.content = ss;
            model.status = 1;
            model.msg = '添加成功!';
            return res.send(model);
        }).catch(function (error) {
            console.log(error);
            fs.unlinkSync(path); //删除文件
            model.content = {};
            if (error.message.match('E11000 duplicate key')) {
                model.msg = '币种重复!';
            } else {
                model.msg = error.message;
            }
            model.status = 0;
            return res.send(model);
        });
    });
});


module.exports = router;
