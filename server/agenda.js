const Agenda = require('agenda');
const webPush = require('web-push');
const { DB_HOST } = require('./config');

let agenda = new Agenda({ db: { address: DB_HOST } });

agenda.define('notification', async (job, done) => {
  console.log(['agenda:job:notification'], job.attrs);
  const { getSubscriptions } = require('./db/api');
  const { ownerId, notification: { body, title } } = job.attrs.data;
  const payload = JSON.stringify({
    title,
    notification: {
      body,
      icon: 'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
    },
  });

  const subscriptions = await getSubscriptions(ownerId);

  subscriptions.map(({ subscription }) => {
    webPush
      .sendNotification(subscription, payload)
      .catch(err => console.error(err));
  });

  done();
});

agenda.on('ready', () => {
  console.log(['agenda:ready']);
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
  schedule: (when, job, data, callback) => {
    console.log(['agenda:schedule'], when, job, data, callback);

    return agenda.schedule(when, job, data, callback);
  },
};
