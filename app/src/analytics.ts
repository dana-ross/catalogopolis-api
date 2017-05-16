import { Application } from "express"
import ua from "universal-analytics"
import TimedRequest from "./interfaces/timedrequest"
import EventedResponse from "./interfaces/eventedresponse"

/**
 * Get the API Type custom dimension value for a request
 *
 * @param req {TimedRequest} Express Request object
 * @return String
 */
function requestType(req: TimedRequest) : String {
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
export default function register(server: Application, trackingID: String) {
	server.use((req: TimedRequest, res: EventedResponse, next: Function) => {
		req.timingData = {
			'start': Date.now()
		}

		res.on('finish', () => {
			let visitor = ua(trackingID, { https: true })
			visitor
				.pageview(req.originalUrl)
				.event('Request Type', requestType(req))
				.timing('API request', 'Complete request', Date.now() - req.timingData.start)
				.send()
		})

		next()
	})
}
