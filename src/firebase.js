import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAE-jMMGRRqQfj-TUcdH_8AakIPrtsYkPE",
    authDomain: "react-node-project-73eec.firebaseapp.com",
    projectId: "react-node-project-73eec",
    storageBucket: "react-node-project-73eec.appspot.com",
    messagingSenderId: "956484184933",
    appId: "1:956484184933:web:c83cbc1d26bf0ad0cb8f8c",
    measurementId: "G-4NY9S9WH84"
}

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};