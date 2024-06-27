import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {
  dataabout,
  meta,
  worktimeline,
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
          <title> Trandition Room | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="backgroundvideo">
          <img src="/home9.jpg" alt="background" />
        </div>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="12">
            <h1 className="display-4 mb-4 " style={{ textAlign: "left" }}>Trandition Room</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="mb-5 mt-3 pt-md-3" >

          <Col lg='4' xl='4' className="mt-5">
            <h2>Chairman</h2>
          </Col>
          <Col lg="8" xl="8" className="slideroom">
            <Slide></Slide>
          </Col>
        </Row>
      </Container>
    </HelmetProvider >
  );
};
