/**
 * @file Doctor class
 * @author Dave Ross <dave@davidmichaelross.com> 
 */

const memoize = require('memoizee');

var method = Doctor.prototype;

/**
 * Creates a new Doctor
 * @class
 */
function Doctor() {
    var id, incarnation, actor;
}

/**
 * Returns a single Doctor object for a given database ID
 * @param {object} connection SQLite connection
 * @param {number} id Doctor database ID
 * @returns {Promise} Single Doctor record
 */
method.forID = memoize(function (connection, id) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM doctors WHERE id = ?', [id], function (err, rows, fields) {
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
 * Returns a single Doctor object for a given database ID
 * @param {object} connection SQLite connection
 * @param {number} id Doctor database ID
 * @returns {Promise} Single Doctor record
 */
method.forIncarnation = memoize(function (connection, incarnation) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM doctors WHERE incarnation = ?', [incarnation], function (err, rows, fields) {
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
 * Returns a single Doctor object for a given database ID
 * @param {object} connection SQLite connection
 * @param {number} id Doctor database ID
 * @returns {Promise} Single Doctor record
 */
method.forActor = memoize(function (connection, actor) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM doctors WHERE actor = ?', [actor], function (err, rows, fields) {
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
 * Returns all Doctor objects in the system
 * @param {object} connection SQLite connection
 * @returns {Promise} Array of Doctor objects
 */
method.all = memoize(function (connection) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM doctors ORDER BY id', [], function (err, rows, fields) {
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
 * Returns all Doctor objects for a given serial ID
 * @param {object} connection SQLite connection
 * @param {number} serialID Serial database ID
 * @returns {Array} Array of Doctor objects
 */
method.forSerialID = memoize(function (connection, serialID) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT doctors.* FROM serials INNER JOIN serials_doctors ON serials.id = serials_doctors.serial_id INNER JOIN doctors ON serials_doctors.doctor_id = doctors.id WHERE serials.id = ?', [serialID], function (err, rows, fields) {
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
 * Returns a new Doctor object populated from a basic JavaScript object (database result row)
 * @param {object} row Object with fields to copy to a new Doctor
 * @returns {Doctor}
 * @static
 */
method.fromRow = function (row) {
    var doctor = new Doctor();
    row.id ? (doctor.id = row.id) : undefined;
    row.incarnation ? (doctor.incarnation = row.incarnation) : undefined;
    row.actor ? (doctor.actor = row.actor) : undefined;
    return doctor;
}

/**
 * Returns the canonical REST API v1 endpoint for a Doctor
 * @param {number} id Database record ID
 * @return {string} REST API v1 endpoint URL
 * @static
 */
method.restv1URL = memoize(function (id) {
    return ("/v1/doctors" + ((id !== undefined) ? ("/" + id) : ""));
});

/**
 * Adds HATEAOS data to a Doctor object
 * @param {Doctor|undefined} Object representing a Doctor, uses current object (this) if undefined
 * @returns {Doctor}
 */
method.addHATEAOS = function (doctor) {
    if (doctor === undefined) {
        doctor = this;
    }
    doctor.links = [];
    doctor.links.push({ rel: "self", href: this.restv1URL(doctor.id) });
    return doctor;
}

module.exports = method;