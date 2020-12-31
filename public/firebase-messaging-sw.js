importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js')

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyC7CJVziCwZs4_-Gmc4-QcKtcA6k36dJpQ',
    authDomain: 'victor-assis-site.firebaseapp.com',
    projectId: 'victor-assis-site',
    storageBucket: 'victor-assis-site.appspot.com',
    messagingSenderId: '40639966978',
    appId: '1:40639966978:web:8400ce971f3f83a7741c1b'
  })
  const messaging = firebase.messaging()
  
  messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const { title, body } = payload.data
    // Customize notification here
    const notificationTitle = title || 'Nova notificação da CO3D'
    const notificationOptions = {
      body: body,
      icon: '/co-3d-logo.png'
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions)
  });
}
