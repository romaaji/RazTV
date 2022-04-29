import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth'


const app = firebase.initializeApp({
    apiKey: "YOUR FIREBASE APP",
    authDomain: "YOUR FIREBASE APP",
    databaseURL: "YOUR FIREBASE APP",
    projectId: "YOUR FIREBASE APP",
    storageBucket: "YOUR FIREBASE APP",
    messagingSenderId: "YOUR FIREBASE APP",
    appId: "YOUR FIREBASE APP"
})

export const auth = app.auth();
export const storage = firebase.storage();
export const emailAuthProvider = firebase.auth.EmailAuthProvider;

export default app;
