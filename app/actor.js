/**
 * @file Actor class
 * @author Dave Ross <dave@davidmichaelross.com>
 */

const memoize = require('memoizee');

var method = Actor.prototype;

/**
 * Creates a new Actor
 * @class
 */
function Actor() {
    var id, name;
}

/**
 * Returns a single Actor object for a given database ID
 * @param {object} connection SQLite connection
 * @param {number} id Actor database ID
 * @returns {Actor}
 */
method.forID = memoize(function (connection, id) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM actors WHERE id = ?', [id], function (err, rows, fields) {
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
 * Returns all Actor objects in the system
 * @param {object} connection SQLite connection
 * @returns {Array} Array of Actor objects
 */
method.all = memoize(function (connection) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM actors ORDER BY id', [], function (err, rows, fields) {
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
 * Returns a single Actor by the Actor's name
 * @param {object} connection SQLite connection
 * @param {string} name The Actor's name
 * @returns {Promise} Single Actor record
 */
method.forName = memoize(function (connection, name) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM actors WHERE name = ?', [name], function (err, rows, fields) {
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
 * Returns a new Actor object populated from a basic JavaScript object (database result row)
 * @param {object} row Object with fields to copy to a new Actor
 * @returns {Actor}
 * @static
 */
method.fromRow = function (row) {
    var actor = new Actor();
    row.id ? (actor.id = row.id) : undefined;
    row.name ? (actor.name = row.name) : undefined;
    return actor;
}

/**
 * Returns the canonical REST API v1 endpoint for a Actor
 * @param {number} id Database record ID
 * @return {string} REST API v1 endpoint URL
 * @static
 */
method.restv1URL = memoize(function (id) {
    return ("/v1/actors" + ((id !== undefined) ? ("/" + id) : ""));
});

/**
 * Adds HATEAOS data to a Actor object
 * @param {Actor|undefined} Object representing a Actor, uses current object (this) if undefined
 * @returns {Actor}
 */
method.addHATEAOS = function (actor) {
    if (actor === undefined) {
        actor = this;
    }
    actor.links = [];
    actor.links.push({ rel: "self", href: this.restv1URL(actor.id) });
    return actor;
}

module.exports = method;
