/* global importScripts, firebase */
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js')

firebase.initializeApp({
  apiKey: "AIzaSyAa-4r8dF_RuWK0--FSJnYYYXVknTzzsZ0",
  authDomain: "school-iot-contest.firebaseapp.com",
  projectId: "school-iot-contest",
  storageBucket: "school-iot-contest.appspot.com",
  messagingSenderId: "331113331968",
  appId: "1:331113331968:web:a4d7de7f12bcbccdc787e5",
  measurementId: "G-550BXY4JQH"
})

firebase.messaging()