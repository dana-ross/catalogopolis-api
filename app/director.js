/**
 * @file Director class
 * @author Dave Ross <dave@davidmichaelross.com> 
 */

const memoize = require('memoizee');

var method = Director.prototype;

/**
 * Creates a new Director
 * @class
 */
function Director() {
    var id, name;
}

/**
 * Returns a single Director object for a given database ID
 * @param {object} connection SQLite connection
 * @param {number} id Director database ID
 * @returns {Director}
 */
method.forID = memoize(function (connection, id) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM directors WHERE id = ?', [id], function (err, rows, fields) {
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
 * Returns all Director objects in the system
 * @param {object} connection SQLite connection
 * @returns {Array} Array of Director objects
 */
method.all = memoize(function (connection) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM directors ORDER BY id', [], function (err, rows, fields) {
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
 * Returns all Director objects for a given serial ID
 * @param {object} connection SQLite connection
 * @param {number} serialID Serial database ID
 * @returns {Array} Array of Director objects
 */
method.forSerialID = memoize(function (connection, serialID) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT directors.* FROM serials INNER JOIN serials_directors ON serials.id = serials_directors.serial_id INNER JOIN directors ON serials_directors.director_id = directors.id WHERE serials.id = ?', [serialID], function (err, rows, fields) {
            if (!err) {
                if (rows && rows.length) {
                    resolve(rows.map(function (x) { return self.fromRow(x).addHATEAOS(); }, rows));
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
 * Returns a new Director object populated from a basic JavaScript object (database result row)
 * @param {object} row Object with fields to copy to a new Director
 * @returns {Director}
 * @static
 */
method.fromRow = function (row) {
    var director = new Director();
    row.id ? (director.id = row.id) : undefined;
    row.name ? (director.name = row.name) : undefined;
    return director;
}

/**
 * Returns the canonical REST API v1 endpoint for a Director
 * @param {number} id Database record ID
 * @return {string} REST API v1 endpoint URL
 * @static
 */
method.restv1URL = memoize(function (id) {
    return ("/v1/directors" + ((id !== undefined) ? ("/" + id) : ""));
});

/**
 * Adds HATEAOS data to a Director object
 * @param {Director|undefined} Object representing a Director, uses current object (this) if undefined
 * @returns {Director}
 */
method.addHATEAOS = function (director) {
    if (director === undefined) {
        director = this;
    }
    director.links = [];
    director.links.push({ rel: "self", href: this.restv1URL(director.id) });
    return director;
}

module.exports = method;