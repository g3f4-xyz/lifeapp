const cors = require('cors');
const express = require('express');
const graphQLHTTP = require('express-graphql');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');

const router = require('./router');
const schema = require('./graphql/schema');
const { GRAPHQL_ROUTE, HOST, PORT, PUBLIC_PATH, SESSION } = require('./config');

// create server
const app = express();

// dev tools
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// set static folder
app.use(express.static(process.cwd() + PUBLIC_PATH));

// express Session
app.use(session(SESSION));

// sassport init
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

// set Port
app.set('port', (process.env.PORT || PORT));

// set GraphQL
app.use(GRAPHQL_ROUTE, (req, res, next) => {
  console.log(['GRAPHQL:req.isAuthenticated()'], req.isAuthenticated());
  console.log(['GRAPHQL:req.cookies'], req.cookies);
  console.log(['GRAPHQL:req.session'], req.session);
  console.log(['GRAPHQL:req.user'], req.user);
  console.log(['GRAPHQL:req.session.id'], req.session && req.session.id);
  next();
}, cors(), graphQLHTTP(request => ({
  schema, pretty: true, graphiql: true, rootValue: { session: request.session },
})));

// start server
app.listen(app.get('port'), () => console.log(`GraphQL server is now running on ${HOST}${GRAPHQL_ROUTE}`));
