/**
 * Created by koudaiwang on 2018/3/1.
 */
/**
 * Created by afer on 2017/7/6.
 */


var multiparty = require('multiparty');
var fs = require('fs');
var JsonModel = require('../config/jsonModel');
var BaseUploadImage = require('./baseuploadImage');
var Path = require('path')

module.exports = {
    uploaduserVoteImage: function (req, res, callBack) {
        BaseUploadImage.baseUploadImage(req, res, 'uservoteimages', callBack);
    },
}