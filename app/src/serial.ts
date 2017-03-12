/**
 * @file Serial class
 * @author Dave Ross <dave@davidmichaelross.com>
 */

import DBRecord from "./dbrecord"
import Named from "./named"
import { Database } from "sqlite3"
import HATEAOSLink from "./hateaoslink"

export interface SerialRow extends DBRecord {
	season_id: number
	story: number
	serial: number
	title: string
	production_code: string
}

/**
 * Creates a new Serial
 * @class
 */
export class Serial implements DBRecord {
	id: number
	name: string
	links: Array<HATEAOSLink>
	seasonID: number
	story: number
	serial: number
	title: string
	productionCode: string

	/**
	 * Returns a single Serial object for a given database ID
	 * @param {object} connection SQLite connection
	 * @param {number} id Serial database ID
	 * @returns {Serial}
	 */
	static forID(connection, id) {
		var self = this;
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM serials WHERE id = ?', [id], function (err, rows: Array<SerialRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(Serial.fromRow(rows[0]).addHATEAOS());
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
	 * Returns a single Season by the Serial's title
	 * @param {object} connection SQLite connection
	 * @param {string} name The Serial's name
	 * @returns {Promise} Single Serial record
	 */
	static forTitle(connection: Database, title: string): Promise<Serial> {
		var self = this;
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM serials WHERE title = ?', [title], function (err, rows: Array<SerialRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(Serial.fromRow(rows[0]).addHATEAOS());
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
	 * Returns all Serial objects in the system
	 * @param {object} connection SQLite connection
	 * @returns {Array} Array of Serial objects
	 */
	static all(connection: Database): Promise<Array<Serial>> {
		var self = this;
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM serials ORDER BY id', [], function (err, rows: Array<SerialRow>, fields) {
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
	};

	/**
	 * Returns a new Serial object populated from a basic JavaScript object (database result row)
	 * @param {object} row Object with fields to copy to a new Serial
	 * @returns {Serial}
	 * @static
	 */
	static fromRow(row: SerialRow): Serial {
		var serial = new Serial();
		row.id ? (serial.id = row.id) : undefined;
		row.season_id ? (serial.seasonID = row.season_id) : undefined;
		row.story ? (serial.story = row.story) : undefined;
		row.serial ? (serial.serial = row.serial) : undefined;
		row.title ? (serial.title = row.title) : undefined;
		row.production_code ? (serial.productionCode = row.production_code) : undefined;
		return serial;
	}

	/**
	 * Returns the canonical REST API v1 endpoint for a Serial
	 * @param {number} id Database record ID
	 * @return {string} REST API v1 endpoint URL
	 * @static
	 */
	static restv1URL(id: number): string {
		return ("/v1/serials" + ((id !== undefined) ? ("/" + id) : ""));
	};

	/**
	 * Adds HATEAOS data to a Serial object
	 * @param {Serial|undefined} Object representing a Serial, uses current object (this) if undefined
	 * @returns {Serial}
	 */
	addHATEAOS(serial?: Serial): Serial {
		if (serial === undefined) {
			serial = this;
		}
		serial.links = [];
		serial.links.push({ rel: "self", href: Serial.restv1URL(serial.id) });
		return serial;
	}
}
