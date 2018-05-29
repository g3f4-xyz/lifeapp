const webpush = require('web-push');

module.exports = (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  const payload = JSON.stringify({
    title: 'Welcome to LifeApp!',
    notification: {
      body: 'This notification is test. It will be send always after entering page if notifications were allowed on this page.',
      icon: 'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
    },
  });

  // Pass subscription into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
};
