//used firebase as simple to implement and easy to scale as noSQL
//used for users (login system) and funds (keep track of amount invested)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7LRzZtVs68dPZA4uAorHVLHNROnDDkc4",
  authDomain: "cushon-isa.firebaseapp.com",
  projectId: "cushon-isa",
  storageBucket: "cushon-isa.appspot.com",
  messagingSenderId: "169338218687",
  appId: "1:169338218687:web:a36ba4d3bdbb42a3283e0a",
  measurementId: "G-8HT2RMZZQ1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export { app, auth, db };

