// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
  
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAdO4TtjBtylCLxMLt3oHlG_fQs-frMGLs",
    authDomain: "tankkauslogi-132dd.firebaseapp.com",
    databaseURL: "https://tankkauslogi-132dd.firebaseio.com",
    projectId: "tankkauslogi-132dd",
    storageBucket: "tankkauslogi-132dd.appspot.com",
    messagingSenderId: "538990700702",
    appId: "1:538990700702:web:64a8854c323334ac18738f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
