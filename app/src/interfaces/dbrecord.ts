/**
 * @file DBRecord interface
 * @author Dana Ross <dana@danaross.dev>
 */

import HATEAOSLink from "./hateaoslink"

interface DBRecord {
	id: number;
	links: Array<HATEAOSLink>;
}

export default DBRecord
