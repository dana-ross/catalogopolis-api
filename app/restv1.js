const Doctor = require('./doctor'),
    Serial = require('./serial'),
    Writer = require('./writer'),
    Director = require('./director'),
    Season = require('./season'),
	Actor = require('./actor');

const processSuccessfulQueryResults = (res) => {
    return function (value) {
        res.send(value);
    }
}

const processFailedQueryResults = (res) => {
    return function (reason) {
        res.status(404).send('Error');
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
    server.get('/doctors', allDoctorsV1);
    server.get('/v1/doctors', allDoctorsV1);
    function allDoctorsV1(req, res) {
        Doctor.all(connection).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
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
        console.log(req);
        Doctor.forID(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
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
        Doctor.serials(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
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
        Doctor.actors(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }

    /**
     * @api {get} /serials Retrieve all Serials
     * @apiName GetSerials
     * @apiGroup Serial
     *
     * @apiSuccess {Object[]} doctors List of Serials.
     */
    server.get('/serials', allSerialsV1);
    server.get('/v1/serials', allSerialsV1);
    function allSerialsV1(req, res) {
        Serial.all(connection).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
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
        Serial.forID(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
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
        Doctor.forSerialID(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
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
        Director.forSerialID(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
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
        Writer.forSerialID(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }

    /**
     * @api {get} /seasons Retrieve all Seasons
     * @apiName GetSeasons
     * @apiGroup Season
     *
     * @apiSuccess {Object[]} doctors List of Seasons.
     */
    server.get('/seasons', allSeasonsV1);
    server.get('/v1/seasons', allSeasonsV1);
    function allSeasonsV1(req, res) {
        Season.all(connection).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
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
        Season.forID(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
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
        Season.serials(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }

    /**
     * @api {get} /directors Retrieve all Directors
     * @apiName GetDirectors
     * @apiGroup Director
     *
     * @apiSuccess {Object[]} doctors List of Directors.
     */
    server.get('/directors', allDirectorsV1);
    server.get('/v1/directors', allDirectorsV1);
    function allDirectorsV1(req, res) {
        Director.all(connection).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
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
        Director.forID(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
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
        Director.serials(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }

    /**
     * @api {get} /writers Retrieve all Writers
     * @apiName GetWriters
     * @apiGroup Writer
     *
     * @apiSuccess {Object[]} doctors List of Writers.
     */
    server.get('/writers', allWritersV1);
    server.get('/v1/writers', allWritersV1);
    function allWritersV1(req, res) {
        Writer.all(connection).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
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
        Writer.forID(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
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
        Writer.serials(connection, req.params.id).then(processSuccessfulQueryResults(res), processFailedQueryResults(res));
    }

}
