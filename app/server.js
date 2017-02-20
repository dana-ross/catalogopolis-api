var restify = require('restify'),
    restv1 = require('./restv1'),
    sqlite3 = require('sqlite3').verbose();

var  connection  =  new  sqlite3.Database('/code/catalogopolis-api.sqlite', sqlite3.OPEN_READONLY);

var server = restify.createServer({
    name: 'Catalogopolis API',
});

restv1.init(server, connection);

server.listen(5000);