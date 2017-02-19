var method = Serial.prototype;
function Serial() {
    var id, seasonID, story, serial, title, productionCode;
}

method.forID = function (connection, id) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM serials WHERE id = ?', [id], function (err, rows, fields) {
            if (!err) {
                if (rows && rows.length) {
                    resolve(self.fromRow(rows[0]).addHATEAOS());
                }
                else {
                    resolve([]);
                }
            } else {
                console.log('Error while performing Query.');
                console.log(err);
                reject({ error: { message: 'Error while performing Query.' } });
            }
        });
    });
}

method.all = function (connection) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM serials ORDER BY id', [], function (err, rows, fields) {
            if (!err) {
                console.log(rows);
                if (rows && rows.length) {
                    console.log(rows.map(function(x) { return self.fromRow(x).addHATEAOS(); }));
                    resolve(rows.map(function(x) { return self.fromRow(x).addHATEAOS(); }, rows));
                }
                else {
                    resolve([]);
                }
            } else {
                console.log('Error while performing Query.');
                console.log(err);
                reject({ error: { message: 'Error while performing Query.' } });
            }
        });
    });
}

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

method.restv1URL = function (id) {
    return ("/v1/serials" + ((id !== undefined) ? ("/" + id) : ""));
}

method.addHATEAOS = function (serial) {
    if(serial === undefined) {
        serial = this;
    }
    serial.links = [];
    serial.links.push({ rel: "self", href: this.restv1URL(serial.id) });
    return serial;
}

module.exports = method;