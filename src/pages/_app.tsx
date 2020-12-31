import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import '../../styles/globals.scss'
import { firebaseCloudMessaging } from '../utils/web-push';
import firebase from 'firebase/app'

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    setToken()

    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          getMessage()
        }
      } catch (error) {
        console.log(error)
      }
    }

    function getMessage() {
      const messaging = firebase.messaging()
      messaging.onMessage((message) => console.log('foreground', message))
    }
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
