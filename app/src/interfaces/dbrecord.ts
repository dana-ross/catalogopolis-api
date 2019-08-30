/**
 * @file DBRecord interface
 * @author Dave Ross <dave@davidmichaelross.com>
 */

import HATEAOSLink from "./hateaoslink"

interface DBRecord {
	id: number;
	links: Array<HATEAOSLink>;
}

export default DBRecord
