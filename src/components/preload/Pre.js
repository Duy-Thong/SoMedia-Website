import React, { useState, useEffect } from "react";
import "./style.css";

function Pre() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 2300);

    // Cleanup the timer if the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id={load ? "preloader" : "preloader-none"}>
      <svg height="100" stroke="#FFFFFF" stroke-width="2" className="text-line" width="100%">
        <text x="50%" dominant-baseline="middle" text-anchor="middle" y="50%">#So Media</text>
      </svg>
    </div>
  );

}

export default Pre;
