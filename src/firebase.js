import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
    databaseURL: 'https://somedia-dbede-default-rtdb.asia-southeast1.firebasedatabase.app',
    // Add other Firebase config properties if needed (apiKey, authDomain, etc.)
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to fetch meta data
export const fetchMetaData = async () => {
    try {
        const metaRef = ref(database, 'meta');
        const snapshot = await get(metaRef);

        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No meta data available");
            return {};
        }
    } catch (error) {
        console.error("Error fetching meta data:", error);
        return {};
    }
};

export default database;
