/**
 * @file CORS middleware
 * @author Dave Ross <dave@davidmichaelross.com>
 */

import { Application, Request, Response } from "polka"

export default function corsAllowAll(server: Application) {

	server.use("/graphql", function (req: Request, res: Response, next: Function) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
		if (req.method === 'OPTIONS') {
		  res.sendStatus(200);
		} else {
		  next();
		}
	});

}
