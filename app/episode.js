/**
 * @file Episode class
 * @author Dave Ross <dave@davidmichaelross.com>
 */

const memoize = require('memoizee');

var method = Episode.prototype;

/**
 * Creates a new Episode
 * @class
 */
function Episode() {
	var id, title, serialID, episodeOrder, originalAirDate, runtime,
		ukViewersMM, appreciationIndex, missing, recreated;
}

/**
 * Returns a single Serial object for a given database ID
 * @param {object} connection SQLite connection
 * @param {number} id Serial database ID
 * @returns {Serial}
 */
method.forID = memoize((connection, id) => {
	return new Promise((resolve, reject) => {
		connection.all('SELECT * FROM episodes WHERE id = ?', [id], function (err, rows, fields) {
			if (!err) {
				if (rows && rows.length) {
					resolve(Episode.prototype.fromRow(rows[0]).addHATEAOS());
				} else {
					resolve([]);
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
});

/**
 * Returns all Episode objects in the system
 * @param {object} connection SQLite connection
 * @returns {Array} Array of Episode objects
 */
method.all = memoize((connection) => {
    return new Promise((resolve, reject) => {
        connection.all('SELECT * FROM episodes ORDER BY serial_id, episode_order', [], function (err, rows, fields) {
            if (!err) {
                if (rows && rows.length) {
                    resolve(rows.map((x) => { return Episode.prototype.fromRow(x).addHATEAOS(); }, rows));
                }
                else {
                    resolve([]);
                }
            } else {
                reject({ error: { message: 'Error while performing Query.' } });
            }
        });
    });
});


/**
 * Returns all Episode objects for a given serial ID
 * @param {object} connection SQLite connection
 * @param {number} serialID Serial database ID
 * @returns {Array} Array of Episode objects
 */
method.forSerialID = memoize((connection, serialID) => {
    return new Promise((resolve, reject) => {
        connection.all('SELECT episodes.* FROM episodes WHERE episodes.serial_id = ?', [serialID], function (err, rows, fields) {
            if (!err) {
                if (rows && rows.length) {
                    resolve(rows.map((x) => { return Episode.prototype.fromRow(x).addHATEAOS(); }, rows));
                }
                else {
                    resolve([]);
                }
            } else {
                reject({ error: { message: 'Error while performing Query.' } });
            }
        });
    });

});

/**
 * Returns all Episode objects with a given title
 * @param {object} connection SQLite connection
 * @param {string} title Episode title
 * @returns {Array} Array of Episode objects
 */
method.forTitle = memoize((connection, title) => {
	return new Promise((resolve, reject) => {
        connection.all('SELECT episodes.* FROM episodes WHERE episodes.title = ?', [title], function (err, rows, fields) {
            if (!err) {
                if (rows && rows.length) {
                    resolve(rows.map((x) => { return Episode.prototype.fromRow(x).addHATEAOS(); }, rows));
                }
                else {
                    resolve([]);
                }
            } else {
                reject({ error: { message: 'Error while performing Query.' } });
            }
        });
    });
});

/**
 * Returns all Episode objects that premiered on a given date
 * @param {object} connection SQLite connection
 * @param {string} originalAirDate Original air date
 * @returns {Array} Array of Episode objects
 */
method.forOriginalAirDate = memoize((connection, originalAirDate) => {
	return new Promise((resolve, reject) => {
        connection.all('SELECT episodes.* FROM episodes WHERE episodes.original_air_date = ?', [originalAirDate], function (err, rows, fields) {
            if (!err) {
                if (rows && rows.length) {
                    resolve(rows.map((x) => { return Episode.prototype.fromRow(x).addHATEAOS(); }, rows));
                }
                else {
                    resolve([]);
                }
            } else {
                reject({ error: { message: 'Error while performing Query.' } });
            }
        });
    });
});

/**
 * Returns all Episode objects with a given "missing" status
 * @param {object} connection SQLite connection
 * @param {boolean} missing "Missing" status
 * @returns {Array} Array of Episode objects
 */
method.forMissingStatus = memoize((connection, missing) => {
	return new Promise((resolve, reject) => {
        connection.all('SELECT episodes.* FROM episodes WHERE episodes.missing = ?', [(true && missing)], function (err, rows, fields) {
            if (!err) {
                if (rows && rows.length) {
                    resolve(rows.map((x) => { return Episode.prototype.fromRow(x).addHATEAOS(); }, rows));
                }
                else {
                    resolve([]);
                }
            } else {
                reject({ error: { message: 'Error while performing Query.' } });
            }
        });
    });
});

/**
 * Returns a new Epiosode object populated from a basic JavaScript object (database result row)
 * @param {object} row Object with fields to copy to a new Episode
 * @returns {Episode}
 * @static
 */
method.fromRow = function (row) {
	var episode = new Episode();

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
method.restv1URL = memoize(function (id) {
	return ("/v1/episodes" + ((id !== undefined) ? ("/" + id) : ""));
});

/**
 * Adds HATEAOS data to an Episode object
 * @param {Episode|undefined} Object representing a Episode, uses current object (this) if undefined
 * @returns {Episode}
 */
method.addHATEAOS = function (episode) {
	if (episode === undefined) {
		episode = this;
	}
	episode.links = [];
	episode.links.push({
		rel: "self",
		href: this.restv1URL(episode.id)
	});
	return episode;
}

module.exports = method;
