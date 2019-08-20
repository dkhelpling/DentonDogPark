import firebase from "firebase";
import "firebase/firestore";

// firebase init goes here
const config = {
  apiKey: "AIzaSyDz9ooSYXtWJCG3zhbeGqNksZ971xK6IjU",
  authDomain: "dentondogpark.firebaseapp.com",
  databaseURL: "https://dentondogpark.firebaseio.com",
  projectId: "dentondogpark",
  storageBucket: "",
  messagingSenderId: "282461364015",
  appId: "1:282461364015:web:74a3d3bebe424bef"
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// firebase collection
const usersCollection = db.collection("users");

export { db, auth, currentUser, usersCollection };
