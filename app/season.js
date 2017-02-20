/**
 * @file Season class
 * @author Dave Ross <dave@davidmichaelross.com> 
 */

var memoize = require('memoizee');

var method = Season.prototype;
function Season() {
    var id, name;
}

method.forID = memoize(function (connection, id) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM seasons WHERE id = ?', [id], function (err, rows, fields) {
            if (!err) {
                if (rows && rows.length) {
                    resolve(self.fromRow(rows[0]).addHATEAOS());
                }
                else {
                    resolve([]);
                }
            } else {
                reject({ error: { message: 'Error while performing Query.' } });
            }
        });
    });
});

method.all = memoize(function (connection) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM seasons ORDER BY id', [], function (err, rows, fields) {
            if (!err) {
                if (rows && rows.length) {
                    resolve(rows.map(function (x) { return self.fromRow(x).addHATEAOS(); }));
                }
                else {
                    resolve([]);
                }
            } else {
                reject({ error: { message: 'Error while performing Query.' } });
            }
        });
    });
});

method.fromRow = function (row) {
    var season = new Season();
    row.id ? (season.id = row.id) : undefined;
    row.name ? (season.name = row.name) : undefined;
    return season;
}

method.restv1URL = function (id) {
    return ("/v1/seasons" + ((id !== undefined) ? ("/" + id) : ""));
}

method.addHATEAOS = function (season) {
    if (season === undefined) {
        season = this;
    }
    season.links = [];
    season.links.push({ rel: "self", href: this.restv1URL(season.id) });
    return season;
}

module.exports = method;