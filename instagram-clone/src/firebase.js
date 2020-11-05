import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyATvKCWS7_KxrYZDdjP30-KOk_fs1V2IdY",
    authDomain: "instagramia.firebaseapp.com",
    databaseURL: "https://instagramia.firebaseio.com",
    projectId: "instagramia",
    storageBucket: "instagramia.appspot.com",
    messagingSenderId: "367874954883",
    appId: "1:367874954883:web:2150e6b07721638ea9edb6",
    measurementId: "G-ZMZT31VB67"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };