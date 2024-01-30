import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { activities, meta } from "../../content_option";

export const Activities = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Activities | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4 text-right" >Our Activities</h1>
            <hr className="t_border my-4 ml-0 text-right" />
          </Col>
        </Row>
        <div className="mb-5 po_items_ho active">
          {activities.map((data, i) => {
            return (
              <div key={i} className="po_item">
                <Row className="d-flex justify-content-between align-items-center">
                  <Col lg="4"className="image-col">
                    <img src={data.img} alt="" />
                  </Col>
                  <Col>
                    <p style={{color:"white"}}>{data.description}</p>
                  </Col>
                  <Col lg="8" className="text-col">
                    <div className="content">
                      <p>{data.description}</p>
                      <p>{ data.detail}</p>
                      <a href={data.link}>Take a look</a>
                    </div>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      </Container>
    </HelmetProvider>
  );
};
