/**
 * @file CORS middleware
 * @author Dave Ross <dave@davidmichaelross.com>
 */

import { Application, Request, Response } from "polka"

export default function corsAllowAll(server: Application) {

	server.use("/graphql", function (req: Request, res: Response, next: Function) {
		res.set('Access-Control-Allow-Origin', '*');
		if (req.method === 'OPTIONS') {
		  res.sendStatus(200);
		} else {
		  next();
		}
	});

}
