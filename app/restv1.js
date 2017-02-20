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

    // Doctors
    server.get({ path: 'doctors', version: '1.0.0' }, allDoctorsV1);
    server.get({ path: 'v1/doctors', version: '1.0.0' }, allDoctorsV1);
    function allDoctorsV1(req, res, next) {
        Doctor.all(connection).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }

    server.get({ path: 'doctors/:id', version: '1.0.0' }, doctorByIDV1);
    server.get({ path: 'v1/doctors/:id', version: '1.0.0' }, doctorByIDV1);
    function doctorByIDV1(req, res, next) {
        Doctor.forID(connection, req.params.id).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }

    // Serials
    server.get({ path: 'serials', version: '1.0.0' }, allSerialsV1);
    server.get({ path: 'v1/serials', version: '1.0.0' }, allSerialsV1);
    function allSerialsV1(req, res, next) {
        Serial.all(connection).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }
    server.get({ path: 'serials/:id', version: '1.0.0' }, serialByIDV1);
    server.get({ path: 'v1/serials/:id', version: '1.0.0' }, serialByIDV1);
    function serialByIDV1(req, res, next) {
        Serial.forID(connection, req.params.id).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }

    server.get({ path: 'serials/:id/doctors', version: '1.0.0' }, doctorsInSerialByIDV1);
    server.get({ path: 'v1/serials/:id/doctors', version: '1.0.0' }, doctorsInSerialByIDV1);
    function doctorsInSerialByIDV1(req, res, next) {
        Doctor.forSerialID(connection, req.params.id).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }
    server.get({ path: 'serials/:id/directors', version: '1.0.0' }, directorsOfSerialByIDV1);
    server.get({ path: 'v1/serials/:id/directors', version: '1.0.0' }, directorsOfSerialByIDV1);
    function directorsOfSerialByIDV1(req, res, next) {
        Director.forSerialID(connection, req.params.id).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }
    server.get({ path: 'serials/:id/writers', version: '1.0.0' }, writersOfSerialByIDV1);
    server.get({ path: 'v1/serials/:id/writers', version: '1.0.0' }, writersOfSerialByIDV1);
    function writersOfSerialByIDV1(req, res, next) {
        Writer.forSerialID(connection, req.params.id).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }

    // Seasons
    server.get({ path: 'seasons', version: '1.0.0' }, allSeasonsV1);
    server.get({ path: 'v1/seasons', version: '1.0.0' }, allSeasonsV1);
    function allSeasonsV1(req, res, next) {
        Season.all(connection).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }
    server.get({ path: 'seasons/:id', version: '1.0.0' }, seasonByIDV1);
    server.get({ path: 'v1/seasons/:id', version: '1.0.0' }, seasonByIDV1);
    function seasonByIDV1(req, res, next) {
        Season.forID(connection, req.params.id).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }

    // Directors
    server.get({ path: 'directors', version: '1.0.0' }, allDirectorsV1);
    server.get({ path: 'v1/directors', version: '1.0.0' }, allDirectorsV1);
    function allDirectorsV1(req, res, next) {
        Director.all(connection).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }
    server.get({ path: 'directors/:id', version: '1.0.0' }, directorByIDV1);
    server.get({ path: 'v1/directors/:id', version: '1.0.0' }, directorByIDV1);
    function directorByIDV1(req, res, next) {
        Director.forID(connection, req.params.id).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }

    // Writers
    server.get({ path: 'writers', version: '1.0.0' }, allWritersV1);
    server.get({ path: 'v1/writers', version: '1.0.0' }, allWritersV1);
    function allWritersV1(req, res, next) {
        Writer.all(connection).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }
    server.get({ path: 'writers/:id', version: '1.0.0' }, writerByIDV1);
    server.get({ path: 'v1/writers/:id', version: '1.0.0' }, writerByIDV1);
    function writerByIDV1(req, res, next) {
        Writer.forID(connection, req.params.id).then(processSuccessfulQueryResults(res, next), processFailedQueryResults(res, next));
    }
    
}