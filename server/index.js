
import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './graphql/schema';

const PORT = 3000;

const server = express();

server.use('/', graphQLHTTP({ schema, pretty: true, graphiql: true }));
server.listen(PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${PORT}`
));
