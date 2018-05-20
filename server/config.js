const DEMO_USER = {
  id: '1234567890',
  displayName: 'Demo User',
};
const HOST = process.env.HOST || 'http://localhost:30000';
const PORT = process.env.PORT || 30000;
const DB_HOST = process.env.DB === 'remote' ? 'mongodb://mo1563_lifeapp:Gitara15@85.194.240.29:27017/mo1563_lifeapp' : 'mongodb://localhost/lifeapp';
const GRAPHQL_ROUTE = '/graphql';
const PUBLIC_PATH = '/build';
const SESSION = {
  secret: '#PNW&(RX#MIP&#7i',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true },
};

module.exports = {
  DEMO_USER,
  DB_HOST,
  GRAPHQL_ROUTE,
  HOST,
  PORT,
  PUBLIC_PATH,
  SESSION,
};
