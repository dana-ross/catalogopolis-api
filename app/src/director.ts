/**
 * @file Director class
 * @author Dana Ross <dana@danaross.dev>
 */

import { Database } from 'sqlite3'
import { Serial } from "./serial"
import DBRecord from "./interfaces/dbrecord"
import Named from "./interfaces/named"
import HATEAOSLink from "./interfaces/hateaoslink"
import memoize from "memoized-class-decorator"

interface DirectorRow extends DBRecord {
	id: number;
	name: string;
}

/**
 * Creates a new Director
 * @class
 */
export class Director implements DBRecord, Named {
	id: number
	name: string
	links: Array<HATEAOSLink>

	/**
	 * Returns a single Director object for a given database ID
	 * @param {object} connection SQLite connection
	 * @param {number} id Director database ID
	 * @returns {Promise}
	 */
	@memoize
	static forID(connection: Database, id: number): Promise<Director> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM directors WHERE id = ?', [id], function (err, rows: Array<DirectorRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(Director.fromRow(rows[0]).addHATEAOS());
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
	 * Returns all Director objects in the system
	 * @param {object} connection SQLite connection
	 * @returns {Array} Array of Director objects
	 */
	@memoize
	static all(connection: Database): Promise<Array<Director>> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM directors ORDER BY id', [], function (err, rows: Array<DirectorRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(rows.map(function (x) { return Director.fromRow(x).addHATEAOS(); }));
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
	 * Returns a single Director by the Director's name
	 * @param {object} connection SQLite connection
	 * @param {string} name The Director's name
	 * @returns {Promise} Single Director record
	 */
	@memoize
	static forName(connection: Database, name: string): Promise<Director> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM directors WHERE name = ?', [name], function (err, rows: Array<DirectorRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(Director.fromRow(rows[0]).addHATEAOS());
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
	 * Returns all Director objects for a given serial ID
	 * @param {object} connection SQLite connection
	 * @param {number} serialID Serial database ID
	 * @returns {Array} Array of Director objects
	 */
	@memoize
	static forSerialID(connection: Database, serialID: number): Promise<Array<Director>> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT directors.* FROM serials INNER JOIN serials_directors ON serials.id = serials_directors.serial_id INNER JOIN directors ON serials_directors.director_id = directors.id WHERE serials.id = ?', [serialID], function (err, rows: Array<DirectorRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(rows.map(function (x) { return Director.fromRow(x).addHATEAOS(); }, rows));
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
	 * Returns all Serial objects for a given Director ID
	 * @param {object} connection SQLite connection
	 * @param {number} directorID Director database ID
	 * @returns {Array} Array of Serial objects
	 */
	@memoize
	static serials(connection: Database, directorID: number): Promise<Array<Serial>> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT serials.* FROM serials INNER JOIN serials_directors ON serials.id = serials_directors.serial_id INNER JOIN directors ON serials_directors.director_id = directors.id WHERE directors.id = ? ORDER BY serials.id', [directorID], function (err, rows, fields) {
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
	 * Returns a new Director object populated from a basic JavaScript object (database result row)
	 * @param {object} row Object with fields to copy to a new Director
	 * @returns {Director}
	 * @static
	 */
	static fromRow(row: DirectorRow): Director {
		const director = new Director();
		row.id ? (director.id = row.id) : undefined;
		row.name ? (director.name = row.name) : undefined;
		return director;
	}

	/**
	 * Returns the canonical REST API v1 endpoint for a Director
	 * @param {number} id Database record ID
	 * @return {string} REST API v1 endpoint URL
	 * @static
	 */
	static restv1URL(id: number): string {
		return "/v1/directors/" + id
	}

	/**
	 * Adds HATEAOS data to a Director object
	 * @param {Director} Object representing a Director
	 * @returns {Director}
	 */
	static addHATEAOSTo(director: Director): Director {
		director.links = [];
		director.links.push({ rel: "self", href: Director.restv1URL(director.id) });
		return director;
	}

	/**
	 * Adds HATEAOS data to the current Director instance
	 * @returns {Director}
	 */
	addHATEAOS(): Director {
		return Director.addHATEAOSTo(this)
	}
}
