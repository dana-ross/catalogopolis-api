/**
 * @file CostLimitedRequest interface
 * @author Dave Ross <dave@davidmichaelross.com>
 */

interface CostLimitedRequest extends Request {
	resolverCount: number;
	incrementResolverCount: Function;
}

export default CostLimitedRequest
