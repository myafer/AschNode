
var fs = require("fs");
var file = "../db.db";
var exists = fs.existsSync(file);

if(!exists) {
    console.log("Creating DB file.");
    fs.openSync(file, "w");
} else {
    console.log("Db had been Created.");
}

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);


var createUsersTableStr = `
       create table if not exists users(
            UID integer primary key autoincrement,
            telnum varchar(255) UNIQUE,
            asch_adress varchar(255) UNIQUE,
            asch_node_name varchar(255),
            create_time varchar(255),
            vote_image varchar(255)
        );`;
db.run(createUsersTableStr);

module.exports = {
    adduser: function (user, cb) {
        db.run(`insert into users (telnum, asch_adress, asch_node_name, create_time) values(?, ?, ?, ?)`,
            [user.telnum, user.asch_adress, user.asch_node_name, user.create_time] ,function(err,res){
                if(!err)
                    return cb({code: 0, message: "add user success!"});
                else
                    return cb({code: 1, message: err.message});
        })
    },

    queryalluser: function (cb) {
        db.all("select * from users",function(err,res){
            if(!err)
                return cb({code: 0, message: "ok!", res: res});
            else
                return cb({code: 1, message: err.message});
        });
    },

    queryUserByAdress: function (adress, cb) {
        db.all(`select * from users where asch_adress=${adress}`, function (err, res) {
            if(!err)
                return cb({code: 0, message: "ok!", res: res});
            else
                return cb({code: 1, message: err.message});
        });
    },

    queryUserByTelNum: function (telnum, cb) {
        db.all(`select * from users where asch_adress=${telnum}`, function (err, res) {
            if(!err)
                return cb({code: 0, message: "ok!", res: res});
            else
                return cb({code: 1, message: err.message});
        });
    }

}