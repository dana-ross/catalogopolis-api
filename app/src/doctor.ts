/**
 * @file Doctor class
 * @author Dave Ross <dave@davidmichaelross.com>
 */

import { Serial } from "./serial"
import { Actor } from "./actor"
import { ActorRow } from "./actor"
import DBRecord from "./interfaces/dbrecord"
import HATEAOSLink from "./interfaces/hateaoslink"
import { Database } from "sqlite3"
import memoize from "memoized-class-decorator"

export interface DoctorRow extends DBRecord {
	incarnation: string
	primary_actor: number
}

/**
 * Creates a new Doctor
 * @class
 */
export class Doctor implements DBRecord {
	id: number
	incarnation: string
	primaryActorID: number
	links: Array<HATEAOSLink>


	/**
	 * Returns a single Doctor object for a given database ID
	 * @param {object} connection SQLite connection
	 * @param {number} id Doctor database ID
	 * @returns {Promise} Single Doctor record
	 */
	@memoize
	static forID(connection: Database, id: number): Promise<Doctor> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM doctors WHERE id = ?', [id], function (err, rows: Array<DoctorRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(Doctor.fromRow(rows[0]).addHATEAOS());
					}
					else {
						resolve();
					}
				} else {
					reject({ error: { message: 'Error while performing Query.' } });
				}
			});
		});
	};

	/**
	 * Returns a single Doctor object for a given incarnation name
	 * @param {object} connection SQLite connection
	 * @param {string} incarnation Doctor incarnation name
	 * @returns {Promise} Single Doctor record
	 */
	@memoize
	static forIncarnation(connection: Database, incarnation: string) {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM doctors WHERE incarnation = ?', [incarnation], function (err, rows: Array<DoctorRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(Doctor.fromRow(rows[0]).addHATEAOS());
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
	 * Returns a single Doctor object for a given database ID
	 * @param {object} connection SQLite connection
	 * @param {number} primaryActorID Doctor database ID
	 * @returns {Promise} Single Doctor record
	 */
	@memoize
	static forPrimaryActorID(connection: Database, primaryActorID: number): Promise<Doctor> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM doctors WHERE primary_actor = ?', [primaryActorID], function (err, rows, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(Doctor.fromRow(rows[0]).addHATEAOS());
					}
					else {
						resolve();
					}
				} else {
					reject({ error: { message: 'Error while performing Query.' } });
				}
			});
		});
	};

	/**
	 * Returns all Actor objects for a given Doctor ID
	 * @param {object} connection SQLite connection
	 * @param {number} doctorID Doctor database ID
	 * @returns {Array} Array of Actor objects
	 */
	@memoize
	static actors(connection: Database, doctorID: number): Promise<Array<Actor>> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT actors.* FROM actors INNER JOIN doctors ON actors.id = doctors.primary_actor WHERE doctors.id = ? ORDER BY actors.id', [doctorID], function (err, rows: Array<ActorRow>, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(rows.map(function (x) { return Actor.fromRow(x).addHATEAOS(); }, rows));
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
	 * Returns all Doctor objects in the system
	 * @param {object} connection SQLite connection
	 * @returns {Promise} Array of Doctor objects
	 */
	@memoize
	static all(connection: Database): Promise<Array<Doctor>> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT * FROM doctors ORDER BY id', [], function (err, rows: Array<DoctorRow>, fields) {
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
	};

	/**
	 * Returns all Doctor objects for a given serial ID
	 * @param {object} connection SQLite connection
	 * @param {number} serialID Serial database ID
	 * @returns {Array} Array of Doctor objects
	 */
	@memoize
	static forSerialID(connection: Database, serialID: number): Promise<Array<Doctor>> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT doctors.* FROM serials INNER JOIN serials_doctors ON serials.id = serials_doctors.serial_id INNER JOIN doctors ON serials_doctors.doctor_id = doctors.id WHERE serials.id = ?', [serialID], function (err, rows, fields) {
				if (!err) {
					if (rows && rows.length) {
						resolve(rows.map((x) => { return Doctor.fromRow(x).addHATEAOS(); }, rows));
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
	 * Returns all Serial objects for a given Doctor ID
	 * @param {object} connection SQLite connection
	 * @param {number} doctorID Doctor database ID
	 * @returns {Array} Array of Serial objects
	 */
	@memoize
	static serials(connection: Database, doctorID: number): Promise<Array<Serial>> {
		return new Promise(function (resolve, reject) {
			connection.all('SELECT serials.* FROM serials INNER JOIN serials_doctors ON serials.id = serials_doctors.serial_id INNER JOIN doctors ON serials_doctors.doctor_id = doctors.id WHERE doctors.id = ? ORDER BY serials.id', [doctorID], function (err, rows, fields) {
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
	 * Returns a new Doctor object populated from a basic JavaScript object (database result row)
	 * @param {object} row Object with fields to copy to a new Doctor
	 * @returns {Doctor}
	 * @static
	 */
	static fromRow(row: DoctorRow): Doctor {
		var doctor = new Doctor();
		row.id ? (doctor.id = row.id) : undefined;
		row.incarnation ? (doctor.incarnation = row.incarnation) : undefined;
		row.primary_actor ? (doctor.primaryActorID = row.primary_actor) : undefined;
		return doctor;
	}

	/**
	 * Returns the canonical REST API v1 endpoint for a Doctor
	 * @param {number} id Database record ID
	 * @return {string} REST API v1 endpoint URL
	 * @static
	 */
	static restv1URL(id: number): string {
		return "/v1/doctors/" + id
	};

	/**
	 * Adds HATEAOS data to a Doctor object
	 * @param {Doctor} Object representing a Doctor
	 * @returns {Doctor}
	 * @static
	 */
	static addHATEAOSTo(doctor: Doctor): Doctor {
		doctor.links = [];
		doctor.links.push({ rel: "self", href: Doctor.restv1URL(doctor.id) });
		return doctor;
	}

	/**
	 * Adds HATEAOS data to the current Doctor instance
	 * @returns {Doctor}
	 */
	addHATEAOS(): Doctor {
		return Doctor.addHATEAOSTo(this)
	}
}
