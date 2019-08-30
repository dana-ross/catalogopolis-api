/**
 * @file Companion class
 * @author Dave Ross <dave@davidmichaelross.com>
 */

import { Database } from 'sqlite3'
import { Serial } from "./serial"
import DBRecord from "./interfaces/dbrecord"
import Named from "./interfaces/named"
import HATEAOSLink from "./interfaces/hateaoslink"
import memoize from "memoized-class-decorator"

interface CompanionRow extends DBRecord {
	id: number;
	name: string;
}

/**
 * Creates a new Companion
 * @class
 */
export class Companion implements DBRecord, Named {
	id: number
	name: string
	links: Array<HATEAOSLink>

	/**
	 * Returns a single Companion object for a given database ID
	 * @param {object} connection SQLite connection
	 * @param {number} id Companion database ID
	 * @returns {Promise}
	 */
	@memoize
	static forID(connection: Database, id: number): Promise<Companion> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM companions WHERE id = ?', [id], function (err, rows: Array<CompanionRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(Companion.fromRow(rows[0]).addHATEAOS());
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
	 * Returns all Companion objects in the system
	 * @param {object} connection SQLite connection
	 * @returns {Array} Array of Companion objects
	 */
	@memoize
	static all(connection: Database): Promise<Array<Companion>> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM companions ORDER BY id', [], function (err, rows: Array<CompanionRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(rows.map(function (x) { return Companion.fromRow(x).addHATEAOS(); }));
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
	 * Returns a single Companion by the Companion's name
	 * @param {object} connection SQLite connection
	 * @param {string} name The Companion's name
	 * @returns {Promise} Single Companion record
	 */
	@memoize
	static forName(connection: Database, name: string): Promise<Companion> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM companions WHERE name = ?', [name], function (err, rows: Array<CompanionRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(Companion.fromRow(rows[0]).addHATEAOS());
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
	 * Returns all Companion objects for a given serial ID
	 * @param {object} connection SQLite connection
	 * @param {number} serialID Serial database ID
	 * @returns {Array} Array of Companion objects
	 */
	@memoize
	static forSerialID(connection: Database, serialID: number): Promise<Array<Companion>> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT companions.* FROM serials INNER JOIN serials_companions ON serials.id = serials_companions.serial_id INNER JOIN companions ON serials_companions.companion_id = companions.id WHERE serials.id = ?', [serialID], function (err, rows: Array<CompanionRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(rows.map(function (x) { return Companion.fromRow(x).addHATEAOS(); }, rows));
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
	 * Returns all Serial objects for a given Companion ID
	 * @param {object} connection SQLite connection
	 * @param {number} companionID Companion database ID
	 * @returns {Array} Array of Serial objects
	 */
	@memoize
	static serials(connection: Database, companionID: number): Promise<Array<Serial>> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT serials.* FROM serials INNER JOIN serials_companions ON serials.id = serials_companions.serial_id INNER JOIN companions ON serials_companions.companion_id = companions.id WHERE companions.id = ? ORDER BY serials.id', [companionID], function (err, rows, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(rows.map(function (x) { return Serial.fromRow(x).addHATEAOS(); }, rows));
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
	 * Returns a new Companion object populated from a basic JavaScript object (database result row)
	 * @param {object} row Object with fields to copy to a new Companion
	 * @returns {Companion}
	 * @static
	 */
	static fromRow(row: CompanionRow): Companion {
		const companion = new Companion();
		row.id ? (companion.id = row.id) : undefined;
		row.name ? (companion.name = row.name) : undefined;
		return companion;
	}

	/**
	 * Returns the canonical REST API v1 endpoint for a Companion
	 * @param {number} id Database record ID
	 * @return {string} REST API v1 endpoint URL
	 * @static
	 */
	static restv1URL(id: number): string {
		return "/v1/companions/" + id
	}

	/**
	 * Adds HATEAOS data to a Companion object
	 * @param {Companion} Object representing a Companion
	 * @returns {Companion}
	 */
	static addHATEAOSTo(companion: Companion): Companion {
		companion.links = [];
		companion.links.push({ rel: "self", href: Companion.restv1URL(companion.id) });
		return companion;
	}

	/**
	 * Adds HATEAOS data to the current Companion instance
	 * @returns {Companion}
	 */
	addHATEAOS(): Companion {
		return Companion.addHATEAOSTo(this)
	}
}
