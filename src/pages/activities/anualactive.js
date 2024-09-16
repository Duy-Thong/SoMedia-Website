import React, { useState, useEffect } from 'react';
import './style.css';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';


export const AnualActivities = () => {
    const [data, setData] = useState([]);
    useEffect( function loadData(){
        async function fetchData() {
            try {
                const response = await axios.get('https://sobackend.vercel.app/api/annual', {
                    withCredentials: true,
                });
                setData(response.data);
            } catch(error) {
                console.error('Error fetching data:', error);
            }
            
        }
        fetchData();

    },[]);
    // useEffect to set initial state
    const [isAnimated, setIsAnimated] = useState(false);
    useEffect(() => {
        setIsAnimated(true);
    }, []);
    return (
        <div>
            <Container>
                <h2 className="text-center">Annual Activities</h2>
                <hr />
                <Row>
                    {data.map((data, index) => (
                        <div key={index} className={`activity ${isAnimated ? "slide-in-left" : ""}`} >
                            <img loading="lazy"src={data.annualImg} alt={`Activity ${index + 1}`} className="imageactive black-and-white" />
                            <div className="textactive">
                                <strong>{data.annualTime}:</strong> {data.annualName}
                            </div>
                        </div>
                    ))}
                </Row>
            </Container>
        </div>
    );
};