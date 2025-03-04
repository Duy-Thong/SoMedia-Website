import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, remove, update, query, orderByChild, serverTimestamp } from 'firebase/database';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCs40MX2TjRgAo4-WPwWHzefX4Ufe-kunM",
    authDomain: "somedia-dbede.firebaseapp.com",
    databaseURL: "https://somedia-dbede-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "somedia-dbede",
    storageBucket: "somedia-dbede.firebasestorage.app",
    messagingSenderId: "505579423185",
    appId: "1:505579423185:web:def117ed05b1b7fe1a8cf0",
    measurementId: "G-7M852P1CJZ"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const dbRef = ref;
export const dbSet = set;
export const dbGet = get;
export const dbRemove = remove;
export const dbUpdate = update;
export const dbQuery = query;
export const dbOrderByChild = orderByChild;
export const db = database;

// Log activity function
export const logActivity = async (username, action) => {
    const logRef = ref(database, 'logs');
    const newLogRef = ref(database, `logs/${Date.now()}`);
    await set(newLogRef, {
        username,
        action,
        timestamp: serverTimestamp()
    });
};

export {
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
};

export default database;
