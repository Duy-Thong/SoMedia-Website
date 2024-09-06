import React, { useEffect } from "react";
import "./style.scss";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { contributors, meta } from "../../content_option";
import backimg from "../../assets/images/home2.jpg";
import FocusRing from "../../components/focusring"; // Import the FocusRing component
import Preloader from "../../components/preload/Pre";
import { BsGithub } from "react-icons/bs";
import { IoLogoReact } from "react-icons/io5";
import { FaPhp } from "react-icons/fa";
import { IoLogoVercel } from "react-icons/io5";
import scroll from "../../assets/scroll.jpg";
export const Contributors = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const background = document.querySelector('.backgroundvideo img');
      const blur = scrollPosition * 0.015; // Làm  mờ ảnh
      background.style.filter = `blur(${blur}px) brightness(0.6)`; // Làm mờ ảnh

    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <HelmetProvider>
      <FocusRing />
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Contributors | {meta.title} </title>{" "}
          <meta name="description" content="Page sieu cap vjp pro" />
        </Helmet>
        <Preloader />
        <div className="backgroundvideo" >
          <div id="stars-container">
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
          </div>
        </div>
        <Row className="mb-1 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4 text-left" > Special thanks to </h1>{" "}
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <div className="mb-5 contributors fade-in-top">
          {contributors.map((data, i) => {
            return (
              <div key={i} className="po_item contributorcard">
                <img loading="lazy" src={data.image} alt="" />
                <div className="content">
                  <h3 style={{ fontSize: '20px' }}>{data.name}</h3>
                  <p style={{ fontSize: '15px' }}>{data.description}</p>
                  <a className="githublink" href={data.github}><BsGithub /></a>
                </div>
              </div>
            );
          })}
        </div>
        <Row className="mb-1 mt-3 pt-md-3">
          <h2 className="display-4 mb-4 text-center" >Technology used </h2>
          <Row >
            <Col lg="4" className="text-center">
              <IoLogoReact style={{ fontSize: '100px' }} />
            </Col>

            <Col lg="4" className="text-center">
              <FaPhp style={{ fontSize: '100px' }} />
            </Col>
            <Col lg="4" className="text-center">
              <IoLogoVercel style={{ fontSize: '100px' }} />
            </Col>
          </Row>
        </Row>
        <div className="scroll">
          <img src={scroll} alt="scroll" />
        </div>
      </Container>
    </HelmetProvider>
  );
};
