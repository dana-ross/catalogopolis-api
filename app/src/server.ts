import { Request } from 'express';
/**
 * @file Catalogopolis API Bootstrap/Initialization
 * @author Dave Ross <dave@davidmichaelross.com>
 */

require('dotenv').config()
import express from "express"
import {Application} from "express"
import restv1 from "./restv1"
import { Database } from "sqlite3"
import graphql from "./graphql"
import * as path from "path"
import analytics from "./analytics"
import favicon from "./favicon"

var connection: Database = new Database('catalogopolis-api.sqlite');

var server: Application = express();

if(!process.env.CATALOGOPOLIS_API_UA) {
	throw('CATALOGOPOLIS_API_UA environment variable must be set')
}

favicon(server)
analytics(server, process.env.CATALOGOPOLIS_API_UA)
restv1(server, connection);
graphql(server, connection);

server.listen(process.env.CATALOGOPOLIS_API_PORT || 5000);
