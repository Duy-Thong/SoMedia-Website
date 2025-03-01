import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    databaseURL: 'https://somedia-dbede-default-rtdb.asia-southeast1.firebasedatabase.app',
    // Add other Firebase config properties as needed
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
