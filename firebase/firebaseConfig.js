import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAEdkSmt91WD2Yi68gMc-BHLedLoxzrRHE",
    authDomain: "interview-question-prep-a7693.firebaseapp.com",
    projectId: "interview-question-prep-a7693",
    storageBucket: "interview-question-prep-a7693.appspot.com",
    messagingSenderId: "466816868971",
    appId: "1:466816868971:web:90212d2586f1fa3ccac72e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db };