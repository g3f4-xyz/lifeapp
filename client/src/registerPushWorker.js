const publicVapidKey = 'BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo';

(async () => {
  // Check for service worker
  if ('serviceWorker' in navigator) {
    // Register Service Worker
    console.log('Registering service worker...');
    const register = await navigator.serviceWorker.register('/worker.js', {
      scope: '/'
    });
    console.log('Service Worker Registered...');

    const subscription = await register.pushManager.getSubscription();

    if (subscription) {
      console.log('Subscription found');

      return null;
    }

    send(register).catch(err => console.error(err));
  }
})();

// Register SW, Register Push, Send Push
async function send(register) {
  // Register Push
  console.log('Registering Push...');
  const newSubscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log('Push Registered...');

  // Send Push Notification
  console.log('Sending Push...');
  await fetch('/notifications', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newSubscription),
  });
  console.log('Push Sent...');
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
