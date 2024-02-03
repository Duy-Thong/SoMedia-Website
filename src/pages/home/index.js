import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import home1 from "../../assets//images/home1.jpg";
import home2 from "../../assets//images/home2.jpg";
import home3 from "../../assets//images/home3.jpg";
import home4 from "../../assets//images/home4.jpg";
import home5 from "../../assets//images/home5.jpg";
import home6 from "../../assets//images/home6.jpg";
import ImageSlider from "./Imageslider";
export const Home = () => {
  const images1 = [home1, home2, home3];
  const images = [home3, home4, home5];

  const images2 = [home5, home6, home1];

  
  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title> {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="intro_sec d-block d-lg-flex align-items-center">
          <div className="h_bg-image order-1 order-lg-2 h-100 home-image image-slider">
            <Row style={{ paddingTop: "40px", marginTop: "0px", marginBottom: "0px" }}>
              <Col>
                <ImageSlider images={images} interval={5000} />
              </Col>
            </Row>
            <Row style={{ paddingTop: "230px", marginTop: "0px", marginBottom: "0px" }}>
              <Col>
                <ImageSlider images={images1} interval={5000} />
              </Col>
            </Row>
            <Row style={{ paddingTop: "230px", marginTop: "0px", marginBottom: "0px" }}>
              <Col>
                <ImageSlider images={images2} interval={5000} />
              </Col>
            </Row>
          </div>

          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center" style={{ marginTop: "100px" }}>
            <div className="align-self-center ">
              <div className="intro mx-auto">
                <h2 className="mb-1x">{introdata.title}</h2>
                <h1 className="fluidz-48 mb-1x" >
                  <Typewriter
                    options={{
                      strings: [
                        introdata.animated.first,
                        introdata.animated.second,
                        introdata.animated.third,
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 10,
                      
                    }}
                  />
                </h1>
                <p className="mb-1x">{introdata.description}</p>
                <div className="intro_btn-action pb-5">
                  <Link to="/projects" className="text_2">
                    <div id="button_p" className="ac_btn btn ">
                      Our Projects
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                  <Link to="/contact">
                    <div id="button_h" className="ac_btn btn">
                      Contact Us
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                </div>
                <p style={{ marginTop: "10px" }}>#So_Media</p>
                <p style={{marginTop:"-20px"}}>#khoanh_khac_dau_tien</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
