/**
 * @file TimedRequest interface
 * @author Dave Ross <dave@davidmichaelross.com>
 */

interface TimedRequest extends Request {
	timingData: {
		'start': number,
	}
}

export default TimedRequest
