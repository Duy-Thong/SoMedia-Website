import { Carousel } from "../../components/imageslide/index";
import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { meta } from "../../content_option";
import Slide from "./activeslide";
import { AnualActivities as Anual } from "./anualactive";
import FocusRing from "../../components/focusring"; // Import the FocusRing component
import Preloader from "../../components/preload/Pre";
import tvc from "../../assets/images/tvc.jpg";

export const Activities = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const preloadTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Adjust this time to match your preload duration

    // Scroll event for the blur effect
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const background = document.querySelector('.backgroundvideo img');

      if (background) {
        const blur = scrollPosition * 0.005; // Làm mờ ảnh
        background.style.filter = `blur(${blur}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(preloadTimeout); // Clear timeout if the component unmounts
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <HelmetProvider>
      <FocusRing />
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Activities | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        {isLoading && <Preloader />} {/* Show Preloader if loading */}
        
        {!isLoading && ( /* Hide Preloader and show content when loading is complete */
          <>
            <div className="backgroundvideo grain">
              <img src={tvc} alt="background" />
            </div>
            <Row className="mb-5 mt-3 pt-md-3">
              <Col lg="12">
                <h1 className="display-4" style={{ textAlign: "left" }}>
                  Our Activities
                </h1>
                <hr />
              </Col>
            </Row>
            <Row className="mb-5 mt-3 pt-md-3">
              <Col lg="12" xl="12" className="slide">
                <Slide />
              </Col>
            </Row>
            <Row className="mb-5 mt-3 pt-md-3">
              <Anual />
            </Row>
          </>
        )}
      </Container>
    </HelmetProvider>
  );
};
