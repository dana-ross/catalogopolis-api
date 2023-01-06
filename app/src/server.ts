/**
 * @file Catalogopolis API Bootstrap/Initialization
 * @author Dana Ross <dana@danaross.dev>
 */

require('dotenv').config()
import polka from 'polka'
import {Application} from 'polka'
import restv1 from "./restv1"
import { Database } from 'sqlite3'
import graphql from "./graphql"
import analytics from "./analytics"
import favicon from "./favicon"
import cors from "./cors"

const connection: Database = new Database('catalogopolis-api.sqlite');

const server: Application = polka();

if(!process.env.CATALOGOPOLIS_API_UA) {
	throw('CATALOGOPOLIS_API_UA environment variable must be set')
}

favicon(server)
analytics(server, process.env.CATALOGOPOLIS_API_UA)
cors(server)
restv1(server, connection);
graphql(server, connection);

server.listen(process.env.CATALOGOPOLIS_API_PORT || 5000);
