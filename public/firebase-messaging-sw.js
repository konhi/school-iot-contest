/* global importScripts, firebase */
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAa-4r8dF_RuWK0--FSJnYYYXVknTzzsZ0",
  authDomain: "school-iot-contest.firebaseapp.com",
  projectId: "school-iot-contest",
  storageBucket: "school-iot-contest.appspot.com",
  messagingSenderId: "331113331968",
  appId: "1:331113331968:web:a4d7de7f12bcbccdc787e5",
  measurementId: "G-550BXY4JQH"
})

const messaging = firebase.messaging();

messaging.getToken({vapidKey: 'BHp6_IZxH-aAvWigUsMTjvRMvmYnHGQxWUo_DU4xSBOycgxJEltC4Oey9aiAGnqHtul4pj0L7Y-vpNZdcoOlEn0'}).then(token => console.log('Current Token is:' + token))