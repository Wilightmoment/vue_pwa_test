if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(reg => {
    // registration worked
    console.log('[Service Worker] Registration succeeded. Scope is ' + reg.scope)
    if ('Notification' in window) {
      console.log('Notification permission default status:', Notification.permission);
      Notification.requestPermission(function (status) {
        console.log('Notification permission status:', status);
        // displayNotification()
        subscribeUser(reg)
      });
    }
  }).catch(error => {
    // registration failed
    console.log('[Service Worker] Registration failed with ' + error)
  })
}

function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(reg => {
      var options = {
        icon: './assets/images/android_048.png',
        body: '歡迎加入 Angular 社群',
        image: 'https://augt-forum-upload.s3-ap-southeast-1.amazonaws.com/original/1X/6b3cd55281b7bedea101dc36a6ef24034806390b.png'
      };
      reg.showNotification('Angular User Group Taiwan', options);
      console.log('displayNotification');
    });
  }
}

const applicationServerPublicKey = `BDENawZdRFHfMQQa-LY9y1MfF43ySt5cat6jPlj1kIgOK3OaBzsqsRE8bsgUcut4LuB1Yxi9FbVs0tuw1CvNzZ8`;

function urlB64ToUint8Array(base64String) {
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
function subscribeUser(swRegistration) {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(subscription => {
      console.log('User is subscribed');
      console.log(JSON.stringify(subscription));
    })
    .catch(err => {
      console.log('Failed to subscribe the user: ', err);
    });
}