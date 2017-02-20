var restify = require('restify'),
    restv1 = require('./restv1'),
    sqlite3 = require('sqlite3').verbose();

var connection = new sqlite3.Database('/code/catalogopolis-api.sqlite', sqlite3.OPEN_READONLY);

/**
 * Perform a MySQL query and send a basic response with the rows returned.
 * 
 * @param {string} query MySQL query text
 * @param {array} params Prepared query parameters
 * @param {any} res Response object
 * @param {callback} next Next handler 
 */
function doQuerySendResponse(query, params, res, next) {
    connection.run(query, params, function (err, rows, fields) {
        if (!err) {
            if (rows && rows.length) {
                res.send(200, rows);
                return next();
            }
            else {
                res.send(404);
                return next();
            }
        } else {
            console.log('Error while performing Query.');
        }
    });
}

var server = restify.createServer({
    name: 'Catalogopolis API',
});

restv1.init(server, connection);

server.listen(5000);