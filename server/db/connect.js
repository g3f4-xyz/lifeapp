const mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;
// assert.equal(query.exec().constructor, global.Promise);
mongoose.connect('mongodb://mo1563_lifeapp:Gitara15@85.194.240.29:27017/mo1563_lifeapp', { useMongoClient: true });
// mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(['MongoDB connected']);
});

module.exports = db;