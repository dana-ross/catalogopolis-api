/**
 * @file GraphQL implementation
 * @author Dave Ross <dave@davidmichaelross.com>
 */

import {GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLID, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean} from "graphql"
import graphqlHTTP from "express-graphql"
import {Doctor} from "./doctor"
import {Director} from "./director"
import {Writer} from "./writer"
import {Season} from "./season"
import {Serial} from "./serial"
import {Actor} from "./actor"
import {Episode} from "./episode"

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


export default function (server, connection) {

	var actorType = new GraphQLObjectType({
		name: 'Actor',
		description: 'An actor',
		fields: function () {
			return {
				id: {
					type: GraphQLID,
					description: 'Actor ID'
				},
				name: {
					type: GraphQLString,
					description: 'Actor name'
				}
			}
		}
	});

	var doctorType = new GraphQLObjectType({
		name: 'Doctor',
		description: 'A single incarnation of The Doctor',
		fields: function () {
			return {
				id: {
					type: GraphQLID,
					description: 'Doctor ID'
				},
				incarnation: {
					type: GraphQLString,
					description: 'Name of this incarnation of The Doctor'
				},
				primaryActor: {
					type: actorType,
					description: 'The actor who usually portrayed this incarnation of The Doctor',
					resolve: (parent) => {
						return new Promise((resolve, reject) => {
							Actor.forID(connection, parent.primaryActorID).then(
								(value) => resolve(value),
								(reason) => reject(reason)
							)
						});
					}
				},
				serials: {
					type: new GraphQLList(serialType),
					description: 'Serials',
					resolve: (parent) => {
						return new Promise(function (resolve, reject) {
							Doctor.serials(connection, parent.id).then(
								(value) => resolve(value),
								(reason) => reject(reason)
							)
						});
					}
				}
			}
		}
	});

	var directorType = new GraphQLObjectType({
		name: 'Director',
		description: 'The director of an episode',
		fields: function () {
			return {
				id: {
					type: GraphQLID,
					description: 'Director ID'
				},
				name: {
					type: GraphQLString,
					description: 'Director name'
				},
				serials: {
					type: new GraphQLList(serialType),
					description: 'Serials',
					resolve: (parent) => {
						return new Promise(function (resolve, reject) {
							Director.serials(connection, parent.id).then(
								(value) => resolve(value),
								(reason) => reject(reason)
							)
						});
					}
				}
			}
		}
	});

	var writerType = new GraphQLObjectType({
		name: 'Writer',
		description: 'The writer of an episode',
		fields: function () {
			return {
				id: {
					type: GraphQLID,
					description: 'Writer ID'
				},
				name: {
					type: GraphQLString,
					description: 'Writer name'
				},
				serials: {
					type: new GraphQLList(serialType),
					description: 'Serials',
					resolve: (parent) => {
						return new Promise(function (resolve, reject) {
							Writer.serials(connection, parent.id).then(
								(value) => resolve(value),
								(reason) => reject(reason)
							)
						});
					}
				}
			}
		}
	});

	var episodeType = new GraphQLObjectType({
		name: 'Episode',
		description: 'An episode of a Serial, or a single episode of the show',
		fields: function () {
			return {
				id: {
					type: GraphQLID,
					description: 'Episode ID'
				},
				title: {
					type: GraphQLString,
					description: 'Episode title'
				},
				serial: {
					type: serialType,
					description: 'Serial this Episode appears in',
					resolve: (parent) => {
						return new Promise((resolve, reject) => {
							Serial.forID(connection, parent.serialID).then(
								(value) => resolve(value),
								(reason) => reject(reason)
							)
						});
					}
				},
				episodeOrder: {
					type: GraphQLInt,
					description: 'Episode order within a serial'
				},
				originalAirDate: {
					type: GraphQLString,
					description: 'Original air date (yyyy-mm-dd)'
				},
				runtime: {
					type: GraphQLString,
					description: 'Original running time (hh:mm)'
				},
				ukViewersMM: {
					type: GraphQLFloat,
					description: 'UK viewers (millions) of the first showing'
				},
				appreciationIndex: {
					type: GraphQLInt,
					description: 'Appreciation Index of the first showing'
				},
				missing: {
					type: GraphQLBoolean,
					description: 'Whether the episode is currently missing'
				},
				recreated: {
					type: GraphQLBoolean,
					description: 'Whether a missing episode has been officially re-created (such as the animated re-creations)'
				}
			}
		}
	});

	var seasonType = new GraphQLObjectType({
		name: 'Season',
		description: 'A season of the show',
		fields: function () {
			return {
				id: {
					type: GraphQLID,
					description: 'Season ID'
				},
				name: {
					type: GraphQLString,
					description: 'Season name'
				},
				serials: {
					type: new GraphQLList(serialType),
					description: 'Serials',
					resolve: (parent) => {
						return new Promise(function (resolve, reject) {
							Season.serials(connection, parent.id).then(
								(value) => resolve(value),
								(reason) => reject(reason)
							)
						});
					}
				}
			}
		}
	});

	var serialType = new GraphQLObjectType({
		name: 'Serial',
		description: 'A serial or single episode',
		fields: function () {
			return {
				id: {
					type: GraphQLID,
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
					type: GraphQLInt,
					description: 'Story number'
				},
				serial: {
					type: GraphQLInt,
					description: 'Serial episode number'
				},
				title: {
					type: GraphQLString,
					description: 'Serial title'
				},
				productionCode: {
					type: GraphQLString,
					description: 'Serial production code'
				},
				doctors: {
					type: new GraphQLList(doctorType),
					description: 'Doctor(s) who appeared in this episode',
					resolve: (parent) => {
						return new Promise(function (resolve, reject) {
							Doctor.forSerialID(connection, parent.id).then(
								(value) => resolve(value),
								(reason) => reject(reason)
							)
						});
					}
				},
				directors: {
					type: new GraphQLList(directorType),
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
					type: new GraphQLList(writerType),
					description: 'Writers of this serial',
					resolve: (parent) => {
						return new Promise(function (resolve, reject) {
							Writer.forSerialID(connection, parent.id).then(
								(value) => resolve(value),
								(reason) => reject(reason)
							)
						});
					}
				},
				episodes: {
					type: new GraphQLList(episodeType),
					description: 'Episodes in this serial',
					resolve: (parent) => {
						return new Promise((resolve, reject) => {
							Episode.forSerialID(connection, parent.id).then(
								(value) => resolve(value),
								(reason) => reject(reason)
							)
						});
					}
				}
			}
		}
	});

	var schema = new GraphQLSchema({
		query: new GraphQLObjectType({
			name: 'RootQueryType',
			fields: {
				doctor: {
					type: doctorType,
					args: {
						id: {
							description: 'Doctor ID',
							type: GraphQLID
						},
						incarnation: {
							description: 'Name of this incarnation of The Doctor',
							type: GraphQLString
						},
						primaryActorID: {
							description: 'The actor who usually portrayed this incarnation of The Doctor',
							type: GraphQLID
						}
					},
					resolve: (root, { id, incarnation, primaryActorID }) => {
						return uniquePromiseResults(
							id ? Doctor.forID(connection, id) : null,
							incarnation ? Doctor.forIncarnation(connection, incarnation) : null,
							primaryActorID ? Doctor.forPrimaryActorID(connection, primaryActorID) : null
						);
					},
				},
				director: {
					type: directorType,
					args: {
						id: {
							description: 'Director ID',
							type: GraphQLID
						},
						name: {
							description: 'Director name',
							type: GraphQLString
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
							type: GraphQLID
						},
						name: {
							description: 'Writer name',
							type: GraphQLString
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
							type: GraphQLID
						},
						name: {
							description: 'Season name',
							type: GraphQLString
						}
					},
					resolve: (root, { id, name }) => {
						return uniquePromiseResults(
							id ? Season.forID(connection, id) : null,
							name ? Season.forName(connection, name) : null
						);
					}
				},
				episode: {
					type: episodeType,
					args: {
						id: {
							description: 'Episode ID',
							type: GraphQLID
						},
						title: {
							description: 'Episode Title',
							type: GraphQLString
						},
						originalAirDate: {
							description: 'Original air date (yyyy-mm-dd)',
							type: GraphQLString
						},
						missing: {
							description: 'If the episode is currently missing',
							type: GraphQLBoolean
						},

					},
					resolve: (root, {id, title, originalAirDate, missing}) => {
							return uniquePromiseResults(
								id ? Episode.forID(connection, id) : null,
								title ? Episode.forTitle(connection, title) : null,
								originalAirDate ? Episode.forOriginalAirDate(connection, originalAirDate) : null,
								missing ? Episode.forMissingStatus(connection, missing) : null
							);
						}
				},
				serial: {
					type: serialType,
					args: {
						id: {
							description: 'Serial ID',
							type: GraphQLID
						},
						title: {
							description: 'Serial title',
							type: GraphQLString
						}
					},
					resolve: (root, { id, title }) => {
						return uniquePromiseResults(
							id ? Serial.forID(connection, id) : null,
							title ? Serial.forTitle(connection, title) : null
						);
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
