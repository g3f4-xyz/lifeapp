const HOST = process.env.HOST || 'http://localhost';
const PORT = process.env.PORT || 30000;
const GRAPHQL_ROUTE = '/graphql';
const PUBLIC_PATH = '/build';
const SESSION = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
};

module.exports = {
  GRAPHQL_ROUTE,
  HOST,
  PORT,
  PUBLIC_PATH,
  SESSION,
};
