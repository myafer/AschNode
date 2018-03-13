/**
 * Created by afer on 2018/3/4.
 */
var schedule = require("node-schedule");
var save500users = require("./save500users");

module.exports = {
    record500usertask: function () {
        var rule = new schedule.RecurrenceRule();
        var times = [];
        for(var i=1; i<60; i += 1 ){
            times.push(i);
        }
        rule.minute = times;
        var c = 0;
        var j = schedule.scheduleJob(rule, function(){
            c++;
            console.log(c + new Date());
            save500users.save500users();
        });
    }
}