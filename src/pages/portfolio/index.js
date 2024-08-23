import React, { useEffect, useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { meta } from "../../content_option";
import backimg from "../../assets/images/home2.jpg";
import FocusRing from "../../components/focusring"; // Import the FocusRing component
import Preloader from "../../components/preload/Pre";
import axios from "axios";
export const Portfolio = () => {

  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const background = document.querySelector('.backgroundvideo img');
      const blur = scrollPosition * 0.01; // Làm mờ ảnh
      background.style.filter = `blur(${blur}px)`;

    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const [data,setData]=useState([]);
  useEffect(function loadingData() {
    async function fetchData() {
      try {
        const response = await axios.get('https://somediabackend.infinityfreeapp.com/api/project', {
          headers: {
            'Access-Control-Allow-Origin': '*', // or other content type you expect
             // if authentication is required
            // Add other headers as needed
          },
          withCredentials: true, // If your request needs to send credentials (e.g., cookies)
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  return (
    <HelmetProvider>
      <FocusRing />
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Projects | {meta.title} </title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
        <Preloader />
        <div className="backgroundvideo grain" >
          <img loading="lazy"src={backimg} alt="background" />
        </div>
        <Row className="mb-1 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Our Projects </h1>{" "}
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <div className="mb-5 po_items_ho fade-in-top">
          {data.map((data, i) => {
            return (
              <div key={i} className="po_item">
                <img loading="lazy"src={data.projectImg} alt="" />
                <div className="content">
                  <p>{data.projectName}</p>
                  <a href={data.projectLink} target="_blank" rel="noreferrer">View Project</a>
                </div>
              </div>
            );
          })}
        </div>
        <Row className="mb-1 mt-3 pt-md-3">

        </Row>
      </Container>
    </HelmetProvider>
  );
};
