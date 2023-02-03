/**
 * @file CostLimitedRequest interface
 * @author Dana Ross <dana@danaross.dev>
 */

interface CostLimitedRequest extends Request {
	resolverCount: number;
	incrementResolverCount: Function;
}

export default CostLimitedRequest
