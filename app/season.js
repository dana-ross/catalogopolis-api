/**
 * @file Season class
 * @author Dave Ross <dave@davidmichaelross.com> 
 */

const memoize = require('memoizee');

var method = Season.prototype;

/**
 * Creates a new Season
 * @class
 */
function Season() {
    var id, name;
}

/**
 * Returns a single Season object for a given database ID
 * @param {object} connection SQLite connection
 * @param {number} id Season database ID
 * @returns {Season}
 */
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

/**
 * Returns all Season objects in the system
 * @param {object} connection SQLite connection
 * @returns {Array} Array of Season objects
 */
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

/**
 * Returns a new Season object populated from a basic JavaScript object (database result row)
 * @param {object} row Object with fields to copy to a new Season
 * @returns {Season}
 * @static
 */
method.fromRow = function (row) {
    var season = new Season();
    row.id ? (season.id = row.id) : undefined;
    row.name ? (season.name = row.name) : undefined;
    return season;
}

/**
 * Returns the canonical REST API v1 endpoint for a Season
 * @param {number} id Database record ID
 * @return {string} REST API v1 endpoint URL
 * @static
 */
method.restv1URL = memoize(function (id) {
    return ("/v1/seasons" + ((id !== undefined) ? ("/" + id) : ""));
});

/**
 * Adds HATEAOS data to a Season object
 * @param {Season|undefined} Object representing a Season, uses current object (this) if undefined
 * @returns {Season}
 */
method.addHATEAOS = function (season) {
    if (season === undefined) {
        season = this;
    }
    season.links = [];
    season.links.push({ rel: "self", href: this.restv1URL(season.id) });
    return season;
}

module.exports = method;