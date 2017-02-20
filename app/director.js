var method = Director.prototype;
function Director() {
    var id, name;
}

method.forID = function (connection, id) {
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
}

method.all = function (connection) {
    var self = this;
    return new Promise(function (resolve, reject) {
        connection.all('SELECT * FROM directors ORDER BY id', [], function (err, rows, fields) {
            if (!err) {
                if (rows && rows.length) {
                    resolve(rows.map(function(x) { return self.fromRow(x).addHATEAOS(); }));
                }
                else {
                    resolve([]);
                }
            } else {
                reject({ error: { message: 'Error while performing Query.' } });
            }
        });
    });
}

method.fromRow = function (row) {
    var director = new Director();
    row.id ? (director.id = row.id) : undefined;
    row.name ? (director.name = row.name) : undefined;
    return director;
}

method.restv1URL = function (id) {
    return ("/v1/directors" + ((id !== undefined) ? ("/" + id) : ""));
}

method.addHATEAOS = function (director) {
    if(director === undefined) {
        director = this;
    }
    director.links = [];
    director.links.push({ rel: "self", href: this.restv1URL(director.id) });
    return director;
}

module.exports = method;