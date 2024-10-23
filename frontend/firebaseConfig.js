// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDirO1ecjW1eBo2uBSSebx6M0f9UKn7STg",
    authDomain: "projectelder-8bfd9.firebaseapp.com",
    databaseURL: "https://projectelder-8bfd9-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "projectelder-8bfd9",
    storageBucket: "projectelder-8bfd9.appspot.com",
    messagingSenderId: "707624459326",
    appId: "1:707624459326:web:d7922ef33373a65d9d856f"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };
