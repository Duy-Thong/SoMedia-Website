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

  return (
    <div id={load ? "preloader" : "preloader-none"}>
      <svg height="200" stroke="#FFFFFF" strokeWidth="1" className="text-line" width="100%">
        <text x="50%" y="40%" dominantBaseline="middle" textAnchor="middle" className="line1">#SoMedia</text>
        <text x="50%" y="80%" dominantBaseline="middle" textAnchor="middle" className="line2" >#Khoanh khac dau tien</text>
      </svg>
    </div>
  );
}

export default Pre;
