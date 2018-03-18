/**
 * @file CORS middleware
 * @author Dave Ross <dave@davidmichaelross.com>
 */

import { Application, Request, Response } from "polka"

export default function corsAllowAll(server: Application) {

	server.use("/graphql", function (req: Request, res: Response, next: Function) {
		res.setHeader('Access-Control-Allow-Origin', '*')
		if (req.method === 'OPTIONS') {
		  res.statusCode = 200
		  res.end()
		} else {
		  next()
		}
	});

}
