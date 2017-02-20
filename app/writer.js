var memoize = require('memoizee');

var method = Writer.prototype;
function Writer() {
    var id, name;
}

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

method.all = memoize(function (connection) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM writers ORDER BY id', [], function (err, rows, fields) {
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
    var writer = new Writer();
    row.id ? (writer.id = row.id) : undefined;
    row.name ? (writer.name = row.name) : undefined;
    return writer;
}

method.restv1URL = function (id) {
    return ("/v1/writers" + ((id !== undefined) ? ("/" + id) : ""));
}

method.addHATEAOS = function (writer) {
    if(writer === undefined) {
        writer = this;
    }
    writer.links = [];
    writer.links.push({ rel: "self", href: this.restv1URL(writer.id) });
    return writer;
}

module.exports = method;