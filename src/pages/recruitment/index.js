import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col } from "react-bootstrap";
import Preloader from "../../components/preload/Pre";
import Camera from "../../assets/cam.png";
import SoftSkillicon from "../../assets/soft.png";
import { useRecruitmentData } from "../../hooks/useRecruitmentData";
import { Steps, Tooltip } from 'antd';

export const Recruit = () => {
  const { recruitmentData, loading, error } = useRecruitmentData();

  if (loading) return <Preloader />;
  if (error) return <div>Error loading recruitment data</div>;
  if (!recruitmentData) return <div>No recruitment data available</div>;

  const renderTimeline = () => {
    if (!recruitmentData?.timeline) return null;

    const lastIndex = recruitmentData.timeline.length - 1;

    return (
      <Steps
        current={lastIndex}
        progressDot
        style={{
          padding: '20px 0',
          width: '100%'
        }}
        items={recruitmentData.timeline.map((item) => ({
          status: 'finish',
          title: (
            <Tooltip title={item.description}>
              <div style={{ color: 'white' }}>
                <div>{item.name}</div>
                <small style={{ opacity: 0.8 }}>{item.time}</small>
              </div>
            </Tooltip>
          )
        }))}
      />
    );
  };

  return (
    <HelmetProvider>
      <Container style={{ color: 'white' }}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Recruitment | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="backgroundvideo" style={{ backgroundColor: 'rgba(0,0,0,1)' }}></div>
        <div className="backgroundvideo" id="backvideo" >
          <video autoPlay loop style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: '-1', bottom: '20px' }}>
            <source src="/TVC.mp4" type="video/mp4" />
          </video>
        </div>
        <Row className="mt-3 pt-md-3">
          <Col lg="12">
            <h1 className="display-4 mb-4" style={{ textAlign: "left", color: 'white' }}>Next Gen Recruitment</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="mb-5 pt-md-3">
          <Col lg="4" className="learninfor">
            <Row className="inforrow">
              <div className="text-container">
                <p>{recruitmentData.title1}</p>
                <br></br>
                <img loading="lazy" src={Camera} alt="Overlay 1" className="overlay-image1" />
              </div>
            </Row>
            <Row className="inforrow">
              <div className="text-container">
                <p>{recruitmentData.title2}</p>
                <img loading="lazy" src={SoftSkillicon} alt="Overlay 2" className="overlay-image2" />
              </div>
            </Row>
          </Col>
          <Col lg="8" className="rightcol">
            <Row>
              <h3 style={{ color: 'white' }}>Timeline</h3>
            </Row>
            <Row className="mb-0 mt-0">
              <div >
                {renderTimeline()}
              </div>
            </Row>
            <Row className="mt-3" >
              <Col lg="6" className="left_right_col">
                <a href={recruitmentData.applylink} className="text_2" target="_blank" rel="noopener noreferrer">
                  <div id="button_apply" className="ac_btn btn" >
                    Apply Now!
                    <div className="ring one"></div>
                    <div className="ring two"></div>
                    <div className="ring three"></div>
                  </div>
                </a>
              </Col>
              <Col lg="6" style={{ textAlign: 'center' }}>
                <p className="mt-3 mb-3" style={{ color: 'white' }}> Save QR !</p>
                <img
                  loading="lazy"
                  className="qrcode"
                  src={recruitmentData.qr}
                  alt="QR"
                  style={{ width: '150px', alignSelf: 'center' }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <script>
        document.getElementById('backvideo').play();
      </script>
    </HelmetProvider>
  );
};
