import React, { useState, useEffect } from "react";
import { lazyWithPreload } from "react-lazy-with-preload";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import { database } from "../../firebase/config";
import { ref, get } from "firebase/database";

// Lazy load and preload the Activities component
const Activities = lazyWithPreload(() => import("../activities/activeslide"));
Activities.preload();

export const Home = () => {
  const [meta, setMeta] = useState({});
  const [introdata, setIntrodata] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const metaRef = ref(database, 'meta');
      const introdataRef = ref(database, 'introdata');

      try {
        const [metaSnapshot, introdataSnapshot] = await Promise.all([
          get(metaRef),
          get(introdataRef)
        ]);

        if (metaSnapshot.exists()) {
          setMeta(metaSnapshot.val());
        }
        if (introdataSnapshot.exists()) {
          setIntrodata(introdataSnapshot.val());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="backgroundvideo" id="backvideo">
          <video autoPlay loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: '-1' }}>
            <source src="/backgroundvideo.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 1 }}></div>
        </div>
        <div className="backgroundvideo" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}></div>
        <div className="introsec1">
          <div className="intro_sec d-block d-lg-flex align-items-center">
            <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center" style={{ marginTop: "100px" }}>
              <div className="align-self-center">
                <div className="intro mx-auto">
                  <h2 className="mb-1x">So Media</h2>
                  <h1 className="fluidz-48 mb-1x">
                    <Typewriter
                      options={{
                        strings: introdata.animated ? [
                          introdata.animated.first,
                          introdata.animated.second,
                          introdata.animated.third,
                          introdata.animated.fourth,
                        ] : [],
                        autoStart: true,
                        loop: true,
                        deleteSpeed: 10,
                      }}
                    />
                  </h1>
                  <p className="mb-1x breakword">{introdata.description}</p>
                  <div className="intro_btn-action pb-5">
                    <Link to="/contact">
                      <div id="button_h" className="ac_btn btn">
                        Contact Us
                        <div className="ring one"></div>
                        <div className="ring two"></div>
                        <div className="ring three"></div>
                      </div>
                    </Link>
                    <Link to="/recruitment" className="text_2">
                      <div id="button_p" className="ac_btn btn">
                        Apply Now!
                        <div className="ring one"></div>
                        <div className="ring two"></div>
                        <div className="ring three"></div>
                      </div>
                    </Link>
                  </div>
                  <p style={{ marginTop: "10px" }}>#So_Media</p>
                  <p style={{ marginTop: "-20px" }}>#khoanh_khac_dau_tien</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
