/**
 * @file Catalogopolis API Bootstrap/Initialization
 * @author Dave Ross <dave@davidmichaelross.com> 
 */

var restify = require('restify'),
    restv1 = require('./restv1'),
    sqlite3 = require('sqlite3').verbose(),
    graphql = require('./graphql');

var connection = new sqlite3.Database('/code/catalogopolis-api.sqlite', sqlite3.OPEN_READONLY);

var server = restify.createServer({
    name: 'Catalogopolis API',
});
server.use(restify.queryParser());

restv1.init(server, connection);
graphql.init(server, connection);

server.listen(5000);