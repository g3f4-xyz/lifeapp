import cors from 'cors';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './graphql/schema';

const PORT = process.env.PORT || 30000;
const HOST = process.env.HOST || 'http://localhost';
const GRAPHQL_ROUTE = '/graphql';
const BUILD_PATH = '/build';

const server = express();

server.use(express.static(process.cwd() + BUILD_PATH));
server.use(GRAPHQL_ROUTE, cors(), graphQLHTTP(() => ({
  schema, pretty: true, graphiql: true,
})));
server.listen(PORT, () => console.log(
  `GraphQL server is now running on ${HOST}:${PORT}${GRAPHQL_ROUTE}`
));
