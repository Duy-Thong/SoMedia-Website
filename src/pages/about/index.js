import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  dataabout,
  meta,
  worktimeline,
  departments,
} from "../../content_option";
import { Carousel } from "../../components/imageslide/index";
export const About = () => {
  return (
    <HelmetProvider>

      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> About | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="backgroundvideo grain">
          <img src="/home9.jpg" alt="background" style={{ width: '100%', height: 'auto', filter: 'brightness(80%)' }} />        </div>
        <Row className="mb-5 mt-3 pt-md-3" style={{ alignItems: 'baseline' }}>
          <Col lg="6">
            <h1 className="display-4 mb-4" style={{ textAlign: "left" }}>About us</h1>
          </Col>
          <Col lg="6" className="text-right"> {/* Maintain text-right for right alignment */}
            <Link to="/traditionroom" className="text_2">
              <div id="button_b" className="ac_btn btn d-flex justify-content-end" >
                <div className="ring one"></div>
                <div className="ring two"></div>
                <div className="ring three"></div>
                <span className="buttontext">To Traditional Room</span>
              </div>
            </Link>
          </Col>
          <hr className="t_border my-4 ml-0 text-left" />
        </Row>

        <Row className="sec_sp">
          <Col lg="4">
            <h3 className="color_sec py-4">{dataabout.title}</h3>
          </Col>
          <Col lg="8" className="d-flex align-items-center">
            <div>
              <p>{dataabout.aboutme}</p>
            </div>
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="4">
            <h3 className="color_sec py-4">Goal</h3>
          </Col>
          <Col lg="8" className="d-flex align-items-center">
            <div>
              <p>{dataabout.goals}</p>
            </div>
          </Col>
        </Row>

        <Row className="sec_sp">
          <Col lang="4">
            <h3 className="color_sec py-4">4 Department</h3>
          </Col>
          <Col lg="8">
            {departments.map((data, i) => {
              return (
                <div className="service_ py-4" key={i}>
                  <h5 className="service__title">{data.name}</h5>
                  <p className="service_desc">{data.description}</p>
                </div>
              );
            })}
          </Col>
        </Row>
      </Container >

    </HelmetProvider >
  );
};
