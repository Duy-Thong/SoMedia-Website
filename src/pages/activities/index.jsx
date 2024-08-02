import React ,{useEffect} from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {
  dataabout,
  meta,
  worktimeline,
  skills,
  services,
  slides,
} from "../../content_option";
import Slide from "./activeslide";
import { Carousel } from "../../components/imageslide/index";
import { AnualActivities as Anual } from "./anualactive";
import FocusRing from "../../components/focusring"; // Import the FocusRing component

export const Activities = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const background = document.querySelector('.backgroundvideo img');
      const blur = scrollPosition * 0.005; // Làm mờ ảnh
      background.style.filter = `blur(${blur}px)`;
      
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Activities | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="backgroundvideo grain " >
          <img src="/tvc.jpg" alt="background" />
          
        </div>
        <Row className="mb-5 mt-3 pt-md-3" >
          <Col lg="12">
            <h1 className="display-4" style={{ textAlign: "left"}}>Our Activities</h1>
            <hr  />
          </Col>
        </Row>
        <Row className="mb-5 mt-3 pt-md-3 fade-in-top" >
            <Col lg="12" xl="12" className="slide">
              <Slide></Slide>
            </Col>
        </Row>
        <Row className="mb-5 mt-3 pt-md-3 fade-in-top" >
          <Anual />
        </Row>
      </Container>
    </HelmetProvider>
  );
};
