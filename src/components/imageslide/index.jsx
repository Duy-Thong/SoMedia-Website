import React, { useState,useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { Row, Col } from "react-bootstrap";
import "./style.css";

export const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
  setSlide(slide === data.length - 1 ? 0 : slide + 1);
};

const prevSlide = () => {
  setSlide(slide === 0 ? data.length - 1 : slide - 1);
};

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval); // Clear the interval on component unmount

  }, [slide]);
  return (
    <div className="carousel" >
      <Row className="carousel-content"  >
        {data.map((item, idx) => (
          <Col key={idx} lg="12">
            <div className={slide === idx ? "slide" : "slide slide-hidden" } >
              <Row>
                <Col lg="6">
                  <img
              src={item.src}
              alt={item.alt}
              style={{ width: "100%",height: "350px",objectFit:"cover" }}
            />
                </Col>
                <Col lg="6" xs="12" className="description">
                    <p>{item.description}</p>
                </Col>

              </Row>
            </div>
          </Col>
        ))}
          </Row>
    <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
      <BsArrowRightCircleFill
        onClick={nextSlide}
        className="arrow arrow-right"
      />
      
      </div>
      
  );
};