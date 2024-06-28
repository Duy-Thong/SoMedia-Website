import React, { useState } from "react";
import "./style.css";
import { VscGrabber, VscClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { logotext, socialprofils } from "../content_option";
import Themetoggle from "../components/themetoggle";
import clublogo from "../assets/images/clblogo1.png";
const Headermain = () => {
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("ovhidden");
  };

  return (
    <>
      <header className="fixed-top site__header">
        <div className="d-flex align-items-center justify-content-between">
          {/* <img src={clublogo} alt="logo" style={{width:"5%"}} /> */}
          <Link className="navbar-brand nav_ac" to="/" >
            <img src={clublogo} alt="Club Logo" style={{ width: '2.5rem' }} />
            {/* {logotext} */}
          </Link>

          <div className="d-flex align-items-center" >
            <button className="menu__button  nav_ac" onClick={handleToggle}>
              {!isActive ? <VscClose /> : <VscGrabber />}
            </button>

          </div>
        </div>

        <div className={`site__navigation ${!isActive ? "menu__opend" : ""}`}>
          <div className="bg__menu h-100">
            <div className="menu__wrapper">
              <div className="menu__container p-3">
                <ul className="the_menu">
                  <li className="menu_item ">
                    <Link onClick={handleToggle} to="/" className="my-3">Home</Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/about" className="my-3"> About  </Link>
                  </li>
                  <li className="menu_item ">
                    <Link onClick={handleToggle} to="/activities" className="my-3">Activities</Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/projects" className="my-3">Projects</Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/contact" className="my-3"> Contact</Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/recruitment" className="my-3">Recruitment</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="menu_footer d-flex flex-column flex-md-row justify-content-between align-items-md-center position-absolute w-100 p-3">
            <div className="d-flex">
              <a href={socialprofils.facebook}>Facebook</a>
              <a href={socialprofils.youtube}>Youtube</a>
              <a href={socialprofils.instagram}>Instagram</a>
              <a href={socialprofils.tiktok}>Tiktok</a>
            </div>
            <p className="copyright m-0">copyright_{logotext}_2024</p>
          </div>
        </div>
      </header>
      <div className="br-top"></div>
      <div className="br-bottom"></div>
      <div className="br-left"></div>
      <div className="br-right"></div>

    </>
  );
};

export default Headermain;
