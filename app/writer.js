/**
 * @file Writer class
 * @author Dave Ross <dave@davidmichaelross.com>
 */

const memoize = require('memoizee'),
	  Serial = require('./serial');

var method = Writer.prototype;

/**
 * Creates a new Writer
 * @class
 */
function Writer() {
    var id, name;
}

/**
 * Returns a single Writer object for a given database ID
 * @param {object} connection SQLite connection
 * @param {number} id Writer database ID
 * @returns {Writer}
 */
method.forID = memoize(function (connection, id) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM writers WHERE id = ?', [id], function (err, rows, fields) {
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
 * Returns all Writer objects in the system
 * @param {object} connection SQLite connection
 * @returns {Array} Array of Writer objects
 */
method.all = memoize(function (connection) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM writers ORDER BY id', [], function (err, rows, fields) {
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
 * Returns a single Writer by the Writers's name
 * @param {object} connection SQLite connection
 * @param {string} name The Writer's name
 * @returns {Promise} Single Writer record
 */
method.forName = memoize(function (connection, name) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM writers WHERE name = ?', [name], function (err, rows, fields) {
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
 * Returns all Writer objects for a given writer ID
 * @param {object} connection SQLite connection
 * @param {number} serialID Writer database ID
 * @returns {Array} Array of Writer objects
 */
method.forSerialID = memoize(function (connection, serialID) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT writers.* FROM serials INNER JOIN serials_writers ON serials.id = serials_writers.serial_id INNER JOIN writers ON serials_writers.writer_id = writers.id WHERE serials.id = ?', [serialID], function (err, rows, fields) {
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
 * Returns all Serial objects for a given Writer ID
 * @param {object} connection SQLite connection
 * @param {number} writerID Writer database ID
 * @returns {Array} Array of Serial objects
 */
method.serials = memoize(function (connection, writerID) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT serials.* FROM serials INNER JOIN serials_writers ON serials.id = serials_writers.serial_id INNER JOIN writers ON serials_writers.writer_id = writers.id WHERE writers.id = ? ORDER BY serials.id', [writerID], function (err, rows, fields) {
            if (!err) {
                if (rows && rows.length) {
                    resolve(rows.map(function (x) { return Serial.fromRow(x).addHATEAOS(); }, rows));
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
 * Returns a new Writer object populated from a basic JavaScript object (database result row)
 * @param {object} row Object with fields to copy to a new Writer
 * @returns {Writer}
 * @static
 */
method.fromRow = function (row) {
    var writer = new Writer();
    row.id ? (writer.id = row.id) : undefined;
    row.name ? (writer.name = row.name) : undefined;
    return writer;
}

/**
 * Returns the canonical REST API v1 endpoint for a Writer
 * @param {number} id Database record ID
 * @return {string} REST API v1 endpoint URL
 * @static
 */
method.restv1URL = memoize(function (id) {
    return ("/v1/writers" + ((id !== undefined) ? ("/" + id) : ""));
});

/**
 * Adds HATEAOS data to a Writer object
 * @param {Writer|undefined} Object representing a Writer, uses current object (this) if undefined
 * @returns {Writer}
 */
method.addHATEAOS = function (writer) {
    if (writer === undefined) {
        writer = this;
    }
    writer.links = [];
    writer.links.push({ rel: "self", href: this.restv1URL(writer.id) });
    return writer;
}

module.exports = method;
