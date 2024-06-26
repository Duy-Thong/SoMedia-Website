import React, { useState, useEffect } from 'react';
import './style.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Container, Row, Col } from 'react-bootstrap';
import { activitiesData } from '../../content_option';

export const AnualActivities = () => {
    const [activities, setActivities] = useState([]);

    // useEffect to set initial state
    useEffect(() => {
        setActivities(activitiesData);
    }, []);

    return (
        <div>
            <Container>
                <h2 className="text-center">Annual Activities</h2>
                <hr />
                <Row style={{ width: "110%" }}>
                    {activities.map((activity, index) => (
                        <div key={index} className="activity">
                            <img src={activity.img} alt={`Activity ${index + 1}`} className="imageactive black-and-white" />
                            <div className="textactive">
                                <strong>{activity.time} :</strong> {activity.description}
                            </div>
                        </div>
                    ))}
                </Row>
            </Container>
        </div>
    );
};
