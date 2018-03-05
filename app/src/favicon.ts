/**
 * @file Favicon.ico handler middleware
 * @author Dave Ross <dave@davidmichaelross.com>
 */

import { Application, Request, Response } from 'polka'

/**
 * Register middleware to silently "handle" favicon requests
 *
 * @param server {Application} Express application
 */
export default function (server: Application) {
	server.use((req: Request, res: Response, next: Function) => {
		if (req.url === '/favicon.ico') {
			res.status(200)
			res.type('image/x-icon')
			res.send('')
			return
		}

		next()
	})
}
