const cors = require('cors');
const express = require('express');
const graphQLHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const { GRAPHQL_ROUTE, HOST, PORT } = require('./config');
const router = require('./router');

const app = express();

app.use('/', router);
app.use(GRAPHQL_ROUTE, cors(), graphQLHTTP(() => ({
  schema, pretty: true, graphiql: true,
})));

app.listen(PORT, () => console.log(`GraphQL server is now running on ${HOST}${GRAPHQL_ROUTE}`));
