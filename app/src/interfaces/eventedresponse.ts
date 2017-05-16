/**
 * @file EventedResponse interface
 * @author Dave Ross <dave@davidmichaelross.com>
 */

interface EventedResponse extends Response {
	on: Function
}


export default EventedResponse
