/**
 * @file Writer class
 * @author Dave Ross <dave@davidmichaelross.com>
 */

import { Serial, SerialRow} from "./serial"
import HATEAOSLink from "./hateaoslink"
import DBRecord from "./dbrecord"
import Named from "./named"
import { Database } from "sqlite3"

export interface WriterRow extends DBRecord, Named {
	id: number
	name: string
}

/**
 * Creates a new Writer
 * @class
 */
export class Writer {
	id: number
	name: string
	links: Array<HATEAOSLink>

	/**
	* Returns a single Writer object for a given database ID
	* @param {object} connection SQLite connection
	* @param {number} id Writer database ID
	* @returns {Writer}
	*/
	static forID(connection: Database, id: number): Promise<Writer> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM writers WHERE id = ?', [id], function (err, rows: Array<WriterRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(Writer.fromRow(rows[0]).addHATEAOS());
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
	 * Returns all Writer objects in the system
	 * @param {object} connection SQLite connection
	 * @returns {Array} Array of Writer objects
	 */
	static all(connection: Database): Promise<Array<Writer>> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM writers ORDER BY id', [], function (err, rows: Array<WriterRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(rows.map(function (x) { return Writer.fromRow(x).addHATEAOS(); }, rows));
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
	 * Returns a single Writer by the Writers's name
	 * @param {object} connection SQLite connection
	 * @param {string} name The Writer's name
	 * @returns {Promise} Single Writer record
	 */
	static forName(connection: Database, name: string): Promise<Writer> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM writers WHERE name = ?', [name], function (err, rows: Array<WriterRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(Writer.fromRow(rows[0]).addHATEAOS());
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
	 * Returns all Writer objects for a given Serial ID
	 * @param {object} connection SQLite connection
	 * @param {number} serialID Serial database ID
	 * @returns {Array} Array of Writer objects
	 */
	static forSerialID(connection: Database, serialID: number): Promise<Array<Writer>> {
		var self = this;
		return new Promise(function (resolve, reject) {
			connection.all('SELECT writers.* FROM serials INNER JOIN serials_writers ON serials.id = serials_writers.serial_id INNER JOIN writers ON serials_writers.writer_id = writers.id WHERE serials.id = ?', [serialID], function (err, rows: Array<WriterRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(rows.map(function (x) { return Writer.fromRow(x).addHATEAOS(); }, rows));
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
	 * Returns all Serial objects for a given Writer ID
	 * @param {object} connection SQLite connection
	 * @param {number} writerID Writer database ID
	 * @returns {Array} Array of Serial objects
	 */
	static serials(connection: Database, writerID: number): Promise<Array<Serial>> {
		var self = this;
		return new Promise(function (resolve, reject) {
			connection.all('SELECT serials.* FROM serials INNER JOIN serials_writers ON serials.id = serials_writers.serial_id INNER JOIN writers ON serials_writers.writer_id = writers.id WHERE writers.id = ? ORDER BY serials.id', [writerID], function (err, rows: Array<SerialRow>, fields) {
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
	 * Returns a new Writer object populated from a basic JavaScript object (database result row)
	 * @param {object} row Object with fields to copy to a new Writer
	 * @returns {Writer}
	 * @static
	 */
	static fromRow(row: WriterRow): Writer {
		var writer = new Writer();
		row.id ? (writer.id = row.id) : undefined;
		row.name ? (writer.name = row.name) : undefined;
		return writer;
	}

	/**
	 * Returns the canonical REST API v1 endpoint for a Writer
	 * @param {number} id Database record ID
	 * @return {string} REST API v1 endpoint URL
	 * @static
	 */
	static restv1URL(id: number): string {
		return ("/v1/writers" + ((id !== undefined) ? ("/" + id) : ""));
	};

	/**
	 * Adds HATEAOS data to a Writer object
	 * @param {Writer|undefined} Object representing a Writer, uses current object (this) if undefined
	 * @returns {Writer}
	 */
	addHATEAOS(writer?: Writer): Writer {
		if (writer === undefined) {
			writer = this;
		}
		writer.links = [];
		writer.links.push({ rel: "self", href: Writer.restv1URL(writer.id) });
		return writer;
	}

}
