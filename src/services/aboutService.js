import { getDatabase, ref, get, set, push, remove } from 'firebase/database';
import { database } from "../firebase/config";

// Get About data from Firebase
export const getAboutData = async () => {
    const db = getDatabase();
    const aboutRef = ref(db, 'dataabout');

    try {
        const snapshot = await get(aboutRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
            return null;
        }
    } catch (error) {
        console.error("Error fetching about data:", error);
        throw error;
    }
};

// Update About data in Firebase
export const updateAboutData = async (data) => {
    const db = getDatabase();
    const aboutRef = ref(db, 'dataabout');

    try {
        await set(aboutRef, data);
        return true;
    } catch (error) {
        console.error("Error updating about data:", error);
        throw error;
    }
};

// Get departments list from Firebase
export const getDepartments = async () => {
    const departmentsRef = ref(database, 'departments');
    const snapshot = await get(departmentsRef);
    if (snapshot.exists()) {
        const departments = [];
        snapshot.forEach((childSnapshot) => {
            departments.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        return departments;
    }
    return [];
};

// Add a new department to Firebase
export const addDepartment = async (departmentData) => {
    const departmentsRef = ref(database, 'departments');
    const newDepartmentRef = push(departmentsRef);
    await set(newDepartmentRef, departmentData);
    return { id: newDepartmentRef.key, ...departmentData };
};

// Update an existing department in Firebase
export const updateDepartment = async (id, departmentData) => {
    const departmentRef = ref(database, `departments/${id}`);
    await set(departmentRef, departmentData);
    return { id, ...departmentData };
};

// Delete a department from Firebase
export const deleteDepartment = async (id) => {
    const departmentRef = ref(database, `departments/${id}`);
    await remove(departmentRef);
};
