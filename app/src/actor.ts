/**
 * @file Actor class
 * @author Dave Ross <dave@davidmichaelross.com>
 */

import { Database } from "sqlite3"
import DBRecord from "./interfaces/dbrecord"
import Named from "./interfaces/named"
import HATEAOSLink from "./interfaces/hateaoslink"

export interface ActorRow extends DBRecord {
	id: number
	name: string
}

/**
 * Creates a new Actor
 * @class
 */
export class Actor implements DBRecord, Named {
	id: number
	name: string
	links: Array<HATEAOSLink>

	/**
	 * Returns the canonical REST API v1 endpoint for a Actor
	 * @param {number} id Database record ID
	 * @return {string} REST API v1 endpoint URL
	 * @static
	 */
	static restv1URL(id: number): string {
		return "/v1/actors/" + id
	}

	/**
	 * Adds HATEAOS data to a Actor object
	 * @param {Actor} Object representing a Actor
	 * @returns {Actor}
	 */
	 static addHATEAOSTo(actor: Actor): Actor {
		actor.links = []
		actor.links.push({ rel: "self", href: Actor.restv1URL(actor.id) })
		return actor
	}

	/**
	 * Adds HATEAOS data to the current Actor instance
	 * @returns {Actor}
	 */
	addHATEAOS(): Actor {
		return Actor.addHATEAOSTo(this)
	}

	/**
	 * Returns a new Actor object populated from a basic JavaScript object (database result row)
	 * @param {object} row Object with fields to copy to a new Actor
	 * @returns {Actor}
	 * @static
	 */
	static fromRow(row: ActorRow): Actor {
		var actor = new Actor();
		row.id ? (actor.id = row.id) : undefined;
		row.name ? (actor.name = row.name) : undefined;
		return actor;
	}

	/**
	 * Returns a single Actor object for a given database ID
	 * @param {object} connection SQLite connection
	 * @param {number} id Actor database ID
	 * @returns {Actor}
	 */
	static forID(connection: Database, id: number): Promise<Actor> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM actors WHERE id = ?', [id], function (err, rows: Array<ActorRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(Actor.fromRow(rows[0]).addHATEAOS());
					}
					else {
						resolve([]);
					}
				} else {
					reject({ error: { message: 'Error while performing Query.' } });
				}
			});
		});
	};

	/**
	 * Returns all Actor objects in the system
	 * @param {Database} connection SQLite connection
	 * @returns {Array} Array of Actor objects
	 */
	static all(connection: Database): Promise<Array<Actor>> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM actors ORDER BY id', [], function (err, rows: Array<ActorRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(rows.map(function (x) { return Actor.fromRow(x).addHATEAOS(); }));
					}
					else {
						resolve([]);
					}
				} else {
					reject({ error: { message: 'Error while performing Query.' } });
				}
			});
		});
	};

	/**
	 * Returns a single Actor by the Actor's name
	 * @param {object} connection SQLite connection
	 * @param {string} name The Actor's name
	 * @returns {Promise} Single Actor record
	 */
	static forName(connection: Database, name: string): Promise<Actor> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM actors WHERE name = ?', [name], function (err, rows: Array<ActorRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(Actor.fromRow(rows[0]).addHATEAOS());
					}
					else {
						resolve([]);
					}
				} else {
					reject({ error: { message: 'Error while performing Query.' } });
				}
			});
		});
	};

}
