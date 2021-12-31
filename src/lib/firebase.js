import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyDmq3kZjcs8Umn0Fsw1YZwQa-G0NjCz4xk",
  authDomain: "instagram-clone-freecodecamp.firebaseapp.com",
  projectId: "instagram-clone-freecodecamp",
  storageBucket: "instagram-clone-freecodecamp.appspot.com",
  messagingSenderId: "208057030745",
  appId: "1:208057030745:web:002726d347573a56b8b948",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
