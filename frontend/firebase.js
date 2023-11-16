import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCBgOoCCJFUXzDZFzZlTCrEf7Sg-Cz6WCU",
    authDomain: "pizdaricks.firebaseapp.com",
    projectId: "pizdaricks",
    storageBucket: "pizdaricks.appspot.com",
    messagingSenderId: "967735293010",
    appId: "1:967735293010:web:d232c479ebb29a4b3bdb8b",
    measurementId: "G-M3R9DD3SJ5"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
