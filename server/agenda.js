const Agenda = require('agenda');
const { DB_HOST } = require('./config');

let agenda = new Agenda({ db: { address: DB_HOST } });

agenda.define('notification', (job, done) => {
  console.log(['notification job'], job.attrs);
  // w tym miejscu nastąpi wykorzystanie web-push do wysłąnia notyfikacji
  done();
});

agenda.on('ready', () => {
  console.log('Agenda ready');
  agenda.start();
});

const graceful = () => {
  agenda.stop(() => {
    process.exit(0);
  });
};

process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);

module.exports = {
  schedule: (when, job, data) => agenda.schedule(when, job, data),
};
