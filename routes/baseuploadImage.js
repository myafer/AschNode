/**
 * Created by koudaiwang on 2017/7/21.
 */


var multiparty = require('multiparty');
var fs = require('fs');
var JsonModel = require('../config/jsonModel');
var Path = require('path');

module.exports = {
    baseUploadImage: function baseUploadImage(req, res, path, callBack) {
        var dir =  Path.resolve(__dirname, '..') + '/client/upload/' + path + '/';
        console.log(dir);
        var model = new JsonModel.JsonModel();
        model.status = 0;
        // 解析一个文件上传
        var form = new multiparty.Form();
        //设置编辑
        form.encoding = 'utf-8';
        //设置文件存储路径
        form.uploadDir = dir;
        //设置单文件大小限制
        form.maxFilesSize = 2 * 1024 * 1024;
        //上传完成后处理
        form.parse(req, function(err, fields, files) {
            var filesTmp = JSON.stringify(files, null, 2);
            console.log(files);
            if (err) {
                console.log('parse error: ' + err);
                model.content = {};
                model.msg = err.message;
                return res.send(model);
            } else {
                console.log('parse files: ' + filesTmp);
                console.log(files);
                var inputFile = files.image[0];
                var uploadedPath = inputFile.path;
                var timeStr = new Date().getTime().toString();
                var imagesuffix = inputFile.originalFilename.toString().split('.')[1] ? inputFile.originalFilename.toString().split('.')[1] : '.jpg';
                var dstPath = dir + timeStr + '.' + imagesuffix;

                console.log(new Date().getTime().toString());
                console.log(inputFile.originalFilename.toString().split('.')[1]);

                //重命名为真实文件名
                fs.rename(uploadedPath, dstPath, function (err) {
                    if (err) {
                        model.content = {};
                        model.msg = err.message;
                        return res.send(model);
                    } else {
                        console.log('rename ok');
                        callBack(dstPath, fields);
                    }
                });
            }
        });
    }
}