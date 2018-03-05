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
			res.statusCode = 200
			res.setHeader('Content-Type', 'image/x-icon');
			res.write('')
			return
		}

		next()
	})
}
