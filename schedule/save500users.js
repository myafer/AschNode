/**
 * Created by afer on 2018/3/4.
 */


var request = require('request');
var config = require('../config/config');
var fs = require('fs');

module.exports = {
    save500users: function () {
        request(config.asch_api + "delegates/voters?publicKey=" + config.asch_publicKey, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                var json = JSON.parse(body);
                if (json.success == true && json.accounts.length <= 500) {
                    var filename = "../public/500users.json";
                    fs.writeFileSync(filename, body);
                } else {
                    console.log("投票记录已生成，不需要再次记录。")
                }
            } else {
                console.log("记录投票人出错！！！");
            }
        });
    }
}

