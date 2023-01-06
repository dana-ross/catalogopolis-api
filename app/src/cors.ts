/**
 * @file CORS middleware
 * @author Dana Ross <dana@danaross.dev>
 */

import { Application, Request, Response } from 'polka'

export default function corsAllowAll(server: Application) {

	server.use(function (req: Request, res: Response, next: Function) {
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS' )
		res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
		if (req.method === 'OPTIONS') {
		  res.statusCode = 200
		  res.end()
		} else {
		  next()
		}
	})

}
