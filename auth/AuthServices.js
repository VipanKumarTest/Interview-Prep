// AuthService.js
import { auth } from '../firebase/firebaseConfig';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from 'firebase/auth';

export const registerService = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const loginService = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logOutService = () => {
    return signOut(auth);
};

export const resetPasswordService = (email) => {
    return sendPasswordResetEmail(auth, email);
};