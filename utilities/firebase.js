const firebase = require("firebase");

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "software-engineering-3313.firebaseapp.com",
    databaseURL: "https://software-engineering-3313.firebaseio.com",
    projectId: "software-engineering-3313",
    storageBucket: "software-engineering-3313.appspot.com",
    messagingSenderId: "1076504190474"
  };

firebase.initializeApp(config);

module.exports = firebase;
