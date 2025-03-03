import { getDatabase, ref, get, set, push, remove } from 'firebase/database';

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
    const db = getDatabase();
    const departmentsRef = ref(db, 'departments');

    try {
        const snapshot = await get(departmentsRef);
        if (snapshot.exists()) {
            // Convert Firebase object to array
            return Object.entries(snapshot.val()).map(([key, value]) => ({
                key,
                ...value
            }));
        } else {
            console.log("No departments data available");
            return [];
        }
    } catch (error) {
        console.error("Error fetching departments:", error);
        throw error;
    }
};

// Add a new department to Firebase
export const addDepartment = async (departmentData) => {
    const db = getDatabase();
    const departmentsRef = ref(db, 'departments');

    try {
        await push(departmentsRef, departmentData);
        return true;
    } catch (error) {
        console.error("Error adding department:", error);
        throw error;
    }
};

// Update an existing department in Firebase
export const updateDepartment = async (departmentId, departmentData) => {
    const db = getDatabase();
    const departmentRef = ref(db, `departments/${departmentId}`);

    try {
        await set(departmentRef, departmentData);
        return true;
    } catch (error) {
        console.error("Error updating department:", error);
        throw error;
    }
};

// Delete a department from Firebase
export const deleteDepartment = async (departmentId) => {
    const db = getDatabase();
    const departmentRef = ref(db, `departments/${departmentId}`);

    try {
        await remove(departmentRef);
        return true;
    } catch (error) {
        console.error("Error deleting department:", error);
        throw error;
    }
};
