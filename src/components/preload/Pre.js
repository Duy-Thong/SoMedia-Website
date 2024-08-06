import React, { useState, useEffect } from "react";
import "./style.css";

function Pre() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 2500);

    // Cleanup the timer if the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, []);

  return <div id={load ? "preloader" : "preloader-none"}></div>;
}

export default Pre;
