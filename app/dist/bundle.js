/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file Serial class
 * @author Dave Ross <dave@davidmichaelross.com>
 */
/**
 * Creates a new Serial
 * @class
 */
var Serial = exports.Serial = function () {
    function Serial() {
        _classCallCheck(this, Serial);
    }

    _createClass(Serial, [{
        key: 'addHATEAOS',

        /**
         * Adds HATEAOS data to a Serial object
         * @param {Serial|undefined} Object representing a Serial, uses current object (this) if undefined
         * @returns {Serial}
         */
        value: function addHATEAOS(serial) {
            if (serial === undefined) {
                serial = this;
            }
            serial.links = [];
            serial.links.push({ rel: "self", href: Serial.restv1URL(serial.id) });
            return serial;
        }
    }], [{
        key: 'forID',

        /**
         * Returns a single Serial object for a given database ID
         * @param {object} connection SQLite connection
         * @param {number} id Serial database ID
         * @returns {Serial}
         */
        value: function forID(connection, id) {
            var self = this;
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM serials WHERE id = ?', [id], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(Serial.fromRow(rows[0]).addHATEAOS());
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'forTitle',

        /**
         * Returns a single Season by the Serial's title
         * @param {object} connection SQLite connection
         * @param {string} name The Serial's name
         * @returns {Promise} Single Serial record
         */
        value: function forTitle(connection, title) {
            var self = this;
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM serials WHERE title = ?', [title], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(Serial.fromRow(rows[0]).addHATEAOS());
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'all',

        /**
         * Returns all Serial objects in the system
         * @param {object} connection SQLite connection
         * @returns {Array} Array of Serial objects
         */
        value: function all(connection) {
            var self = this;
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM serials ORDER BY id', [], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(rows.map(function (x) {
                                return Serial.fromRow(x).addHATEAOS();
                            }, rows));
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'fromRow',

        /**
         * Returns a new Serial object populated from a basic JavaScript object (database result row)
         * @param {object} row Object with fields to copy to a new Serial
         * @returns {Serial}
         * @static
         */
        value: function fromRow(row) {
            var serial = new Serial();
            row.id ? serial.id = row.id : undefined;
            row.season_id ? serial.seasonID = row.season_id : undefined;
            row.story ? serial.story = row.story : undefined;
            row.serial ? serial.serial = row.serial : undefined;
            row.title ? serial.title = row.title : undefined;
            row.production_code ? serial.productionCode = row.production_code : undefined;
            return serial;
        }
        /**
         * Returns the canonical REST API v1 endpoint for a Serial
         * @param {number} id Database record ID
         * @return {string} REST API v1 endpoint URL
         * @static
         */

    }, {
        key: 'restv1URL',
        value: function restv1URL(id) {
            return "/v1/serials" + (id !== undefined ? "/" + id : "");
        }
    }]);

    return Serial;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file Actor class
 * @author Dave Ross <dave@davidmichaelross.com>
 */
/**
 * Creates a new Actor
 * @class
 */
var Actor = exports.Actor = function () {
    function Actor() {
        _classCallCheck(this, Actor);
    }

    _createClass(Actor, [{
        key: "addHATEAOS",

        /**
         * Adds HATEAOS data to a Actor object
         * @param {Actor|undefined} Object representing a Actor, uses current object (this) if undefined
         * @returns {Actor}
         */
        value: function addHATEAOS(actor) {
            if (actor === undefined) {
                actor = this;
            }
            actor.links = [];
            actor.links.push({ rel: "self", href: Actor.restv1URL(actor.id) });
            return actor;
        }
        /**
         * Returns a new Actor object populated from a basic JavaScript object (database result row)
         * @param {object} row Object with fields to copy to a new Actor
         * @returns {Actor}
         * @static
         */

    }], [{
        key: "restv1URL",

        /**
         * Returns the canonical REST API v1 endpoint for a Actor
         * @param {number} id Database record ID
         * @return {string} REST API v1 endpoint URL
         * @static
         */
        value: function restv1URL(id) {
            return "/v1/actors" + (id !== undefined ? "/" + id : "");
        }
    }, {
        key: "fromRow",
        value: function fromRow(row) {
            var actor = new Actor();
            row.id ? actor.id = row.id : undefined;
            row.name ? actor.name = row.name : undefined;
            return actor;
        }
        /**
         * Returns a single Actor object for a given database ID
         * @param {object} connection SQLite connection
         * @param {number} id Actor database ID
         * @returns {Actor}
         */

    }, {
        key: "forID",
        value: function forID(connection, id) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM actors WHERE id = ?', [id], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(Actor.fromRow(rows[0]).addHATEAOS());
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: "all",

        /**
         * Returns all Actor objects in the system
         * @param {Database} connection SQLite connection
         * @returns {Array} Array of Actor objects
         */
        value: function all(connection) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM actors ORDER BY id', [], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(rows.map(function (x) {
                                return Actor.fromRow(x).addHATEAOS();
                            }));
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: "forName",

        /**
         * Returns a single Actor by the Actor's name
         * @param {object} connection SQLite connection
         * @param {string} name The Actor's name
         * @returns {Promise} Single Actor record
         */
        value: function forName(connection, name) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM actors WHERE name = ?', [name], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(Actor.fromRow(rows[0]).addHATEAOS());
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }]);

    return Actor;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Director = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @file Director class
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Dave Ross <dave@davidmichaelross.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _serial = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a new Director
 * @class
 */
var Director = exports.Director = function () {
    function Director() {
        _classCallCheck(this, Director);
    }

    _createClass(Director, [{
        key: 'addHATEAOS',

        /**
         * Adds HATEAOS data to a Director object
         * @param {Director|undefined} Object representing a Director, uses current object (this) if undefined
         * @returns {Director}
         */
        value: function addHATEAOS(director) {
            if (director === undefined) {
                director = this;
            }
            director.links = [];
            director.links.push({ rel: "self", href: Director.restv1URL(director.id) });
            return director;
        }
    }], [{
        key: 'forID',

        /**
         * Returns a single Director object for a given database ID
         * @param {object} connection SQLite connection
         * @param {number} id Director database ID
         * @returns {Promise}
         */
        value: function forID(connection, id) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM directors WHERE id = ?', [id], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(Director.fromRow(rows[0]).addHATEAOS());
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'all',

        /**
         * Returns all Director objects in the system
         * @param {object} connection SQLite connection
         * @returns {Array} Array of Director objects
         */
        value: function all(connection) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM directors ORDER BY id', [], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(rows.map(function (x) {
                                return Director.fromRow(x).addHATEAOS();
                            }));
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'forName',

        /**
         * Returns a single Director by the Director's name
         * @param {object} connection SQLite connection
         * @param {string} name The Director's name
         * @returns {Promise} Single Director record
         */
        value: function forName(connection, name) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM directors WHERE name = ?', [name], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(Director.fromRow(rows[0]).addHATEAOS());
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'forSerialID',

        /**
         * Returns all Director objects for a given serial ID
         * @param {object} connection SQLite connection
         * @param {number} serialID Serial database ID
         * @returns {Array} Array of Director objects
         */
        value: function forSerialID(connection, serialID) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT directors.* FROM serials INNER JOIN serials_directors ON serials.id = serials_directors.serial_id INNER JOIN directors ON serials_directors.director_id = directors.id WHERE serials.id = ?', [serialID], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(rows.map(function (x) {
                                return Director.fromRow(x).addHATEAOS();
                            }, rows));
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'serials',

        /**
         * Returns all Serial objects for a given Director ID
         * @param {object} connection SQLite connection
         * @param {number} directorID Director database ID
         * @returns {Array} Array of Serial objects
         */
        value: function serials(connection, directorID) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT serials.* FROM serials INNER JOIN serials_directors ON serials.id = serials_directors.serial_id INNER JOIN directors ON serials_directors.director_id = directors.id WHERE directors.id = ? ORDER BY serials.id', [directorID], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(rows.map(function (x) {
                                return _serial.Serial.fromRow(x).addHATEAOS();
                            }, rows));
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'fromRow',

        /**
         * Returns a new Director object populated from a basic JavaScript object (database result row)
         * @param {object} row Object with fields to copy to a new Director
         * @returns {Director}
         * @static
         */
        value: function fromRow(row) {
            var director = new Director();
            row.id ? director.id = row.id : undefined;
            row.name ? director.name = row.name : undefined;
            return director;
        }
        /**
         * Returns the canonical REST API v1 endpoint for a Director
         * @param {number} id Database record ID
         * @return {string} REST API v1 endpoint URL
         * @static
         */

    }, {
        key: 'restv1URL',
        value: function restv1URL(id) {
            return "/v1/directors" + (id !== undefined ? "/" + id : "");
        }
    }]);

    return Director;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Doctor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @file Doctor class
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Dave Ross <dave@davidmichaelross.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _serial = __webpack_require__(0);

var _actor = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a new Doctor
 * @class
 */
var Doctor = exports.Doctor = function () {
    function Doctor() {
        _classCallCheck(this, Doctor);
    }

    _createClass(Doctor, [{
        key: "addHATEAOS",

        /**
         * Adds HATEAOS data to a Doctor object
         * @param {Doctor|undefined} Object representing a Doctor, uses current object (this) if undefined
         * @returns {Doctor}
         */
        value: function addHATEAOS(doctor) {
            if (doctor === undefined) {
                doctor = this;
            }
            doctor.links = [];
            doctor.links.push({ rel: "self", href: Doctor.restv1URL(doctor.id) });
            return doctor;
        }
    }], [{
        key: "forID",

        /**
         * Returns a single Doctor object for a given database ID
         * @param {object} connection SQLite connection
         * @param {number} id Doctor database ID
         * @returns {Promise} Single Doctor record
         */
        value: function forID(connection, id) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM doctors WHERE id = ?', [id], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(Doctor.fromRow(rows[0]).addHATEAOS());
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: "forIncarnation",

        /**
         * Returns a single Doctor object for a given incarnation name
         * @param {object} connection SQLite connection
         * @param {string} incarnation Doctor incarnation name
         * @returns {Promise} Single Doctor record
         */
        value: function forIncarnation(connection, incarnation) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM doctors WHERE incarnation = ?', [incarnation], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(Doctor.fromRow(rows[0]).addHATEAOS());
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: "forPrimaryActorID",

        /**
         * Returns a single Doctor object for a given database ID
         * @param {object} connection SQLite connection
         * @param {number} primaryActorID Doctor database ID
         * @returns {Promise} Single Doctor record
         */
        value: function forPrimaryActorID(connection, primaryActorID) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM doctors WHERE primary_actor = ?', [primaryActorID], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(Doctor.fromRow(rows[0]).addHATEAOS());
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: "actors",

        /**
         * Returns all Actor objects for a given Doctor ID
         * @param {object} connection SQLite connection
         * @param {number} doctorID Doctor database ID
         * @returns {Array} Array of Actor objects
         */
        value: function actors(connection, doctorID) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT actors.* FROM actors INNER JOIN doctors ON actors.id = doctors.primary_actor WHERE doctors.id = ? ORDER BY actors.id', [doctorID], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(rows.map(function (x) {
                                return _actor.Actor.fromRow(x).addHATEAOS();
                            }, rows));
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: "all",

        /**
         * Returns all Doctor objects in the system
         * @param {object} connection SQLite connection
         * @returns {Promise} Array of Doctor objects
         */
        value: function all(connection) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM doctors ORDER BY id', [], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(rows.map(function (x) {
                                return Doctor.fromRow(x).addHATEAOS();
                            }, rows));
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: "forSerialID",

        /**
         * Returns all Doctor objects for a given serial ID
         * @param {object} connection SQLite connection
         * @param {number} serialID Serial database ID
         * @returns {Array} Array of Doctor objects
         */
        value: function forSerialID(connection, serialID) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT doctors.* FROM serials INNER JOIN serials_doctors ON serials.id = serials_doctors.serial_id INNER JOIN doctors ON serials_doctors.doctor_id = doctors.id WHERE serials.id = ?', [serialID], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(rows.map(function (x) {
                                return Doctor.fromRow(x).addHATEAOS();
                            }, rows));
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: "serials",

        /**
         * Returns all Serial objects for a given Doctor ID
         * @param {object} connection SQLite connection
         * @param {number} doctorID Doctor database ID
         * @returns {Array} Array of Serial objects
         */
        value: function serials(connection, doctorID) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT serials.* FROM serials INNER JOIN serials_doctors ON serials.id = serials_doctors.serial_id INNER JOIN doctors ON serials_doctors.doctor_id = doctors.id WHERE doctors.id = ? ORDER BY serials.id', [doctorID], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(rows.map(function (x) {
                                return _serial.Serial.fromRow(x).addHATEAOS();
                            }, rows));
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: "fromRow",

        /**
         * Returns a new Doctor object populated from a basic JavaScript object (database result row)
         * @param {object} row Object with fields to copy to a new Doctor
         * @returns {Doctor}
         * @static
         */
        value: function fromRow(row) {
            var doctor = new Doctor();
            row.id ? doctor.id = row.id : undefined;
            row.incarnation ? doctor.incarnation = row.incarnation : undefined;
            row.primary_actor ? doctor.primaryActorID = row.primary_actor : undefined;
            return doctor;
        }
        /**
         * Returns the canonical REST API v1 endpoint for a Doctor
         * @param {number} id Database record ID
         * @return {string} REST API v1 endpoint URL
         * @static
         */

    }, {
        key: "restv1URL",
        value: function restv1URL(id) {
            return "/v1/doctors" + (id !== undefined ? "/" + id : "");
        }
    }]);

    return Doctor;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file Episode class
 * @author Dave Ross <dave@davidmichaelross.com>
 */
/**
 * Creates a new Episode
 * @class
 */
var Episode = exports.Episode = function () {
    function Episode() {
        _classCallCheck(this, Episode);
    }

    _createClass(Episode, [{
        key: 'addHATEAOS',

        /**
         * Adds HATEAOS data to an Episode object
         * @param {Episode|undefined} Object representing a Episode, uses current object (this) if undefined
         * @returns {Episode}
         */
        value: function addHATEAOS(episode) {
            if (episode === undefined) {
                episode = this;
            }
            episode.links = [];
            episode.links.push({
                rel: "self",
                href: Episode.restv1URL(episode.id)
            });
            return episode;
        }
    }], [{
        key: 'forID',

        /**
         * Returns a single Episode object for a given database ID
         * @param {object} connection SQLite connection
         * @param {number} id Episode database ID
         * @returns {Episode}
         */
        value: function forID(connection, id) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM episodes WHERE id = ?', [id], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(Episode.fromRow(rows[0]).addHATEAOS());
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
        }
    }, {
        key: 'all',

        /**
         * Returns all Episode objects in the system
         * @param {object} connection SQLite connection
         * @returns {Array} Array of Episode objects
         */
        value: function all(connection) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM episodes ORDER BY serial_id, episode_order', [], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(rows.map(function (x) {
                                return Episode.fromRow(x).addHATEAOS();
                            }, rows));
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'forSerialID',

        /**
         * Returns all Episode objects for a given serial ID
         * @param {object} connection SQLite connection
         * @param {number} serialID Serial database ID
         * @returns {Array} Array of Episode objects
         */
        value: function forSerialID(connection, serialID) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT episodes.* FROM episodes WHERE episodes.serial_id = ?', [serialID], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(rows.map(function (x) {
                                return Episode.fromRow(x).addHATEAOS();
                            }, rows));
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'forTitle',

        /**
         * Returns all Episode objects with a given title
         * @param {object} connection SQLite connection
         * @param {string} title Episode title
         * @returns {Array} Array of Episode objects
         */
        value: function forTitle(connection, title) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT episodes.* FROM episodes WHERE episodes.title = ?', [title], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(rows.map(function (x) {
                                return Episode.fromRow(x).addHATEAOS();
                            }, rows));
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'forOriginalAirDate',

        /**
         * Returns all Episode objects that premiered on a given date
         * @param {object} connection SQLite connection
         * @param {string} originalAirDate Original air date
         * @returns {Array} Array of Episode objects
         */
        value: function forOriginalAirDate(connection, originalAirDate) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT episodes.* FROM episodes WHERE episodes.original_air_date = ?', [originalAirDate], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(rows.map(function (x) {
                                return Episode.fromRow(x).addHATEAOS();
                            }, rows));
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'forMissingStatus',

        /**
         * Returns all Episode objects with a given "missing" status
         * @param {object} connection SQLite connection
         * @param {boolean} missing "Missing" status
         * @returns {Array} Array of Episode objects
         */
        value: function forMissingStatus(connection, missing) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT episodes.* FROM episodes WHERE episodes.missing = ?', [true && missing], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(rows.map(function (x) {
                                return Episode.fromRow(x).addHATEAOS();
                            }, rows));
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'restv1URL',

        /**
         * Returns the canonical REST API v1 endpoint for an Episode
         * @param {number} id Database record ID
         * @return {string} REST API v1 endpoint URL
         * @static
         */
        value: function restv1URL(id) {
            return "/v1/episodes" + (id !== undefined ? "/" + id : "");
        }
    }]);

    return Episode;
}();
/**
 * Returns a new Epiosode object populated from a basic JavaScript object (database result row)
 * @param {object} row Object with fields to copy to a new Episode
 * @returns {Episode}
 * @static
 */


Episode.fromRow = function (row) {
    var episode = new Episode();
    row.id ? episode.id = row.id : undefined;
    row.title ? episode.title = row.title : undefined;
    row.serial_id ? episode.serialID = row.serial_id : undefined;
    row.episode_order ? episode.episodeOrder = row.episode_order : undefined;
    row.original_air_date ? episode.originalAirDate = row.original_air_date : undefined;
    row.runtime ? episode.runtime = row.runtime : undefined;
    row.uk_viewers_mm ? episode.ukViewersMM = row.uk_viewers_mm : undefined;
    row.appreciation_index ? episode.appreciationIndex = row.appreciation_index : undefined;
    row.missing ? episode.missing = row.missing === 1 : undefined;
    row.recreated ? episode.recreated = row.recreated === 1 : undefined;
    return episode;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Season = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @file Season class
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Dave Ross <dave@davidmichaelross.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _serial = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a new Season
 * @class
 */
var Season = exports.Season = function () {
    function Season() {
        _classCallCheck(this, Season);
    }

    _createClass(Season, [{
        key: 'addHATEAOS',

        /**
         * Adds HATEAOS data to a Season object
         * @param {Season|undefined} Object representing a Season, uses current object (this) if undefined
         * @returns {Season}
         */
        value: function addHATEAOS(season) {
            if (season === undefined) {
                season = this;
            }
            season.links = [];
            season.links.push({ rel: "self", href: Season.restv1URL(season.id) });
            return season;
        }
    }], [{
        key: 'forID',

        /**
         * Returns a single Season object for a given database ID
         * @param {object} connection SQLite connection
         * @param {number} id Season database ID
         * @returns {Season}
         */
        value: function forID(connection, id) {
            var self = this;
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM seasons WHERE id = ?', [id], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(Season.fromRow(rows[0]).addHATEAOS());
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'forName',

        /**
         * Returns a single Season by the Season's name ("Season X", "Series X")
         * @param {object} connection SQLite connection
         * @param {string} name The Season's name
         * @returns {Promise} Single Season record
         */
        value: function forName(connection, name) {
            var self = this;
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM seasons WHERE name = ?', [name], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(self.fromRow(rows[0]).addHATEAOS());
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'serials',

        /**
         * Returns all Serial objects for a given Season ID
         * @param {object} connection SQLite connection
         * @param {number} seasonID Season database ID
         * @returns {Array} Array of Serial objects
         */
        value: function serials(connection, seasonID) {
            var self = this;
            return new Promise(function (resolve, reject) {
                connection.all('SELECT serials.* FROM serials WHERE serials.season_id = ? ORDER BY serials.id', [seasonID], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(rows.map(function (x) {
                                return _serial.Serial.fromRow(x).addHATEAOS();
                            }, rows));
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'all',

        /**
         * Returns all Season objects in the system
         * @param {object} connection SQLite connection
         * @returns {Array} Array of Season objects
         */
        value: function all(connection) {
            var self = this;
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM seasons ORDER BY id', [], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(rows.map(function (x) {
                                return Season.fromRow(x).addHATEAOS();
                            }));
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'fromRow',

        /**
         * Returns a new Season object populated from a basic JavaScript object (database result row)
         * @param {object} row Object with fields to copy to a new Season
         * @returns {Season}
         * @static
         */
        value: function fromRow(row) {
            var season = new Season();
            row.id ? season.id = row.id : undefined;
            row.name ? season.name = row.name : undefined;
            return season;
        }
        /**
         * Returns the canonical REST API v1 endpoint for a Season
         * @param {number} id Database record ID
         * @return {string} REST API v1 endpoint URL
         * @static
         */

    }, {
        key: 'restv1URL',
        value: function restv1URL(id) {
            return "/v1/seasons" + (id !== undefined ? "/" + id : "");
        }
    }]);

    return Season;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Writer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @file Writer class
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Dave Ross <dave@davidmichaelross.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _serial = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a new Writer
 * @class
 */
var Writer = exports.Writer = function () {
    function Writer() {
        _classCallCheck(this, Writer);
    }

    _createClass(Writer, [{
        key: 'addHATEAOS',

        /**
         * Adds HATEAOS data to a Writer object
         * @param {Writer|undefined} Object representing a Writer, uses current object (this) if undefined
         * @returns {Writer}
         */
        value: function addHATEAOS(writer) {
            if (writer === undefined) {
                writer = this;
            }
            writer.links = [];
            writer.links.push({ rel: "self", href: Writer.restv1URL(writer.id) });
            return writer;
        }
    }], [{
        key: 'forID',

        /**
        * Returns a single Writer object for a given database ID
        * @param {object} connection SQLite connection
        * @param {number} id Writer database ID
        * @returns {Writer}
        */
        value: function forID(connection, id) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM writers WHERE id = ?', [id], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(Writer.fromRow(rows[0]).addHATEAOS());
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'all',

        /**
         * Returns all Writer objects in the system
         * @param {object} connection SQLite connection
         * @returns {Array} Array of Writer objects
         */
        value: function all(connection) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM writers ORDER BY id', [], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(rows.map(function (x) {
                                return Writer.fromRow(x).addHATEAOS();
                            }, rows));
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'forName',

        /**
         * Returns a single Writer by the Writers's name
         * @param {object} connection SQLite connection
         * @param {string} name The Writer's name
         * @returns {Promise} Single Writer record
         */
        value: function forName(connection, name) {
            return new Promise(function (resolve, reject) {
                connection.all('SELECT * FROM writers WHERE name = ?', [name], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(Writer.fromRow(rows[0]).addHATEAOS());
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'forSerialID',

        /**
         * Returns all Writer objects for a given Serial ID
         * @param {object} connection SQLite connection
         * @param {number} serialID Serial database ID
         * @returns {Array} Array of Writer objects
         */
        value: function forSerialID(connection, serialID) {
            var self = this;
            return new Promise(function (resolve, reject) {
                connection.all('SELECT writers.* FROM serials INNER JOIN serials_writers ON serials.id = serials_writers.serial_id INNER JOIN writers ON serials_writers.writer_id = writers.id WHERE serials.id = ?', [serialID], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(rows.map(function (x) {
                                return Writer.fromRow(x).addHATEAOS();
                            }, rows));
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'serials',

        /**
         * Returns all Serial objects for a given Writer ID
         * @param {object} connection SQLite connection
         * @param {number} writerID Writer database ID
         * @returns {Array} Array of Serial objects
         */
        value: function serials(connection, writerID) {
            var self = this;
            return new Promise(function (resolve, reject) {
                connection.all('SELECT serials.* FROM serials INNER JOIN serials_writers ON serials.id = serials_writers.serial_id INNER JOIN writers ON serials_writers.writer_id = writers.id WHERE writers.id = ? ORDER BY serials.id', [writerID], function (err, rows, fields) {
                    if (!err) {
                        if (rows && rows.length) {
                            resolve(rows.map(function (x) {
                                return _serial.Serial.fromRow(x).addHATEAOS();
                            }, rows));
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject({ error: { message: 'Error while performing Query.' } });
                    }
                });
            });
        }
    }, {
        key: 'fromRow',

        /**
         * Returns a new Writer object populated from a basic JavaScript object (database result row)
         * @param {object} row Object with fields to copy to a new Writer
         * @returns {Writer}
         * @static
         */
        value: function fromRow(row) {
            var writer = new Writer();
            row.id ? writer.id = row.id : undefined;
            row.name ? writer.name = row.name : undefined;
            return writer;
        }
        /**
         * Returns the canonical REST API v1 endpoint for a Writer
         * @param {number} id Database record ID
         * @return {string} REST API v1 endpoint URL
         * @static
         */

    }, {
        key: 'restv1URL',
        value: function restv1URL(id) {
            return "/v1/writers" + (id !== undefined ? "/" + id : "");
        }
    }]);

    return Writer;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function () {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function () {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (server, connection) {
    var actorType = new _graphql.GraphQLObjectType({
        name: 'Actor',
        description: 'An actor',
        fields: function fields() {
            return {
                id: {
                    type: _graphql.GraphQLID,
                    description: 'Actor ID'
                },
                name: {
                    type: _graphql.GraphQLString,
                    description: 'Actor name'
                }
            };
        }
    });
    var doctorType = new _graphql.GraphQLObjectType({
        name: 'Doctor',
        description: 'A single incarnation of The Doctor',
        fields: function fields() {
            return {
                id: {
                    type: _graphql.GraphQLID,
                    description: 'Doctor ID'
                },
                incarnation: {
                    type: _graphql.GraphQLString,
                    description: 'Name of this incarnation of The Doctor'
                },
                primaryActor: {
                    type: actorType,
                    description: 'The actor who usually portrayed this incarnation of The Doctor',
                    resolve: function resolve(parent) {
                        return new Promise(function (resolve, reject) {
                            _actor.Actor.forID(connection, parent.primaryActorID).then(function (value) {
                                return resolve(value);
                            }, function (reason) {
                                return reject(reason);
                            });
                        });
                    }
                },
                serials: {
                    type: new _graphql.GraphQLList(serialType),
                    description: 'Serials',
                    resolve: function resolve(parent) {
                        return new Promise(function (resolve, reject) {
                            _doctor.Doctor.serials(connection, parent.id).then(function (value) {
                                return resolve(value);
                            }, function (reason) {
                                return reject(reason);
                            });
                        });
                    }
                }
            };
        }
    });
    var directorType = new _graphql.GraphQLObjectType({
        name: 'Director',
        description: 'The director of an episode',
        fields: function fields() {
            return {
                id: {
                    type: _graphql.GraphQLID,
                    description: 'Director ID'
                },
                name: {
                    type: _graphql.GraphQLString,
                    description: 'Director name'
                },
                serials: {
                    type: new _graphql.GraphQLList(serialType),
                    description: 'Serials',
                    resolve: function resolve(parent) {
                        return new Promise(function (resolve, reject) {
                            _director.Director.serials(connection, parent.id).then(function (value) {
                                return resolve(value);
                            }, function (reason) {
                                return reject(reason);
                            });
                        });
                    }
                }
            };
        }
    });
    var writerType = new _graphql.GraphQLObjectType({
        name: 'Writer',
        description: 'The writer of an episode',
        fields: function fields() {
            return {
                id: {
                    type: _graphql.GraphQLID,
                    description: 'Writer ID'
                },
                name: {
                    type: _graphql.GraphQLString,
                    description: 'Writer name'
                },
                serials: {
                    type: new _graphql.GraphQLList(serialType),
                    description: 'Serials',
                    resolve: function resolve(parent) {
                        return new Promise(function (resolve, reject) {
                            _writer.Writer.serials(connection, parent.id).then(function (value) {
                                return resolve(value);
                            }, function (reason) {
                                return reject(reason);
                            });
                        });
                    }
                }
            };
        }
    });
    var episodeType = new _graphql.GraphQLObjectType({
        name: 'Episode',
        description: 'An episode of a Serial, or a single episode of the show',
        fields: function fields() {
            return {
                id: {
                    type: _graphql.GraphQLID,
                    description: 'Episode ID'
                },
                title: {
                    type: _graphql.GraphQLString,
                    description: 'Episode title'
                },
                serial: {
                    type: serialType,
                    description: 'Serial this Episode appears in',
                    resolve: function resolve(parent) {
                        return new Promise(function (resolve, reject) {
                            _serial.Serial.forID(connection, parent.serialID).then(function (value) {
                                return resolve(value);
                            }, function (reason) {
                                return reject(reason);
                            });
                        });
                    }
                },
                episodeOrder: {
                    type: _graphql.GraphQLInt,
                    description: 'Episode order within a serial'
                },
                originalAirDate: {
                    type: _graphql.GraphQLString,
                    description: 'Original air date (yyyy-mm-dd)'
                },
                runtime: {
                    type: _graphql.GraphQLString,
                    description: 'Original running time (hh:mm)'
                },
                ukViewersMM: {
                    type: _graphql.GraphQLFloat,
                    description: 'UK viewers (millions) of the first showing'
                },
                appreciationIndex: {
                    type: _graphql.GraphQLInt,
                    description: 'Appreciation Index of the first showing'
                },
                missing: {
                    type: _graphql.GraphQLBoolean,
                    description: 'Whether the episode is currently missing'
                },
                recreated: {
                    type: _graphql.GraphQLBoolean,
                    description: 'Whether a missing episode has been officially re-created (such as the animated re-creations)'
                }
            };
        }
    });
    var seasonType = new _graphql.GraphQLObjectType({
        name: 'Season',
        description: 'A season of the show',
        fields: function fields() {
            return {
                id: {
                    type: _graphql.GraphQLID,
                    description: 'Season ID'
                },
                name: {
                    type: _graphql.GraphQLString,
                    description: 'Season name'
                },
                serials: {
                    type: new _graphql.GraphQLList(serialType),
                    description: 'Serials',
                    resolve: function resolve(parent) {
                        return new Promise(function (resolve, reject) {
                            _season.Season.serials(connection, parent.id).then(function (value) {
                                return resolve(value);
                            }, function (reason) {
                                return reject(reason);
                            });
                        });
                    }
                }
            };
        }
    });
    var serialType = new _graphql.GraphQLObjectType({
        name: 'Serial',
        description: 'A serial or single episode',
        fields: function fields() {
            return {
                id: {
                    type: _graphql.GraphQLID,
                    description: 'Serial ID'
                },
                season: {
                    type: seasonType,
                    description: 'Season',
                    resolve: function resolve(parent) {
                        return new Promise(function (resolve, reject) {
                            _season.Season.forID(connection, parent.seasonID).then(function (value) {
                                return resolve(value);
                            }, function (reason) {
                                return reject(reason);
                            });
                        });
                    }
                },
                story: {
                    type: _graphql.GraphQLInt,
                    description: 'Story number'
                },
                serial: {
                    type: _graphql.GraphQLInt,
                    description: 'Serial episode number'
                },
                title: {
                    type: _graphql.GraphQLString,
                    description: 'Serial title'
                },
                productionCode: {
                    type: _graphql.GraphQLString,
                    description: 'Serial production code'
                },
                doctors: {
                    type: new _graphql.GraphQLList(doctorType),
                    description: 'Doctor(s) who appeared in this episode',
                    resolve: function resolve(parent) {
                        return new Promise(function (resolve, reject) {
                            _doctor.Doctor.forSerialID(connection, parent.id).then(function (value) {
                                return resolve(value);
                            }, function (reason) {
                                return reject(reason);
                            });
                        });
                    }
                },
                directors: {
                    type: new _graphql.GraphQLList(directorType),
                    description: 'Directors of this serial',
                    resolve: function resolve(parent) {
                        return new Promise(function (resolve, reject) {
                            _director.Director.forSerialID(connection, parent.id).then(function (value) {
                                return resolve(value);
                            }, function (reason) {
                                return reject(reason);
                            });
                        });
                    }
                },
                writers: {
                    type: new _graphql.GraphQLList(writerType),
                    description: 'Writers of this serial',
                    resolve: function resolve(parent) {
                        return new Promise(function (resolve, reject) {
                            _writer.Writer.forSerialID(connection, parent.id).then(function (value) {
                                return resolve(value);
                            }, function (reason) {
                                return reject(reason);
                            });
                        });
                    }
                },
                episodes: {
                    type: new _graphql.GraphQLList(episodeType),
                    description: 'Episodes in this serial',
                    resolve: function resolve(parent) {
                        return new Promise(function (resolve, reject) {
                            _episode.Episode.forSerialID(connection, parent.id).then(function (value) {
                                return resolve(value);
                            }, function (reason) {
                                return reject(reason);
                            });
                        });
                    }
                }
            };
        }
    });
    var schema = new _graphql.GraphQLSchema({
        query: new _graphql.GraphQLObjectType({
            name: 'RootQueryType',
            fields: {
                doctor: {
                    type: doctorType,
                    args: {
                        id: {
                            description: 'Doctor ID',
                            type: _graphql.GraphQLID
                        },
                        incarnation: {
                            description: 'Name of this incarnation of The Doctor',
                            type: _graphql.GraphQLString
                        },
                        primaryActorID: {
                            description: 'The actor who usually portrayed this incarnation of The Doctor',
                            type: _graphql.GraphQLID
                        }
                    },
                    resolve: function resolve(root, _ref) {
                        var id = _ref.id,
                            incarnation = _ref.incarnation,
                            primaryActorID = _ref.primaryActorID;

                        return uniquePromiseResults(id ? _doctor.Doctor.forID(connection, id) : null, incarnation ? _doctor.Doctor.forIncarnation(connection, incarnation) : null, primaryActorID ? _doctor.Doctor.forPrimaryActorID(connection, primaryActorID) : null);
                    }
                },
                director: {
                    type: directorType,
                    args: {
                        id: {
                            description: 'Director ID',
                            type: _graphql.GraphQLID
                        },
                        name: {
                            description: 'Director name',
                            type: _graphql.GraphQLString
                        }
                    },
                    resolve: function resolve(root, _ref2) {
                        var id = _ref2.id,
                            name = _ref2.name;

                        return uniquePromiseResults(id ? _director.Director.forID(connection, id) : null, name ? _director.Director.forName(connection, name) : null);
                    }
                },
                writer: {
                    type: writerType,
                    args: {
                        id: {
                            description: 'Writer ID',
                            type: _graphql.GraphQLID
                        },
                        name: {
                            description: 'Writer name',
                            type: _graphql.GraphQLString
                        }
                    },
                    resolve: function resolve(root, _ref3) {
                        var id = _ref3.id,
                            name = _ref3.name;

                        return uniquePromiseResults(id ? _writer.Writer.forID(connection, id) : null, name ? _writer.Writer.forName(connection, name) : null);
                    }
                },
                season: {
                    type: seasonType,
                    args: {
                        id: {
                            description: 'Season ID',
                            type: _graphql.GraphQLID
                        },
                        name: {
                            description: 'Season name',
                            type: _graphql.GraphQLString
                        }
                    },
                    resolve: function resolve(root, _ref4) {
                        var id = _ref4.id,
                            name = _ref4.name;

                        return uniquePromiseResults(id ? _season.Season.forID(connection, id) : null, name ? _season.Season.forName(connection, name) : null);
                    }
                },
                episode: {
                    type: episodeType,
                    args: {
                        id: {
                            description: 'Episode ID',
                            type: _graphql.GraphQLID
                        },
                        title: {
                            description: 'Episode Title',
                            type: _graphql.GraphQLString
                        },
                        originalAirDate: {
                            description: 'Original air date (yyyy-mm-dd)',
                            type: _graphql.GraphQLString
                        },
                        missing: {
                            description: 'If the episode is currently missing',
                            type: _graphql.GraphQLBoolean
                        }
                    },
                    resolve: function resolve(root, _ref5) {
                        var id = _ref5.id,
                            title = _ref5.title,
                            originalAirDate = _ref5.originalAirDate,
                            missing = _ref5.missing;

                        return uniquePromiseResults(id ? _episode.Episode.forID(connection, id) : null, title ? _episode.Episode.forTitle(connection, title) : null, originalAirDate ? _episode.Episode.forOriginalAirDate(connection, originalAirDate) : null, missing ? _episode.Episode.forMissingStatus(connection, missing) : null);
                    }
                },
                serial: {
                    type: serialType,
                    args: {
                        id: {
                            description: 'Serial ID',
                            type: _graphql.GraphQLID
                        },
                        title: {
                            description: 'Serial title',
                            type: _graphql.GraphQLString
                        }
                    },
                    resolve: function resolve(root, _ref6) {
                        var id = _ref6.id,
                            title = _ref6.title;

                        return uniquePromiseResults(id ? _serial.Serial.forID(connection, id) : null, title ? _serial.Serial.forTitle(connection, title) : null);
                    }
                }
            }
        })
    });
    server.use('/graphql', (0, _expressGraphql2.default)({
        schema: schema,
        graphiql: true
    }));
};

var _graphql = __webpack_require__(13);

var _expressGraphql = __webpack_require__(12);

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _doctor = __webpack_require__(3);

var _director = __webpack_require__(2);

var _writer = __webpack_require__(6);

var _season = __webpack_require__(5);

var _serial = __webpack_require__(0);

var _actor = __webpack_require__(1);

var _episode = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectIDsEqual = function objectIDsEqual(x, y) {
    return x.id !== undefined && y.id !== undefined && x.id === y.id;
},
    arrayAllSame = function arrayAllSame(values) {
    return values.reduce(function (t, v, i, a) {
        return t && objectIDsEqual(v, a[0]);
    });
};
/**
 * Promises to only return the unique results of a set of Promises
 *
 * @param {Promise[]} promises
 * @returns {Promise}
 */
/**
 * @file GraphQL implementation
 * @author Dave Ross <dave@davidmichaelross.com>
 */
function uniquePromiseResults() {
    for (var _len = arguments.length, promises = Array(_len), _key = 0; _key < _len; _key++) {
        promises[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
        Promise.all(promises.filter(function (x) {
            return x !== null;
        })).then(function (values) {
            return resolve(arrayAllSame(values) ? values[0] : null);
        }, function (reason) {
            return reject(reason);
        });
    });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (server, connection) {
    /**
     * @api {get} /doctors Retrieve all Doctors
     * @apiName GetDoctors
     * @apiGroup Doctor
     *
     * @apiSuccess {Object[]} List of Doctors.
     */
    server.get('/doctors', allDoctorsV1);
    server.get('/v1/doctors', allDoctorsV1);
    function allDoctorsV1(req, res) {
        _doctor.Doctor.all(connection).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /doctors/:id Retrieve a single Doctor
     * @apiName GetDoctor
     * @apiGroup Doctor
     *
     * @apiParam {Number} id Doctor ID
     *
     * @apiSuccess {Number} id Doctor ID.
     * @apiSuccess {String} incarnation Incarnation name (i.e. "The War Doctor", "The Fifth Doctor").
     * @apiSuccess {String} primaryActor Actor who usually portrayed this incarnation of The Doctor.
     */
    server.get('/doctors/:id', doctorByIDV1);
    server.get('/v1/doctors/:id', doctorByIDV1);
    function doctorByIDV1(req, res) {
        _doctor.Doctor.forID(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /doctors/:id/serials Retrieve all serials featuring a Doctor
     * @apiName GetSerialsForDoctor
     * @apiGroup Doctor
     *
     * @apiParam {Number} id Doctor ID
     */
    server.get('/doctors/:id/serials', serialsForDoctorV1);
    server.get('/v1/doctors/:id/serials', serialsForDoctorV1);
    function serialsForDoctorV1(req, res) {
        _doctor.Doctor.serials(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /doctors/:id/actors Retrieve all actors who portrayed a Doctor
     * @apiName GetActorsForDoctor
     * @apiGroup Doctor
     *
     * @apiParam {Number} id Doctor ID
     */
    server.get('/doctors/:id/actors', actorsForDoctorV1);
    server.get('/v1/doctors/:id/actors', actorsForDoctorV1);
    function actorsForDoctorV1(req, res) {
        _doctor.Doctor.actors(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /serials Retrieve all Serials
     * @apiName GetSerials
     * @apiGroup Serial
     *
     * @apiSuccess {Object[]} List of Serials.
     */
    server.get('/serials', allSerialsV1);
    server.get('/v1/serials', allSerialsV1);
    function allSerialsV1(req, res) {
        _serial.Serial.all(connection).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /serials/:id Retrieve a single Serial
     * @apiName GetSerial
     * @apiGroup Serial
     *
     * @apiParam {Number} id Serial ID
     */
    server.get('/serials/:id', serialByIDV1);
    server.get('/v1/serials/:id', serialByIDV1);
    function serialByIDV1(req, res) {
        _serial.Serial.forID(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /serials/:id/doctors Retrieve all Doctors who appeared in a Serial
     * @apiName GetSerialDoctors
     * @apiGroup Serial
     *
     * @apiParam {Number} id Serial ID
     */
    server.get('/serials/:id/doctors', doctorsInSerialByIDV1);
    server.get('/v1/serials/:id/doctors', doctorsInSerialByIDV1);
    function doctorsInSerialByIDV1(req, res) {
        _doctor.Doctor.forSerialID(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /serials/:id/directors Retrieve all Directors of a Serial
     * @apiName GetSerialDirectors
     * @apiGroup Serial
     *
     * @apiParam {Number} id Serial ID
     */
    server.get('/serials/:id/directors', directorsOfSerialByIDV1);
    server.get('/v1/serials/:id/directors', directorsOfSerialByIDV1);
    function directorsOfSerialByIDV1(req, res) {
        _director.Director.forSerialID(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /serials/:id/writers Retrieve all Writers of a Serial
     * @apiName GetSerialWriters
     * @apiGroup Serial
     *
     * @apiParam {Number} id Serial ID
     */
    server.get('/serials/:id/writers', writersOfSerialByIDV1);
    server.get('/v1/serials/:id/writers', writersOfSerialByIDV1);
    function writersOfSerialByIDV1(req, res) {
        _writer.Writer.forSerialID(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /serials/:id/episodes Retrieve all Episodes of a Serial
     * @apiName GetSerialEpisodes
     * @apiGroup Serial
     *
     * @apiParam {Number} id Serial ID
     */
    server.get('/serials/:id/episodes', episodesOfSerialByIDV1);
    server.get('/v1/serials/:id/episodes', episodesOfSerialByIDV1);
    function episodesOfSerialByIDV1(req, res) {
        _episode.Episode.forSerialID(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /seasons Retrieve all Seasons
     * @apiName GetSeasons
     * @apiGroup Season
     *
     * @apiSuccess {Object[]} List of Seasons.
     */
    server.get('/seasons', allSeasonsV1);
    server.get('/v1/seasons', allSeasonsV1);
    function allSeasonsV1(req, res) {
        _season.Season.all(connection).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /seasons/:id Retrieve a single Season
     * @apiName GetSeason
     * @apiGroup Season
     *
     * @apiParam {Number} id Season ID
     *
     * @apiSuccess {Number} id Season ID.
     * @apiSuccess {String} name What the season is called (i.e. "Season Two", "Series Four").
     */
    server.get('/seasons/:id', seasonByIDV1);
    server.get('/v1/seasons/:id', seasonByIDV1);
    function seasonByIDV1(req, res) {
        _season.Season.forID(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /seasons/:id/serials Retrieve all serials in a single Season
     * @apiName GetSeasonSerials
     * @apiGroup Season
     *
     * @apiParam {Number} id Season ID
     */
    server.get('/seasons/:id/serials', serialsInSeasonV1);
    server.get('/v1/seasons/:id/serials', serialsInSeasonV1);
    function serialsInSeasonV1(req, res) {
        _season.Season.serials(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /directors Retrieve all Directors
     * @apiName GetDirectors
     * @apiGroup Director
     *
     * @apiSuccess {Object[]} List of Directors.
     */
    server.get('/directors', allDirectorsV1);
    server.get('/v1/directors', allDirectorsV1);
    function allDirectorsV1(req, res) {
        _director.Director.all(connection).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /directors/:id Retrieve a single Director
     * @apiName GetDirector
     * @apiGroup Director
     *
     * @apiParam {Number} id Director ID
     *
     * @apiSuccess {Number} id Director ID.
     * @apiSuccess {String} name The Director's name.
     */
    server.get('/directors/:id', directorByIDV1);
    server.get('/v1/directors/:id', directorByIDV1);
    function directorByIDV1(req, res) {
        _director.Director.forID(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /directors/:id/serials Retrieve all serials by a Director
     * @apiName GetSerialsForDirector
     * @apiGroup Director
     *
     * @apiParam {Number} id Director ID
     */
    server.get('/directors/:id/serials', serialsForDirectorV1);
    server.get('/v1/directors/:id/serials', serialsForDirectorV1);
    function serialsForDirectorV1(req, res) {
        _director.Director.serials(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /writers Retrieve all Writers
     * @apiName GetWriters
     * @apiGroup Writer
     *
     * @apiSuccess {Object[]} List of Writers.
     */
    server.get('/writers', allWritersV1);
    server.get('/v1/writers', allWritersV1);
    function allWritersV1(req, res) {
        _writer.Writer.all(connection).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /writers/:id Retrieve a single Writer
     * @apiName GetWriter
     * @apiGroup Writer
     *
     * @apiParam {Number} id Writer ID
     *
     * @apiSuccess {Number} id Writer ID.
     * @apiSuccess {String} name The Writer's name.
     */
    server.get('/writers/:id', writerByIDV1);
    server.get('/v1/writers/:id', writerByIDV1);
    function writerByIDV1(req, res) {
        _writer.Writer.forID(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /writers/:id/serials Retrieve all serials by a Writer
     * @apiName GetSerialsForWriter
     * @apiGroup Writer
     *
     * @apiParam {Number} id Writer ID
     */
    server.get('/writers/:id/serials', serialsForWriterV1);
    server.get('/v1/writers/:id/serials', serialsForWriterV1);
    function serialsForWriterV1(req, res) {
        _writer.Writer.serials(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /episodes Retrieve all Episodes
     * @apiName GetEpisodes
     * @apiGroup Episode
     *
     * @apiSuccess {Object[]} List of Episodes.
     */
    server.get('/episodes', allEpisodesV1);
    server.get('/v1/episodes', allEpisodesV1);
    function allEpisodesV1(req, res) {
        _episode.Episode.all(connection).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
    /**
     * @api {get} /episodes/:id Retrieve a single Episode
     * @apiName GetEpisode
     * @apiGroup Episode
     *
     * @apiParam {Number} id Episode ID
     */
    server.get('/episodes/:id', episodeByIDV1);
    server.get('/v1/episodes/:id', episodeByIDV1);
    function episodeByIDV1(req, res) {
        _episode.Episode.forID(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }
};

var _doctor = __webpack_require__(3);

var _serial = __webpack_require__(0);

var _writer = __webpack_require__(6);

var _director = __webpack_require__(2);

var _season = __webpack_require__(5);

var _episode = __webpack_require__(4);

var processSuccessfulQueryResults = function processSuccessfulQueryResults(res) {
    return function (value) {
        res.send(value);
    };
};
var processFailedQueryResults = function processFailedQueryResults(res) {
    return function (reason) {
        res.status(404).send('Error');
    };
};
/**
 * Set up routes and handlers for the v1 REST API
 * @param server {object} Restify server object
 */

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("sqlite3");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _express = __webpack_require__(10);

var _express2 = _interopRequireDefault(_express);

var _restv = __webpack_require__(9);

var _restv2 = _interopRequireDefault(_restv);

var _sqlite = __webpack_require__(11);

var _graphql = __webpack_require__(8);

var _graphql2 = _interopRequireDefault(_graphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file Catalogopolis API Bootstrap/Initialization
 * @author Dave Ross <dave@davidmichaelross.com>
 */
console.log(module.filename);
// console.log(path.join('..', '..', 'catalogopolis-api.sqlite'))
var connection = new _sqlite.Database('catalogopolis-api.sqlite');
var server = (0, _express2.default)();
(0, _restv2.default)(server, connection);
(0, _graphql2.default)(server, connection);
server.listen(5000);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)(module)))

/***/ })
/******/ ]);