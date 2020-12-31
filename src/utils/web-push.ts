import 'firebase/messaging'
import firebase from 'firebase/app'
import localforage from 'localforage'

const firebaseCloudMessaging = {
  //checking whether token is available in indexed DB
  tokenInlocalforage: async () => {
    return localforage.getItem('fcm_token')
  },
  //initializing firebase app
  init: async function () {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyC7CJVziCwZs4_-Gmc4-QcKtcA6k36dJpQ',
        authDomain: 'victor-assis-site.firebaseapp.com',
        projectId: 'victor-assis-site',
        storageBucket: 'victor-assis-site.appspot.com',
        messagingSenderId: '40639966978',
        appId: '1:40639966978:web:8400ce971f3f83a7741c1b'
      })
      try {
        const messaging = firebase.messaging()
        const tokenInLocalForage = await this.tokenInlocalforage()
        //if FCM token is already there just return the token
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage
        }
        //requesting notification permission from browser
        const status = await Notification.requestPermission()
        if (status && status === 'granted') {
          //getting token from FCM
          const fcm_token = await messaging.getToken()
          if (fcm_token) {
            //setting FCM token in indexed db using localforage
            localforage.setItem('fcm_token', fcm_token)
            console.log('fcm token', fcm_token)
            //return the FCM token after saving it
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error)
        return null
      }
    }
  }
}

export { firebaseCloudMessaging }