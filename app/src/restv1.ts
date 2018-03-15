import { Doctor } from "./doctor"
import { Serial } from "./serial"
import { Writer } from "./writer"
import { Director } from "./director"
import { Season } from "./season"
import { Actor } from "./actor"
import { Episode } from "./episode"
import { Request, Response } from "polka"

/**
 * Output the result of a successful query
 *
 * @param res Response Express "Response" object
 */
const processSuccessfulQueryResults = (res: Response) => {
	return function (value: any) {
		res.setHeader('Content-Type', 'application/json')
		res.write(JSON.stringify(value))
	}
}

/**
 * Output an error for an unsuccessful query
 *
 * @param res Response Express "Response" object
 */
const processFailedQueryResults = (res: Response) => {
	return function (reason) {
		res.statusCode = 404
		res.write('Error')
	}
}

/**
 * Set up routes and handlers for the v1 REST API
 *
 * @param server {object} Restify server object
 */
export default function (server, connection) {

	/**
	 * @api {get} /doctors Retrieve all Doctors
	 * @apiName GetDoctors
	 * @apiGroup Doctor
	 *
	 * @apiSuccess {Object[]} List of Doctors.
	 */
	server.get('/doctors', allDoctorsV1);
	server.get('/v1/doctors', allDoctorsV1);

	function allDoctorsV1(req: Request, res: Response) {
		Doctor.all(connection).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function doctorByIDV1(req: Request, res: Response) {
		Doctor.forID(connection, req.params.id).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function serialsForDoctorV1(req: Request, res: Response) {
		Doctor.serials(connection, req.params.id).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function actorsForDoctorV1(req: Request, res: Response) {
		Doctor.actors(connection, req.params.id).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function allSerialsV1(req: Request, res: Response) {
		Serial.all(connection).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function serialByIDV1(req: Request, res: Response) {
		Serial.forID(connection, req.params.id).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function doctorsInSerialByIDV1(req: Request, res: Response) {
		Doctor.forSerialID(connection, req.params.id).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function directorsOfSerialByIDV1(req: Request, res: Response) {
		Director.forSerialID(connection, req.params.id).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function writersOfSerialByIDV1(req: Request, res: Response) {
		Writer.forSerialID(connection, req.params.id).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function episodesOfSerialByIDV1(req: Request, res: Response) {
		Episode.forSerialID(connection, req.params.id).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function allSeasonsV1(req: Request, res: Response) {
		Season.all(connection).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function seasonByIDV1(req: Request, res: Response) {
		Season.forID(connection, req.params.id).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function serialsInSeasonV1(req: Request, res: Response) {
		Season.serials(connection, req.params.id).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function allDirectorsV1(req: Request, res: Response) {
		Director.all(connection).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function directorByIDV1(req: Request, res: Response) {
		Director.forID(connection, req.params.id).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function serialsForDirectorV1(req: Request, res: Response) {
		Director.serials(connection, req.params.id).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function allWritersV1(req: Request, res: Response) {
		Writer.all(connection).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function writerByIDV1(req: Request, res: Response) {
		Writer.forID(connection, req.params.id).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function serialsForWriterV1(req: Request, res: Response) {
		Writer.serials(connection, req.params.id).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function allEpisodesV1(req: Request, res: Response) {
		Episode.all(connection).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
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

	function episodeByIDV1(req: Request, res: Response) {
		Episode.forID(connection, req.params.id).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
	}

	/**
	 * @api {get} /actors Retrieve all Actors
	 * @apiName GetActors
	 * @apiGroup Actor
	 *
	 * @apiSuccess {Object[]} List of Actors.
	 */
	server.get('/actors', allActorsV1);
	server.get('/v1/actors', allActorsV1);

	function allActorsV1(req: Request, res: Response) {
		Actor.all(connection).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
	}

	/**
	 * @api {get} /actors/:id Retrieve a single Actor
	 * @apiName GetActor
	 * @apiGroup Actor
	 *
	 * @apiParam {Number} id Actor ID
	 */
	server.get('/actors/:id', actorByIDV1);
	server.get('/v1/actors/:id', actorByIDV1);

	function actorByIDV1(req: Request, res: Response) {
		Actor.forID(connection, req.params.id).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
	}

	/**
	 * @api {get} /actors/:id/doctors Retrieve all doctors portrayed by an Actor
	 * @apiName GetDoctorsForActor
	 * @apiGroup Actor
	 *
	 * @apiParam {Number} id Actor ID
	 * @apiSuccess {Object[]} List of Doctors.
	 */
	server.get('/actors/:id/doctors', doctorsForActorV1);
	server.get('/v1/actors/:id/doctors', doctorsForActorV1);

	function doctorsForActorV1(req: Request, res: Response) {
		Actor.doctors(connection, req.params.id).then(
			processSuccessfulQueryResults(res)
		).catch(
			processFailedQueryResults(res)
		)
	}

}
