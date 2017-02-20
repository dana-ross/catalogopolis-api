/**
 * @file Catalogopolis API installation script
 * @author Dave Ross <dave@davidmichaelross.com> 
 */

var sqlite3 = require('sqlite3').verbose(),
    fs = require('fs');

fs.readFile('sql/doctor_who.sql', 'utf8', function (err, data) {
    var db = new sqlite3.Database('catalogopolis-api.sqlite');

    db.serialize(function () {
        data.split(";").forEach(function (cmd) {
            if (cmd.trim().length) {
                console.log(cmd + ';');
                db.run(cmd + ';');
            }
        });
    });

    db.close();
});
