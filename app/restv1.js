var Doctor = require('./doctor'),
    Serial = require('./serial'),
    Writer = require('./writer'),
    Director = require('./director'),
    Season = require('./season');

function processSuccessfulQueryResults(res, next) {
    return function (value) {
        res.send(200, value);
        return next();
    }
}

function processFailedQueryResults(res, next) {
    return function (reason) {
        res.send(404);
        return next();
    }
}

/**
 * Set up routes and handlers for the v1 REST API
 * @param server {object} Restify server object
 */
module.exports.init = function (server, connection) {

    /**
     * @api {get} /doctors Retrieve all Doctors
     * @apiName GetDoctors
     * @apiGroup Doctor
     * 
     * @apiSuccess {Object[]} doctors List of Doctors.
     */
    server.get({ path: 'doctors', version: '1.0.0' }, allDoctorsV1);
    server.get({ path: 'v1/doctors', version: '1.0.0' }, allDoctorsV1);
    function allDoctorsV1(req, res, next) {
        Doctor.all(connection).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
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
     * @apiSuccess {String} actor Actor who portrayed this incarnation of The Doctor.
     */
    server.get({ path: 'doctors/:id', version: '1.0.0' }, doctorByIDV1);
    server.get({ path: 'v1/doctors/:id', version: '1.0.0' }, doctorByIDV1);
    function doctorByIDV1(req, res, next) {
        Doctor.forID(connection, req.params.id).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }

    /**
     * @api {get} /serials Retrieve all Serials
     * @apiName GetSerials
     * @apiGroup Serial
     * 
     * @apiSuccess {Object[]} doctors List of Serials.
     */
    server.get({ path: 'serials', version: '1.0.0' }, allSerialsV1);
    server.get({ path: 'v1/serials', version: '1.0.0' }, allSerialsV1);
    function allSerialsV1(req, res, next) {
        Serial.all(connection).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }

    /**
     * @api {get} /serials/:id Retrieve a single Serial
     * @apiName GetSerial
     * @apiGroup Serial
     * 
     * @apiParam {Number} id Serial ID
     */
    server.get({ path: 'serials/:id', version: '1.0.0' }, serialByIDV1);
    server.get({ path: 'v1/serials/:id', version: '1.0.0' }, serialByIDV1);
    function serialByIDV1(req, res, next) {
        Serial.forID(connection, req.params.id).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }

    /**
     * @api {get} /serials/:id/doctors Retrieve all Doctors who appeared in a Serial
     * @apiName GetSerialDoctors
     * @apiGroup Serial
     * 
     * @apiParam {Number} id Serial ID
     */
    server.get({ path: 'serials/:id/doctors', version: '1.0.0' }, doctorsInSerialByIDV1);
    server.get({ path: 'v1/serials/:id/doctors', version: '1.0.0' }, doctorsInSerialByIDV1);
    function doctorsInSerialByIDV1(req, res, next) {
        Doctor.forSerialID(connection, req.params.id).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }

    /**
     * @api {get} /serials/:id/directors Retrieve all Directors of a Serial
     * @apiName GetSerialDirectors
     * @apiGroup Serial
     * 
     * @apiParam {Number} id Serial ID
     */
    server.get({ path: 'serials/:id/directors', version: '1.0.0' }, directorsOfSerialByIDV1);
    server.get({ path: 'v1/serials/:id/directors', version: '1.0.0' }, directorsOfSerialByIDV1);
    function directorsOfSerialByIDV1(req, res, next) {
        Director.forSerialID(connection, req.params.id).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }

    /**
     * @api {get} /serials/:id/writers Retrieve all Writers of a Serial
     * @apiName GetSerialWriters
     * @apiGroup Serial
     * 
     * @apiParam {Number} id Serial ID
     */
    server.get({ path: 'serials/:id/writers', version: '1.0.0' }, writersOfSerialByIDV1);
    server.get({ path: 'v1/serials/:id/writers', version: '1.0.0' }, writersOfSerialByIDV1);
    function writersOfSerialByIDV1(req, res, next) {
        Writer.forSerialID(connection, req.params.id).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }

    /**
     * @api {get} /seasons Retrieve all Seasons
     * @apiName GetSeasons
     * @apiGroup Season
     * 
     * @apiSuccess {Object[]} doctors List of Seasons.
     */
    server.get({ path: 'seasons', version: '1.0.0' }, allSeasonsV1);
    server.get({ path: 'v1/seasons', version: '1.0.0' }, allSeasonsV1);
    function allSeasonsV1(req, res, next) {
        Season.all(connection).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
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
    server.get({ path: 'seasons/:id', version: '1.0.0' }, seasonByIDV1);
    server.get({ path: 'v1/seasons/:id', version: '1.0.0' }, seasonByIDV1);
    function seasonByIDV1(req, res, next) {
        Season.forID(connection, req.params.id).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }

    /**
     * @api {get} /directors Retrieve all Directors
     * @apiName GetDirectors
     * @apiGroup Director
     * 
     * @apiSuccess {Object[]} doctors List of Directors.
     */
    server.get({ path: 'directors', version: '1.0.0' }, allDirectorsV1);
    server.get({ path: 'v1/directors', version: '1.0.0' }, allDirectorsV1);
    function allDirectorsV1(req, res, next) {
        Director.all(connection).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
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
    server.get({ path: 'directors/:id', version: '1.0.0' }, directorByIDV1);
    server.get({ path: 'v1/directors/:id', version: '1.0.0' }, directorByIDV1);
    function directorByIDV1(req, res, next) {
        Director.forID(connection, req.params.id).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }

    /**
     * @api {get} /writers Retrieve all Writers
     * @apiName GetWriters
     * @apiGroup Writer
     * 
     * @apiSuccess {Object[]} doctors List of Writers.
     */
    server.get({ path: 'writers', version: '1.0.0' }, allWritersV1);
    server.get({ path: 'v1/writers', version: '1.0.0' }, allWritersV1);
    function allWritersV1(req, res, next) {
        Writer.all(connection).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
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
    server.get({ path: 'writers/:id', version: '1.0.0' }, writerByIDV1);
    server.get({ path: 'v1/writers/:id', version: '1.0.0' }, writerByIDV1);
    function writerByIDV1(req, res, next) {
        Writer.forID(connection, req.params.id).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }

}