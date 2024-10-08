import React from "react";
import { Route, Routes } from "react-router-dom";
import withRouter from "../hooks/withRouter"
import { Home } from "../pages/home";
import { Portfolio } from "../pages/portfolio";
import { ContactUs } from "../pages/contact";
import { About } from "../pages/about";
import { Socialicons } from "../components/socialicons";
import { Recruit } from "../pages/recruitment";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Activities } from "../pages/activities";
import { Tradition } from "../pages/traditionroom";
import { Contributors } from "../pages/contributors";
import FocusRing from "../components/focusring";

const AnimatedRoutes = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition
      key={location.key}
      timeout={{
        enter: 400,
        exit: 400,
      }}
      classNames="page"
      unmountOnExit
    >
      <Routes location={location}>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/projects" element={<Portfolio />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="*" element={<Home />} />
        <Route path="/recruitment" element={<Recruit />} />
        <Route path="/traditionalroom" element={<Tradition />} />
        <Route path="/contributors" element={<Contributors />} />
      </Routes>
    </CSSTransition>
  </TransitionGroup>
));

function AppRoutes() {
  return (

    <div className="s_c">
      <AnimatedRoutes />
      <Socialicons />
    </div>
  );
}

export default AppRoutes;
