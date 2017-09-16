import cors from 'cors';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './graphql/schema';

const PORT = process.env.PORT || 30000;

const server = express();

server.use(express.static(process.cwd() + '/build'));
server.use('/graphql', cors(), graphQLHTTP(() => ({
  schema, pretty: true, graphiql: true,
})));
server.listen(PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${PORT}/graphql`
));
