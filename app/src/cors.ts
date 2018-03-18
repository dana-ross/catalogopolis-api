/**
 * @file CORS middleware
 * @author Dave Ross <dave@davidmichaelross.com>
 */

import { Application, Request, Response } from "polka"

export default function corsAllowAll(server: Application) {
	server.use((req: Request, res: Response, next: Function) => {
		res.setHeader('Access-Control-Allow-Origin', '*')
		next()
	})
}
