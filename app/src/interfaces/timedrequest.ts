/**
 * @file TimedRequest interface
 * @author Dave Ross <dave@davidmichaelross.com>
 */

interface TimedRequest extends Request {
	timingData: {
		'start': number,
	}
	originalUrl: String
}

export default TimedRequest
