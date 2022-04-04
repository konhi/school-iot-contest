import { getMessaging, getToken } from 'firebase/messaging'
import { initializeApp} from 'firebase/app'
import localforage from 'localforage'

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return localforage.getItem('fcm_token')
  },

  init: async function () {
    const app = initializeApp({
      apiKey: "AIzaSyAa-4r8dF_RuWK0--FSJnYYYXVknTzzsZ0",
      authDomain: "school-iot-contest.firebaseapp.com",
      projectId: "school-iot-contest",
      storageBucket: "school-iot-contest.appspot.com",
      messagingSenderId: "331113331968",
      appId: "1:331113331968:web:a4d7de7f12bcbccdc787e5",
      measurementId: "G-550BXY4JQH"
    
    })

    try {
      if ((await this.tokenInlocalforage()) !== null) {
        return false
      }

      const messaging = getMessaging(app)
      await Notification.requestPermission()
      const token = await getToken(messaging, {
        vapidKey: 'BHp6_IZxH-aAvWigUsMTjvRMvmYnHGQxWUo_DU4xSBOycgxJEltC4Oey9aiAGnqHtul4pj0L7Y-vpNZdcoOlEn0'
      })

      localforage.setItem('fcm_token', token)
      console.log('fcm_token', token)
    } catch (error) {
      console.error(error)
    }
  },
}

export { firebaseCloudMessaging }