/**
 * @file Actor class
 * @author Dana Ross <dana@danaross.dev>
 */

import { Database } from 'sqlite3'
import DBRecord from "./interfaces/dbrecord"
import Named from "./interfaces/named"
import HATEAOSLink from "./interfaces/hateaoslink"
import { Doctor, DoctorRow } from './doctor'
import memoize from 'memoized-class-decorator'

export enum Gender {
	"male",
	"female"
}

export interface ActorRow extends DBRecord {
	id: number;
	name: string;
	gender: Gender;
}

/**
 * Creates a new Actor
 * @class
 */
export class Actor implements DBRecord, Named {
	id: number
	name: string
	gender: Gender
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
		const actor = new Actor();
		row.id ? (actor.id = row.id) : undefined;
		row.name ? (actor.name = row.name) : undefined;
		row.gender ? (actor.gender = row.gender) : undefined;
		return actor;
	}

	/**
	 * Returns a single Actor object for a given database ID
	 * @param {object} connection SQLite connection
	 * @param {number} id Actor database ID
	 * @returns {Actor}
	 */
	@memoize
	static forID(connection: Database, id: number): Promise<Actor> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM actors WHERE id = ?', [id], function (err, rows: Array<ActorRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(Actor.fromRow(rows[0]).addHATEAOS());
					}
					else {
						resolve();
					}
				} else {
					reject({ error: { message: 'Error while performing Query.' } });
				}
			});
		});
	}

	/**
	 * Returns all Actor objects in the system
	 * @param {Database} connection SQLite connection
	 * @returns {Array} Array of Actor objects
	 */
	@memoize
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
	}

	/**
	 * Returns a single Actor by the Actor's name
	 * @param {object} connection SQLite connection
	 * @param {string} name The Actor's name
	 * @returns {Promise} Single Actor record
	 */
	@memoize
	static forName(connection: Database, name: string): Promise<Actor> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM actors WHERE name = ?', [name], function (err, rows: Array<ActorRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(Actor.fromRow(rows[0]).addHATEAOS());
					}
					else {
						resolve();
					}
				} else {
					reject({ error: { message: 'Error while performing Query.' } });
				}
			});
		});
	}

	/**
	 * Returns a single Actor by the Actor's gender
	 * @param {object} connection SQLite connection
	 * @param {Gender} gender The Actor's gender
	 * @returns {Array} Array of Actor objects
	 */
	@memoize
	static forGender(connection: Database, gender: Gender): Promise<Array<Actor>> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM actors WHERE gender = ?', [gender], function (err, rows: Array<ActorRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(rows.map((x) => { return Actor.fromRow(x).addHATEAOS(); }, rows));
					}
					else {
						resolve([]);
					}
				} else {
					reject({ error: { message: 'Error while performing Query.' } });
				}
			});
		});
	}

	/**
	 * Returns all Doctor objects for a given Actor ID
	 * @param {object} connection SQLite connection
	 * @param {number} actorID Actor database ID
	 * @returns {Array} Array of Doctor objects
	 */
	@memoize
	static doctors(connection: Database, actorID: number): Promise<Array<Doctor>> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT doctors.* FROM doctors WHERE doctors.primary_actor = ? ORDER BY doctors.id', [actorID], function (err, rows: Array<DoctorRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(rows.map(function (x) { return Doctor.fromRow(x).addHATEAOS(); }, rows));
					}
					else {
						resolve([]);
					}
				} else {
					reject({ error: { message: 'Error while performing Query.' } });
				}
			});
		});

	}

}
