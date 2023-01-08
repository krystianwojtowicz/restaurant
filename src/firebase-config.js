import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// require("dotenv").config();

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_API_ID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyB7pst-HN9BfYkS0I-Jcy8oRoYGAPOghEA",
//   authDomain: "restaurant-18a3a.firebaseapp.com",
//   projectId: "restaurant-18a3a",
//   storageBucket: "restaurant-18a3a.appspot.com",
//   messagingSenderId: "760338775468",
//   appId: "1:760338775468:web:a531353c01b37b7cf14e09",
//   measurementId: "G-C92FVQNMQM"
// };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
