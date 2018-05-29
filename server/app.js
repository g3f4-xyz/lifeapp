const cors = require('cors');
const express = require('express');
const graphQLHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');

const router = require('./router');
const schema = require('./graphql/schema');
const { DEMO_USER, GRAPHQL_ROUTE, HOST, PORT, PUBLIC_PATH, SESSION } = require('./config');

// create server
const app = express();

// dev tools
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// set static folder
app.use(express.static(process.cwd() + PUBLIC_PATH));

// set body parser
app.use(bodyParser.json());

// express Session
app.use(session(SESSION));

// sassport init
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

// set Port
app.set('port', (process.env.PORT || PORT));

// Subscribe Route
app.post('/subscribe', (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({
    title: 'Welcome to LifeApp!',
    notification: {
      body: 'This notification is test. It will be send always after entering page if notifications were allowed on this page.',
      icon: 'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
    },
  });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

// set GraphQL
app.use(GRAPHQL_ROUTE, (req, res, next) => {
  console.log(['GRAPHQL:req.isAuthenticated()'], req.isAuthenticated());
  console.log(['GRAPHQL:req.session.id'], req.session && req.session.id);
  console.log(['GRAPHQL:req.session'], req.session);
  console.log(['GRAPHQL:req.user'], req.user);
  next();
}, cors(), graphQLHTTP(req => ({
  schema, pretty: true, graphiql: true, rootValue: { user: req.user || DEMO_USER },
})));

// start server
app.listen(app.get('port'), () => console.log(`GraphQL server is now running on ${HOST}${GRAPHQL_ROUTE}`));
