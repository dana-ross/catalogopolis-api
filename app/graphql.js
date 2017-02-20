var graphql = require('graphql'),
    Doctor = require('./doctor');

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

    var schema = new graphql.GraphQLSchema({
        query: new graphql.GraphQLObjectType({
            name: 'RootQueryType',
            fields: {
                doctor: {
                    type: doctorType,
                    args: {
                        id: {
                            description: 'Doctor ID',
                            type: graphql.GraphQLInt
                        }
                    },
                    resolve: (root, { id }) => {
                        return new Promise(function(resolve, reject) {
                            Doctor.forID(connection, id).then(
                                (value) => resolve(value),
                                (reason) => reject(reason)
                            );
                        })
                    },
                }
            }
        })
    });

    server.get({ path: 'graphql', version: '1.0.0' }, RestifyGraphQL(schema));
}

