/**
 * @file Episode class
 * @author Dana Ross <dana@danaross.dev>
 */

import DBRecord from "./interfaces/dbrecord"
import HATEAOSLink from "./interfaces/hateaoslink"
import { Database } from 'sqlite3'
import memoize from "memoized-class-decorator"

export interface EpisodeRow extends DBRecord {
	id: number;
	links: Array<HATEAOSLink>;
	title: string;
	serial_id: number;
	episode_order: number;
	original_air_date: string;
	runtime: string;
	uk_viewers_mm: number;
	appreciation_index: number;
	missing: number;
	recreated: number;
}

/**
 * Creates a new Episode
 * @class
 */
export class Episode {
	id: number
	links: Array<HATEAOSLink>
	title: string
	serialID: number
	episodeOrder: number
	originalAirDate: string
	runtime: string
	ukViewersMM: number
	appreciationIndex: number
	missing: boolean
	recreated: boolean


	/**
	 * Returns a single Episode object for a given database ID
	 * @param {object} connection SQLite connection
	 * @param {number} id Episode database ID
	 * @returns {Episode}
	 */
	@memoize
	static forID(connection: Database, id: number): Promise<Episode> {
		return new Promise((resolve, reject) => {
			connection.all('SELECT * FROM episodes WHERE id = ?', [id], function (err, rows: Array<EpisodeRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(Episode.fromRow(rows[0]).addHATEAOS());
					} else {
						resolve();
					}
				} else {
					reject({
						error: {
							message: 'Error while performing Query.'
						}
					});
				}
			});
		});
	}

	/**
	 * Returns all Episode objects in the system
	 * @param {object} connection SQLite connection
	 * @returns {Array} Array of Episode objects
	 */
	@memoize
	static all(connection: Database): Promise<Array<Episode>> {
		return new Promise((resolve, reject) => {
			connection.all('SELECT * FROM episodes ORDER BY serial_id, episode_order', [], function (err, rows: Array<EpisodeRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(rows.map((x) => { return Episode.fromRow(x).addHATEAOS(); }, rows));
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
	 * Returns all Episode objects for a given serial ID
	 * @param {object} connection SQLite connection
	 * @param {number} serialID Serial database ID
	 * @returns {Array} Array of Episode objects
	 */
	@memoize
	static forSerialID(connection: Database, serialID: number): Promise<Array<Episode>> {
		return new Promise((resolve, reject) => {
			connection.all('SELECT episodes.* FROM episodes WHERE episodes.serial_id = ?', [serialID], function (err, rows: Array<EpisodeRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(rows.map((x) => { return Episode.fromRow(x).addHATEAOS(); }, rows));
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
	 * Returns all Episode objects with a given title
	 * @param {object} connection SQLite connection
	 * @param {string} title Episode title
	 * @returns {Array} Array of Episode objects
	 */
	@memoize
	static forTitle(connection: Database, title: string): Promise<Array<Episode>> {
		return new Promise((resolve, reject) => {
			connection.all('SELECT episodes.* FROM episodes WHERE episodes.title = ?', [title], function (err, rows: Array<EpisodeRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(rows.map((x) => { return Episode.fromRow(x).addHATEAOS(); }, rows));
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
	 * Returns all Episode objects that premiered on a given date
	 * @param {object} connection SQLite connection
	 * @param {string} originalAirDate Original air date
	 * @returns {Array} Array of Episode objects
	 */
	@memoize
	static forOriginalAirDate(connection: Database, originalAirDate: string): Promise<Array<Episode>> {
		return new Promise((resolve, reject) => {
			connection.all('SELECT episodes.* FROM episodes WHERE episodes.original_air_date = ?', [originalAirDate], function (err, rows: Array<EpisodeRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(rows.map((x) => { return Episode.fromRow(x).addHATEAOS(); }, rows));
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
	 * Returns all Episode objects with a given "missing" status
	 * @param {object} connection SQLite connection
	 * @param {boolean} missing "Missing" status
	 * @returns {Array} Array of Episode objects
	 */
	@memoize
	static forMissingStatus(connection: Database, missing: boolean): Promise<Array<Episode>> {
		return new Promise((resolve, reject) => {
			connection.all('SELECT episodes.* FROM episodes WHERE episodes.missing = ?', [(true && missing)], function (err, rows: Array<EpisodeRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(rows.map((x) => { return Episode.fromRow(x).addHATEAOS(); }, rows));
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
	 * Returns a new Epiosode object populated from a basic JavaScript object (database result row)
	 * @param {object} row Object with fields to copy to a new Episode
	 * @returns {Episode}
	 * @static
	 */
	static fromRow = function (row: EpisodeRow): Episode {
		const episode = new Episode();

		row.id ? (episode.id = row.id) : undefined;
		row.title ? (episode.title = row.title) : undefined;
		row.serial_id ? (episode.serialID = row.serial_id) : undefined;
		row.episode_order ? (episode.episodeOrder = row.episode_order) : undefined;
		row.original_air_date ? (episode.originalAirDate = row.original_air_date) : undefined;
		row.runtime ? (episode.runtime = row.runtime) : undefined;
		row.uk_viewers_mm ? (episode.ukViewersMM = row.uk_viewers_mm) : undefined;
		row.appreciation_index ? (episode.appreciationIndex = row.appreciation_index) : undefined;
		row.missing ? (episode.missing = (row.missing === 1)) : undefined;
		row.recreated ? (episode.recreated = (row.recreated === 1)) : undefined;

		return episode;
	}

	/**
	 * Returns the canonical REST API v1 endpoint for an Episode
	 * @param {number} id Database record ID
	 * @return {string} REST API v1 endpoint URL
	 * @static
	 */
	static restv1URL(id: number): string {
		return "/v1/episodes/" + id
	}

	/**
	 * Adds HATEAOS data to an Episode object
	 * @param {Episode} Object representing a Episode
	 * @returns {Episode}
	 * @static
	 */
	static addHATEAOSTo(episode: Episode): Episode {
		episode.links = [];
		episode.links.push({
			rel: "self",
			href: Episode.restv1URL(episode.id)
		});
		return episode;
	}

	/**
	 * Adds HATEAOS data to the current Episode instance
	 * @returns {Episode}
	 */
	addHATEAOS(): Episode {
		return Episode.addHATEAOSTo(this)
	}
}
