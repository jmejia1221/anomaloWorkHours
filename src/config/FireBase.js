import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC-nOlunMIfsD6P2ZI7Kp71Gi3mYG8HxtQ",
    authDomain: "anomalos-215ca.firebaseapp.com",
    databaseURL: "https://anomalos-215ca.firebaseio.com",
    projectId: "anomalos-215ca",
    storageBucket: "anomalos-215ca.appspot.com",
    messagingSenderId: "759864073893",
    appId: "1:759864073893:web:e5b4cdb5fe6f5d4dfcb74c",
    measurementId: "G-HLNM7SZGMG"
};

const fire = firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default fire;