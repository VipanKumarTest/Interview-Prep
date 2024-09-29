import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';


const addOrUpdateUser = async (uid, userData) => {
    try {
        const userRef = doc(db, 'users', uid);
        await setDoc(userRef, userData, { merge: true });
        return true;
    } catch (error) {
        console.error('Error adding/updating user: ', error);
        throw error;
    }
};

const getUser = async (uid) => {
    try {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return userSnap.data();
        } else {
            console.log('No such user!');
            return null;
        }
    } catch (error) {
        console.error('Error getting user: ', error);
        throw error;
    }
};

const updateUser = async (uid, updates) => {
    try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, updates);
        return true;
    } catch (error) {
        console.error('Error updating user: ', error);
        throw error;
    }
};

const deleteUser = async (uid) => {
    try {
        const userRef = doc(db, 'users', uid);
        await deleteDoc(userRef);
        return true;
    } catch (error) {
        console.error('Error deleting user: ', error);
        throw error;
    }
};

export { addOrUpdateUser, getUser, updateUser, deleteUser };