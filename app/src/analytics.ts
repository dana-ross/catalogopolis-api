import { Application } from "express"
import ua from "universal-analytics"
import TimedRequest from "./interfaces/timedrequest"
import EventedResponse from "./interfaces/eventedresponse"

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
			visitor.pageview(req.url).timing('API request', 'Complete request', Date.now() - req.timingData.start).send()
		})

		next()
	})
}
