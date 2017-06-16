const express = require('express');
const graphQLHTTP = require('express-graphql');
const schema =  require('./graphql/schema');

const PORT = process.env.PORT || 3000;

const server = express();

server.use(express.static(process.cwd() + '/build'));
server.use('/graphql', graphQLHTTP({ schema, pretty: true, graphiql: true }));
server.listen(PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${PORT}/graphql`
));
