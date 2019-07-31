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

// firebase collections
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

export {
  db,
  auth,
  currentUser,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
};
