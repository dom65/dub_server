import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import jwt from 'express-jwt';

import {
  JWT_SECRET
} from './config';
import sequelize from './data/models';

import {
  graphqlExpress,
  graphiqlExpress
} from 'apollo-server-express';
import {
  makeExecutableSchema
} from 'graphql-tools';

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
graphQLServer.use('*', cors({
  origin: '*',
  credentials: true
}));

// Media assets
graphQLServer.use(express.static('assets'));
// Public
graphQLServer.use(express.static('public'));

//File upload
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'assets/uploads')
  },
  filename: function(req, file, callback) {
    console.log(file)
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({storage: storage}).single('mediafile');
graphQLServer.post('/mediaupload', function(request, response) {
  upload(request, response, function(err) {
    if (err) {
      console.log('Error Occured');
      response.json({
        'error': 'Unable to Upload file'
      });
    }
    console.log(request.file);
    response.json({
      'fileName': request.file.originalname,
      'destination': 'uploads/' + request.file.filename,
    });
  })
});


// GraphQL
graphQLServer.use(GRAPHQL_PATH, bodyParser.json(),
  jwt({
    secret: JWT_SECRET,
    credentialsRequired: false
  }),
  graphqlExpress(req => ({
    schema: schema,
    context: {
      user: req.user ? sequelize.models.users.findOne({
          where: {
            id: req.user.id
          }
        }) :
        Promise.resolve(null),
    },
  }))
);

// GraphiQL
graphQLServer.use(GRAPHIQL_PATH, graphiqlExpress({
  endpointURL: GRAPHQL_PATH
}));


graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphQL is now running on http://localhost:${GRAPHQL_PORT}${GRAPHQL_PATH}`
  )
);
