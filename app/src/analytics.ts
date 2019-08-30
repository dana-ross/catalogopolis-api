import { Application, Request, Response } from 'polka'
import ua from "universal-analytics"

/**
 * Get the API Type custom dimension value for a request
 *
 * @param req {TimedRequest} Express Request object
 * @return String
 */
function requestType(req: Request): string {
	if(req.originalUrl.match(/^\/graphql\??/)) {
		return req.method === 'GET' ? 'GraphiQL' : 'GraphQL'
	}

	// Fall-through default
	return 'REST'
}

/**
 * Middleware for tracking request time
 *
 * @param server Application Express server object
 * @param trackingID String Analytics tracking ID
 */
export default function register(server: Application, trackingID: string) {
	server.use((req: Request, res: Response, next: Function) => {
		req.timingData = {
			'start': Date.now()
		}

		res.on('finish', () => {
			ua(trackingID, { https: true })
				.pageview(req.originalUrl)
				.event('Request Type', requestType(req))
				.timing('API request', 'Complete request', Date.now() - req.timingData.start)
				.send()
		})

		next()
	})
}
