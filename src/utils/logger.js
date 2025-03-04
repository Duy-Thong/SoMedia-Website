import { ref, push } from 'firebase/database';
import { database } from '../firebase/firebase.config';

export const logAction = (username, action) => {
    const logsRef = ref(database, 'logs');
    push(logsRef, {
        username,
        action,
        timestamp: Date.now()
    });
};
