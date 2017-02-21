var graphql = require('graphql'),
    Doctor = require('./doctor'),
    Director = require('./director'),
    Writer = require('./writer'),
    Season = require('./season'),
    Serial = require('./serial');

var RestifyGraphQL = function RestifyGraphQL(schema) {
    return function (req, res, next) {
        graphql.graphql(schema, req.query.query).then(
            result => { res.send(200, result); next(); },
            reason => {
                console.log(reason);
                res.send(404);
                next();
            }
        );
    }
};

module.exports.RestifyGraphQL = RestifyGraphQL;

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
                    type: graphql.GraphQLInt,
                    description: 'Season ID'
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
                        }
                    },
                    resolve: (root, { id }) => {
                        return new Promise(function (resolve, reject) {
                            Doctor.forID(connection, id).then(
                                (value) => resolve(value),
                                (reason) => reject(reason)
                            );
                        })
                    },
                },
                director: {
                    type: directorType,
                    args: {
                        id: {
                            description: 'Director ID',
                            type: graphql.GraphQLID
                        }
                    },
                    resolve: (root, { id }) => {
                        return new Promise(function (resolve, reject) {
                            Director.forID(connection, id).then(
                                (value) => resolve(value),
                                (reason) => reject(reason)
                            );
                        })
                    }
                },
                writer: {
                    type: writerType,
                    args: {
                        id: {
                            description: 'Writer ID',
                            type: graphql.GraphQLID
                        }
                    },
                    resolve: (root, { id }) => {
                        return new Promise(function (resolve, reject) {
                            Writer.forID(connection, id).then(
                                (value) => resolve(value),
                                (reason) => reject(reason)
                            );
                        })
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
                                (value) => function (value) {
                                    value.season = value.seasonID;
                                    value.seasonID = undefined;
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

    server.get({ path: 'graphql', version: '1.0.0' }, RestifyGraphQL(schema));
}

