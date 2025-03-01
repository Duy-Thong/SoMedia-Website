import React, { useState, useEffect } from 'react';
import './style.css';
import { Container, Row, Col } from 'react-bootstrap';
import { database } from '../../firebase/config';
import { ref, get } from 'firebase/database';

export const AnualActivities = () => {
    const [activities, setActivities] = useState([]);
    const [isAnimated, setIsAnimated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch activities data from Firebase
    useEffect(() => {
        // Reference to the activitiesData in Firebase
        const activitiesRef = ref(database, 'activitiesData');

        // Fetch the data once
        get(activitiesRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    // Convert to array if it's an object with numeric keys
                    const activitiesArray = Array.isArray(data)
                        ? data
                        : Object.values(data);
                    setActivities(activitiesArray);
                } else {
                    console.log("No activities data available");
                    setActivities([]);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching activities data:", error);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        setIsAnimated(true);
    }, []);

    return (
        <div>
            <Container>
                <h2 className="text-center">Annual Activities</h2>
                <hr />
                {isLoading ? (
                    <div className="text-center">Loading activities...</div>
                ) : (
                    <Row>
                        {activities.map((activity, index) => (
                            <div key={index} className={`activity ${isAnimated ? "slide-in-left" : ""}`} >
                                <img loading="lazy" src={activity.img} alt={`Activity ${index + 1}`} className="imageactive black-and-white" />
                                <div className="textactive">
                                    <strong>{activity.time}:</strong> {activity.description}
                                </div>
                            </div>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
};
