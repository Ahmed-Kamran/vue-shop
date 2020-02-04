import firebase from '@firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-auth';
import 'firebase/storage';
// require("firebase/firestore");
//   // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCBp9AyEKUolqKkbyTPV9XMbWsuOpSkNSo",
    authDomain: "vue-shop-ebb44.firebaseapp.com",
    databaseURL: "https://vue-shop-ebb44.firebaseio.com",
    projectId: "vue-shop-ebb44",
    storageBucket: "vue-shop-ebb44.appspot.com",
    messagingSenderId: "911103816531",
    appId: "1:911103816531:web:cbfbb17eae08d0d2b827a6",
    measurementId: "G-CVGLJE8X7N"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// firebase.analytics();

export { fb, db };
// </script>