import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

// firebase init goes here
const config = {
  apiKey: "****",
  authDomain: "dentondogpark.firebaseapp.com",
  databaseURL: "https://dentondogpark.firebaseio.com",
  projectId: "dentondogpark",
  storageBucket: "dentondogpark.appspot.com",
  messagingSenderId: "282461364015",
  appId: "1:282461364015:web:74a3d3bebe424bef"
};
const fb = firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// firebase collection
const usersCollection = db.collection("users");

export { fb, db, auth, currentUser, usersCollection };
