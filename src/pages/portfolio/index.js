import React, { useEffect, useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { meta } from "../../content_option";
import backimg from "../../assets/images/home2.jpg";
import FocusRing from "../../components/focusring";
import Preloader from "../../components/preload/Pre";
import { database } from "../../firebase/config";
import { ref, get } from "firebase/database";

export const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const dataRef = ref(database, 'dataportfolio');
        const snapshot = await get(dataRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          // Add console log to check data
          console.log("Portfolio data:", data);
          const dataArray = Array.isArray(data) ? data : Object.values(data);
          console.log("Converted array:", dataArray);
          setPortfolioData(dataArray);
        } else {
          setError("No portfolio data available");
        }
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
        setError("Failed to load portfolio data");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const background = document.querySelector('.backgroundvideo img');
      const blur = scrollPosition * 0.015;
      background.style.filter = `blur(${blur}px) brightness(0.6)`;
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
          <title> Projects | {meta.title} </title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Preloader />
        <div className="backgroundvideo grain" >
          <img loading="lazy" src={backimg} alt="background" />
        </div>
        <Row className="mb-1 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Our Projects </h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>

        {loading ? (
          <div className="text-center">Loading projects...</div>
        ) : error ? (
          <div className="text-center text-danger">{error}</div>
        ) : (
          <div className="mb-5 po_items_ho fade-in-top">
            {portfolioData.map((data, i) => (
              <div key={i} className="po_item">
                <img
                  loading="lazy"
                  src={data.img}
                  alt=""
                  onError={(e) => {
                    console.error(`Failed to load image: ${data.img}`);
                  }}
                />
                <div className="content">
                  <p>{data.description}</p>
                  <a href={data.link} target="_blank" rel="noreferrer">View Project</a>
                </div>
              </div>
            ))}
          </div>
        )}

        <Row className="mb-1 mt-3 pt-md-3">
        </Row>
      </Container>
    </HelmetProvider>
  );
};
