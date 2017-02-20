var memoize = require('memoizee');

var method = Doctor.prototype;
function Doctor() {
    var id, incarnation, actor;
}

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

method.all = memoize(function (connection) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM doctors ORDER BY id', [], function (err, rows, fields) {
            if (!err) {
                if (rows && rows.length) {
                    resolve(rows.map(function(x) { return self.fromRow(x).addHATEAOS(); }, rows));
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

method.forSerialID = memoize(function(connection, serialID) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT doctors.* FROM serials INNER JOIN serials_doctors ON serials.id = serials_doctors.serial_id INNER JOIN doctors ON serials_doctors.doctor_id = doctors.id WHERE serials.id = ?', [serialID], function (err, rows, fields) {
            if (!err) {
                if (rows && rows.length) {
                    resolve(rows.map(function(x) { return self.fromRow(x).addHATEAOS(); }, rows));
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
    var doctor = new Doctor();
    row.id ? (doctor.id = row.id) : undefined;
    row.incarnation ? (doctor.incarnation = row.incarnation) : undefined;
    row.actor ? (doctor.actor = row.actor) : undefined;
    return doctor;
}

method.restv1URL = function (id) {
    return ("/v1/doctors" + ((id !== undefined) ? ("/" + id) : ""));
}

method.addHATEAOS = function (doctor) {
    if(doctor === undefined) {
        doctor = this;
    }
    doctor.links = [];
    doctor.links.push({ rel: "self", href: this.restv1URL(doctor.id) });
    return doctor;
}

module.exports = method;