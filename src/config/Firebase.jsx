
import { initializeApp } from "firebase/app";

//authentication and google
import {getAuth} from 'firebase/auth'

//firestore
import {getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAaijQUz62-I1jFnrqcqUNt5tIuiDhhMWs",
    authDomain: "dones-dental-clinic.firebaseapp.com",
    projectId: "dones-dental-clinic",
    storageBucket: "dones-dental-clinic.appspot.com",
    messagingSenderId: "248191304214",
    appId: "1:248191304214:web:bc3336f8a607c636ba2b37",
    measurementId: "G-6MNXB3N12D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Auth
export const auth = getAuth(app);


//firestore
export const db = getFirestore(app);