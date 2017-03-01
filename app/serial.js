/**
 * @file Serial class
 * @author Dave Ross <dave@davidmichaelross.com>
 */

const memoize = require('memoizee');

var method = Serial.prototype;

/**
 * Creates a new Serial
 * @class
 */
function Serial() {
    var id, seasonID, story, serial, title, productionCode;
}

/**
 * Returns a single Serial object for a given database ID
 * @param {object} connection SQLite connection
 * @param {number} id Serial database ID
 * @returns {Serial}
 */
method.forID = memoize(function (connection, id) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM serials WHERE id = ?', [id], function (err, rows, fields) {
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
 * Returns a single Season by the Serial's title
 * @param {object} connection SQLite connection
 * @param {string} name The Serial's name
 * @returns {Promise} Single Serial record
 */
method.forTitle = memoize(function (connection, title) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM serials WHERE title = ?', [title], function (err, rows, fields) {
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
 * Returns all Serial objects in the system
 * @param {object} connection SQLite connection
 * @returns {Array} Array of Serial objects
 */
method.all = memoize(function (connection) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM serials ORDER BY id', [], function (err, rows, fields) {
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
 * Returns a new Serial object populated from a basic JavaScript object (database result row)
 * @param {object} row Object with fields to copy to a new Serial
 * @returns {Serial}
 * @static
 */
method.fromRow = function (row) {
    var serial = new Serial();
    row.id ? (serial.id = row.id) : undefined;
    row.season_id ? (serial.seasonID = row.season_id) : undefined;
    row.story ? (serial.story = row.story) : undefined;
    row.serial ? (serial.serial = row.serial) : undefined;
    row.title ? (serial.title = row.title) : undefined;
    row.production_code ? (serial.productionCode = row.production_code) : undefined;
    return serial;
}

/**
 * Returns the canonical REST API v1 endpoint for a Serial
 * @param {number} id Database record ID
 * @return {string} REST API v1 endpoint URL
 * @static
 */
method.restv1URL = memoize(function (id) {
    return ("/v1/serials" + ((id !== undefined) ? ("/" + id) : ""));
});

/**
 * Adds HATEAOS data to a Serial object
 * @param {Serial|undefined} Object representing a Serial, uses current object (this) if undefined
 * @returns {Serial}
 */
method.addHATEAOS = function (serial) {
    if (serial === undefined) {
        serial = this;
    }
    serial.links = [];
    serial.links.push({ rel: "self", href: this.restv1URL(serial.id) });
    return serial;
}

module.exports = method;
