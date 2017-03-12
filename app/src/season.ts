/**
 * @file Season class
 * @author Dave Ross <dave@davidmichaelross.com>
 */

import {Serial, SerialRow} from "./serial"
import HATEAOSLink from "./interfaces/hateaoslink"
import DBRecord from "./interfaces/dbrecord"
import Named from "./interfaces/named"
import { Database } from "sqlite3"

export interface SeasonRow extends DBRecord, Named {

}

/**
 * Creates a new Season
 * @class
 */
export class Season {
	id: number
	name: string
	links: Array<HATEAOSLink>

	/**
	 * Returns a single Season object for a given database ID
	 * @param {object} connection SQLite connection
	 * @param {number} id Season database ID
	 * @returns {Season}
	 */
	static forID(connection: Database, id: number): Promise<Season> {
		var self = this;
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM seasons WHERE id = ?', [id], function (err, rows: Array<SeasonRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(Season.fromRow(rows[0]).addHATEAOS());
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
	 * Returns a single Season by the Season's name ("Season X", "Series X")
	 * @param {object} connection SQLite connection
	 * @param {string} name The Season's name
	 * @returns {Promise} Single Season record
	 */
	static forName(connection: Database, name: string): Promise<Season> {
		var self = this;
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM seasons WHERE name = ?', [name], function (err, rows: Array<SeasonRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(self.fromRow(rows[0]).addHATEAOS());
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
	 * Returns all Serial objects for a given Season ID
	 * @param {object} connection SQLite connection
	 * @param {number} seasonID Season database ID
	 * @returns {Array} Array of Serial objects
	 */
	static serials(connection: Database, seasonID: number): Promise<Array<Serial>> {
		var self = this;
		return new Promise(function (resolve, reject) {
			connection.all('SELECT serials.* FROM serials WHERE serials.season_id = ? ORDER BY serials.id', [seasonID], function (err, rows: Array<SerialRow>, fields) {
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
	 * Returns all Season objects in the system
	 * @param {object} connection SQLite connection
	 * @returns {Array} Array of Season objects
	 */
	static all(connection: Database): Promise<Array<Season>> {
		var self = this;
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM seasons ORDER BY id', [], function (err, rows: Array<SeasonRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(rows.map(function (x) { return Season.fromRow(x).addHATEAOS(); }));
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
	 * Returns a new Season object populated from a basic JavaScript object (database result row)
	 * @param {object} row Object with fields to copy to a new Season
	 * @returns {Season}
	 * @static
	 */
	static fromRow(row: SeasonRow): Season {
		var season = new Season();
		row.id ? (season.id = row.id) : undefined;
		row.name ? (season.name = row.name) : undefined;
		return season;
	}

	/**
	 * Returns the canonical REST API v1 endpoint for a Season
	 * @param {number} id Database record ID
	 * @return {string} REST API v1 endpoint URL
	 * @static
	 */
	static restv1URL(id: number): string {
		return ("/v1/seasons" + ((id !== undefined) ? ("/" + id) : ""));
	};

	/**
	 * Adds HATEAOS data to a Season object
	 * @param {Season|undefined} Object representing a Season, uses current object (this) if undefined
	 * @returns {Season}
	 */
	addHATEAOS(season?: Season): Season {
		if (season === undefined) {
			season = this;
		}
		season.links = [];
		season.links.push({ rel: "self", href: Season.restv1URL(season.id) });
		return season;
	}
}
