import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDigFRsFXCnZloCyk4GkVRjnQ-XBDbzUmI",
  authDomain: "idea-box-1f66f.firebaseapp.com",
  projectId: "idea-box-1f66f",
  storageBucket: "idea-box-1f66f.appspot.com",
  messagingSenderId: "805771480593",
  appId: "1:805771480593:web:0a2e93f9389ca701f0ebb0"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, firebase, db};
