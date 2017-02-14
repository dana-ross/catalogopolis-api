/**
 * Set up routes and handlers for the v1 REST API
 * @param server {object} Restify server object
 */
module.exports.init = function(server) {

    // Doctors
    server.get({ path: '/doctors', version: '1.0.0' }, allDoctorsV1);
    server.get({ path: 'v1/doctors', version: '1.0.0' }, allDoctorsV1);
    function allDoctorsV1(req, res, next) {
        doQuerySendResponse('SELECT * FROM doctors', [], res, next);
    }
    server.get({ path: '/doctors/:id', version: '1.0.0' }, doctorByIDV1);
    server.get({ path: 'v1/doctors/:id', version: '1.0.0' }, doctorByIDV1);
    function doctorByIDV1(req, res, next) {
        doQuerySendResponse('SELECT * FROM doctors WHERE id = ?', [req.params.id], res, next);
    }

    // Serials
    server.get({ path: '/serials', version: '1.0.0' }, allSerialsV1);
    server.get({ path: 'v1/serials', version: '1.0.0' }, allSerialsV1);
    function allSerialsV1(req, res, next) {
        doQuerySendResponse('SELECT * FROM serials', [], res, next);
    }
    server.get({ path: '/serials/:id', version: '1.0.0' }, serialByIDV1);
    server.get({ path: 'v1/serials/:id', version: '1.0.0' }, serialByIDV1);
    function serialByIDV1(req, res, next) {
        doQuerySendResponse('SELECT * FROM serials WHERE id = ?', [req.params.id], res, next);
    }
    server.get({ path: '/serials/:id/doctors', version: '1.0.0' }, doctorsInSerialByIDV1);
    server.get({ path: 'v1/serials/:id/doctors', version: '1.0.0' }, doctorsInSerialByIDV1);
    function doctorsInSerialByIDV1(req, res, next) {
        doQuerySendResponse('SELECT doctors.* FROM serials INNER JOIN serials_doctors ON serials.id = serials_doctors.serial_id INNER JOIN doctors ON serials_doctors.doctor_id = doctors.id WHERE serials.id = ?', [req.params.id], res, next);
    }
    server.get({ path: '/serials/:id/directors', version: '1.0.0' }, directorsOfSerialByIDV1);
    server.get({ path: 'v1/serials/:id/directors', version: '1.0.0' }, directorsOfSerialByIDV1);
    function directorsOfSerialByIDV1(req, res, next) {
        doQuerySendResponse('SELECT directors.* FROM serials INNER JOIN serials_directors ON serials.id = serials_directors.serial_id INNER JOIN directors ON serials_directors.director_id = directors.id WHERE serials.id = ?', [req.params.id], res, next);
    }
    server.get({ path: '/serials/:id/writers', version: '1.0.0' }, writersOfSerialByIDV1);
    server.get({ path: 'v1/serials/:id/writers', version: '1.0.0' }, writersOfSerialByIDV1);
    function writersOfSerialByIDV1(req, res, next) {
        doQuerySendResponse('SELECT writers.* FROM serials INNER JOIN serials_writers ON serials.id = serials_writers.serial_id INNER JOIN writers ON serials_writers.writer_id = writers.id WHERE serials.id = ?', [req.params.id], res, next);
    }

    // Seasons
    server.get({ path: '/seasons', version: '1.0.0' }, allSeasonsV1);
    server.get({ path: 'v1/seasons', version: '1.0.0' }, allSeasonsV1);
    function allSeasonsV1(req, res, next) {
        doQuerySendResponse('SELECT * FROM seasons', [], res, next);
    }
    server.get({ path: '/seasons/:id', version: '1.0.0' }, seasonByIDV1);
    server.get({ path: 'v1/seasons/:id', version: '1.0.0' }, seasonByIDV1);
    function seasonByIDV1(req, res, next) {
        doQuerySendResponse('SELECT * FROM seasons WHERE id = ?', [req.params.id], res, next);
    }

    // Directors
    server.get({ path: '/directors', version: '1.0.0' }, allDirectorsV1);
    server.get({ path: 'v1/directors', version: '1.0.0' }, allDirectorsV1);
    function allDirectorsV1(req, res, next) {
        doQuerySendResponse('SELECT * FROM directors', [], res, next);
    }
    server.get({ path: '/directors/:id', version: '1.0.0' }, directorByIDV1);
    server.get({ path: 'v1/directors/:id', version: '1.0.0' }, directorByIDV1);
    function directorByIDV1(req, res, next) {
        doQuerySendResponse('SELECT * FROM directors WHERE id = ?', [req.params.id], res, next);
    }

    // Writers
    server.get({ path: '/writers', version: '1.0.0' }, allWritersV1);
    server.get({ path: 'v1/writers', version: '1.0.0' }, allWritersV1);
    function allWritersV1(req, res, next) {
        doQuerySendResponse('SELECT * FROM writers', [], res, next);
    }
    server.get({ path: '/writers/:id', version: '1.0.0' }, writerByIDV1);
    server.get({ path: 'v1/writers/:id', version: '1.0.0' }, writerByIDV1);
    function writerByIDV1(req, res, next) {
        doQuerySendResponse('SELECT * FROM writers WHERE id = ?', [req.params.id], res, next);
    }

}