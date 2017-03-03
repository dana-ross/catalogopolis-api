/**
 * @file Catalogopolis API Bootstrap/Initialization
 * @author Dave Ross <dave@davidmichaelross.com>
 */

const express = require('express'),
    restv1 = require('./restv1'),
    sqlite3 = require('sqlite3').verbose(),
    graphql = require('./graphql');

var connection = new sqlite3.Database('catalogopolis-api.sqlite', sqlite3.OPEN_READONLY);

var server = express();

restv1.init(server, connection);
graphql.init(server, connection);

server.listen(5000);
