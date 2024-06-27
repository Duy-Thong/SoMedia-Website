import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {
  dataabout,
  meta,
  Prizes,
  departments,
  chairman,
} from "../../content_option";
import Slide from "./slide";

export const Trandition = () => {
  return (
    <HelmetProvider>

      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Traditional Room | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="backgroundvideo">
          <img src="/home9.jpg" alt="background" style={{ filter: 'blur(3px)' }} />
        </div>
        <Row className="mb-0 mt-3 pt-md-3">
          <Col lg="12">
            <h1 className="display-4 mb-4 " style={{ textAlign: "left" }}>Traditional Room</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="mt-0 mb-3 " >
          <Row className="mb-5">
            <span className="text-center"> <h2>Humans of So Media</h2></span>
          </Row>
          <Row className="mt-3">
            <Col lg="12" xl="12" className="slideroom">
              <Slide></Slide>
            </Col>
          </Row>
          <hr className="t_border my-4 ml-0 text-left" />
        </Row>
        <Row className="mb-5 mt-3 pt-md-3">
          <h2 className="text-center"> Prizes </h2>
          <Row className="mt-3">
            {Prizes.map((prize, index) => (
              <Col lg="4" xl="4" className="prize" key={index}>
                <h4>{prize.jobtitle}</h4>
                <p>{prize.where}</p>
                <p>{prize.date}</p>
              </Col>
            ))}
          </Row>
        </Row>
      </Container>
    </HelmetProvider >
  );
};
