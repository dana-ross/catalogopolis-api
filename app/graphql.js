/**
 * @file GraphQL implementation
 * @author Dave Ross <dave@davidmichaelross.com>
 */

const graphql = require('graphql'),
	graphqlHTTP = require('express-graphql'),
	Doctor = require('./doctor'),
	Director = require('./director'),
	Writer = require('./writer'),
	Season = require('./season'),
	Serial = require('./serial');

const objectIDsEqual = (x, y) => x.id !== undefined && y.id !== undefined && x.id === y.id,
	arrayAllSame = values => values.reduce((t, v, i, a) => t && objectIDsEqual(v, a[0]));

/**
 * Promises to only return the unique results of a set of Promises
 *
 * @param {Promise[]} promises
 * @returns {Promise}
 */
function uniquePromiseResults(...promises) {
	return new Promise(function (resolve, reject) {
		Promise.all(
			promises.filter(x => x !== null)
		).then(
			values => resolve(arrayAllSame(values) ? values[0] : null),
			reason => reject(reason)
			);
	});
}


module.exports.init = function (server, connection) {

	var doctorType = new graphql.GraphQLObjectType({
		name: 'Doctor',
		description: 'A single incarnation of The Doctor',
		fields: function () {
			return {
				id: {
					type: graphql.GraphQLInt,
					description: 'Doctor ID'
				},
				incarnation: {
					type: graphql.GraphQLString,
					description: 'Name of this incarnation of The Doctor'
				},
				actor: {
					type: graphql.GraphQLString,
					description: 'Name of the actor who portrayed this incarnation of The Doctor'
				}
			}
		}
	});

	var directorType = new graphql.GraphQLObjectType({
		name: 'Director',
		description: 'The director of an episode',
		fields: function () {
			return {
				id: {
					type: graphql.GraphQLID,
					description: 'Director ID'
				},
				name: {
					type: graphql.GraphQLString,
					description: 'Director name'
				}
			}
		}
	});

	var writerType = new graphql.GraphQLObjectType({
		name: 'Writer',
		description: 'The writer of an episode',
		fields: function () {
			return {
				id: {
					type: graphql.GraphQLID,
					description: 'Writer ID'
				},
				name: {
					type: graphql.GraphQLString,
					description: 'Writer name'
				}
			}
		}
	});

	var seasonType = new graphql.GraphQLObjectType({
		name: 'Season',
		description: 'A season of the show',
		fields: function () {
			return {
				id: {
					type: graphql.GraphQLID,
					description: 'Season ID'
				},
				name: {
					type: graphql.GraphQLString,
					description: 'Season name'
				}
			}
		}
	});

	var serialType = new graphql.GraphQLObjectType({
		name: 'Serial',
		description: 'A serial or single episode',
		fields: function () {
			return {
				id: {
					type: graphql.GraphQLID,
					description: 'Serial ID'
				},
				season: {
					type: seasonType,
					description: 'Season',
					resolve: (parent) => {
						return new Promise(function (resolve, reject) {
							Season.forID(connection, parent.seasonID).then(
								(value) => resolve(value),
								(reason) => reject(reason)
							)
						});
					}
				},
				story: {
					type: graphql.GraphQLInt,
					description: 'Story number'
				},
				serial: {
					type: graphql.GraphQLInt,
					description: 'Serial episode number'
				},
				title: {
					type: graphql.GraphQLString,
					description: 'Serial title'
				},
				productionCode: {
					type: graphql.GraphQLString,
					description: 'Serial production code'
				},
				doctors: {
					type: doctorType,
					description: 'Doctor(s) who appeared in this episode',
					resolve: (parent) => {
						return new Promise(function (resolve, reject) {
							Doctor.forSerial(connection, parent.id).then(
								(value) => resolve(value),
								(reason) => reject(reason)
							)
						});
					}
				},
				directors: {
					type: new graphql.GraphQLList(directorType),
					description: 'Directors of this serial',
					resolve: (parent) => {
						return new Promise(function (resolve, reject) {
							Director.forSerialID(connection, parent.id).then(
								(value) => resolve(value),
								(reason) => reject(reason)
							)
						});
					}
				},
				writers: {
					type: new graphql.GraphQLList(writerType),
					description: 'Writers of this serial',
					resolve: (parent) => {
						return new Promise(function (resolve, reject) {
							Writer.forSerialID(connection, parent.id).then(
								(value) => resolve(value),
								(reason) => reject(reason)
							)
						});
					}
				}
			}
		}
	});

	var schema = new graphql.GraphQLSchema({
		query: new graphql.GraphQLObjectType({
			name: 'RootQueryType',
			fields: {
				doctor: {
					type: doctorType,
					args: {
						id: {
							description: 'Doctor ID',
							type: graphql.GraphQLID
						},
						incarnation: {
							description: 'Name of this incarnation of The Doctor',
							type: graphql.GraphQLString
						},
						actor: {
							description: 'Name of the actor who portrayed this incarnation of The Doctor',
							type: graphql.GraphQLString
						}
					},
					resolve: (root, { id, incarnation, actor }) => {
						return uniquePromiseResults(
							id ? Doctor.forID(connection, id) : null,
							incarnation ? Doctor.forIncarnation(connection, incarnation) : null,
							actor ? Doctor.forActor(connection, actor) : null
						);
					},
				},
				director: {
					type: directorType,
					args: {
						id: {
							description: 'Director ID',
							type: graphql.GraphQLID
						},
						name: {
							description: 'Director name',
							type: graphql.GraphQLString
						}
					},
					resolve: (root, { id, name }) => {
						return uniquePromiseResults(
							id ? Director.forID(connection, id) : null,
							name ? Director.forName(connection, name) : null
						);
					}
				},
				writer: {
					type: writerType,
					args: {
						id: {
							description: 'Writer ID',
							type: graphql.GraphQLID
						},
						name: {
							description: 'Writer name',
							type: graphql.GraphQLString
						}
					},
					resolve: (root, { id, name }) => {
						return uniquePromiseResults(
							id ? Writer.forID(connection, id) : null,
							name ? Writer.forName(connection, name) : null
						);
					}
				},
				season: {
					type: seasonType,
					args: {
						id: {
							description: 'Season ID',
							type: graphql.GraphQLID
						}
					},
					resolve: (root, { id }) => {
						return new Promise(function (resolve, reject) {
							Season.forID(connection, id).then(
								(value) => resolve(value),
								(reason) => reject(reason)
							);
						})
					}
				},
				serial: {
					type: serialType,
					args: {
						id: {
							description: 'Serial ID',
							type: graphql.GraphQLID
						}
					},
					resolve: (root, { id }) => {
						return new Promise(function (resolve, reject) {
							Serial.forID(connection, id).then(
								(value) => {
									value.season = value.seasonID;
									resolve(value);
								},
								(reason) => reject(reason)
							);
						})
					}
				}
			}
		})
	});

	server.use('/graphql', graphqlHTTP({
		schema: schema,
		graphiql: true
	}));
}

