const cors = require('cors');
const express = require('express');
const graphQLHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./graphql/schema');

// Use native promises
mongoose.Promise = global.Promise;
// assert.equal(query.exec().constructor, global.Promise);
mongoose.connect('mongodb://mo1563_lifeapp:Gitara15@85.194.240.29:27017/mo1563_lifeapp', { useMongoClient: true });
// mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

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

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(['MongoDB connected']);
});
