import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'express-jwt';

import { JWT_SECRET } from './config';
import sequelize from './data/models';

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './data/typeDefs';
import resolvers from './data/resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers
});

const GRAPHQL_PATH = '/graphql';
const GRAPHIQL_PATH = '/graphiql';
const GRAPHQL_PORT = 3000;

const graphQLServer = express();

// Middlewares
graphQLServer.use(compression());

// Cors
graphQLServer.use('*', cors({ origin: 'http://192.168.1.3', credentials: true }));

// GraphQL
graphQLServer.use(GRAPHQL_PATH, bodyParser.json(),
                  jwt({secret: JWT_SECRET, credentialsRequired: false}),
                  graphqlExpress(req => ({
                    schema: schema,
                    context: { user: req.user ? sequelize.models.users.findOne({ where: { id: req.user.id } })
                                              : Promise.resolve(null),
                    },
                  }))
);

// GraphiQL
graphQLServer.use(GRAPHIQL_PATH, graphiqlExpress({ endpointURL: GRAPHQL_PATH }));


graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphQL is now running on http://localhost:${GRAPHQL_PORT}${GRAPHQL_PATH}`
  )
);

