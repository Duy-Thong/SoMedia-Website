import React from "react";
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
import { Carousel } from "../../components/imageslide/index";
export const Activities = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Activities | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="12">
            <h1 className="display-4 mb-4 " style={{ textAlign: "left",marginTop:"-20px" }}>Our Activities</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row >
            <Col lg="12" xl="12">
                <Carousel data={slides} />
            </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
