// Import React and necessary hooks
import React, { useEffect, useState } from "react";
// Import necessary components and styles
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css"; // Make sure this includes the CSS for animations
import { FaArrowCircleRight, FaRegHeart } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";
import { PiPaperPlaneTilt, PiHeartStraightFill } from "react-icons/pi";

import home9 from "../../assets/images/home9.jpg";
// Import Firebase database
import { database } from "../../firebase/config";
import { ref, get } from "firebase/database";
// Import fallback data
import { dataabout as fallbackDataAbout, meta as fallbackMeta, departments as fallbackDepartments } from "../../content_option";
import FocusRing from "../../components/focusring"; // Import the FocusRing component
import Preloader from "../../components/preload/Pre";

// Define the About component
export const About = () => {
  // State for data
  const [dataabout, setDataabout] = useState(fallbackDataAbout);
  const [meta, setMeta] = useState(fallbackMeta);
  const [departments, setDepartments] = useState(fallbackDepartments);
  const [loading, setLoading] = useState(true);

  // Fetch data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dataabout
        const dataaboutRef = ref(database, 'dataabout');
        const dataaboutSnapshot = await get(dataaboutRef);

        if (dataaboutSnapshot.exists()) {
          setDataabout(dataaboutSnapshot.val());
        }

        // Fetch meta
        const metaRef = ref(database, 'meta');
        const metaSnapshot = await get(metaRef);

        if (metaSnapshot.exists()) {
          setMeta(metaSnapshot.val());
        }

        // Fetch departments
        const departmentsRef = ref(database, 'departments');
        const departmentsSnapshot = await get(departmentsRef);

        if (departmentsSnapshot.exists()) {
          const departmentsData = [];
          departmentsSnapshot.forEach((childSnapshot) => {
            departmentsData.push(childSnapshot.val());
          });
          setDepartments(departmentsData);
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const background = document.querySelector('.backgroundvideo img');
      if (background) {
        const blur = scrollPosition * 0.015; // Làm mờ ảnh
        background.style.filter = `blur(${blur}px) brightness(0.6)`; // Làm mờ ảnh
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // State to control when animations are added
  const [isAnimated, setIsAnimated] = useState(false);

  // Use useEffect to trigger animations when component mounts
  useEffect(() => {
    setIsAnimated(true);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <HelmetProvider>
      <FocusRing />

      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title>About | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        <div className="backgroundvideo grain">
          <img loading="lazy" src={home9} alt="background" />
        </div>

        <Row className={`mb-0 mt-3 pt-md-3 ${isAnimated ? "slide-in-left" : ""}`} style={{ alignItems: 'baseline' }}>
          <Col lg="6">
            <h1 className="display-4 mb-4" style={{ textAlign: "left" }}>About us</h1>
          </Col>
          <Col lg="6" className="text-right">
            <Link to="/traditionalroom" className="text_2">
              <div id="button_p" className="ac_btn btn d-flex justify-content-end">
                <div className="ring one"></div>
                <div className="ring two"></div>
                <div className="ring three"></div>
                <span className="buttontext">To Traditional Room <FaArrowCircleRight /></span>
              </div>
            </Link>
          </Col>
        </Row>

        <hr className="mt-3"></hr>

        <Row className={`sec_sp ${isAnimated ? "slide-in-right" : ""}`} style={{ marginTop: '10px', marginBottom: '20px' }}>
          <Col lg="4">
            <h3 className="color_sec py-4">{dataabout.title}</h3>
          </Col>
          <Col lg="8" className="d-flex align-items-center">
            <div>
              <p className="breakword">{dataabout.aboutme}</p>
            </div>
          </Col>
        </Row>

        <Row className={`sec_sp ${isAnimated ? "slide-in-left" : ""}`} style={{ marginTop: '10px', marginBottom: '20px' }}>
          <Col lg="4">
            <h3 className="color_sec py-4">Goals</h3>
          </Col>
          <Col lg="8">
            <p className="breakword">{dataabout.goals}</p>
          </Col>
        </Row>

        <Row className={`sec_sp ${isAnimated ? "slide-in-right" : ""}`}>
          <Row>
            <h3 className="color_sec py-4">4 Departments</h3>
          </Row>
          <Row className="cards">
            {departments.map((department, index) => (
              <Col xs="12" sm="6" md="6" lg="6" xl="6" key={index} className="mb-4">
                <div className="card">
                  <div className="card-img">
                    <img className="img" src={department.image} alt={department.name} />
                  </div>
                  <div className="card-title">{department.name}</div>
                  <div className="card-subtitle">{department.description}</div>

                  <div className="card-footer">
                    <HeartIcon />
                    <TbMessageCircle className="icon" />
                    <PiPaperPlaneTilt className="icon" />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Row>

        <Row className="mt-3 mb-3"></Row>
      </Container>
    </HelmetProvider>
  );
};

// HeartIcon component with toggle functionality
const HeartIcon = () => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <span onClick={toggleLike} style={{ cursor: "pointer" }}>
      {isLiked ? (
        <PiHeartStraightFill color="red" className="icon" />
      ) : (
        <FaRegHeart className="icon" />
      )}
    </span>
  );
};

export default About;
