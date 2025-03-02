import { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';

export const useRecruitmentData = () => {
    const [recruitmentData, setRecruitmentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase();
                const recruitmentRef = ref(db, 'recruitmentpage');
                const snapshot = await get(recruitmentRef);

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    // Transform timeline object into array if it exists
                    if (data.timeline) {
                        const timelineArray = Object.entries(data.timeline)
                            .sort(([a], [b]) => parseInt(a) - parseInt(b)) // Sort by numeric keys
                            .map(([_, value]) => value);
                        data.timeline = timelineArray;
                    }
                    setRecruitmentData(data);
                }
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { recruitmentData, loading, error };
};
