import React, { useEffect } from 'react';
import './focusring.css';
import focusring from "../../assets/focusring.png";
const FocusRing = () => {
  useEffect(() => {  
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const focusRing = document.querySelector('.focus-ring');
       
      const rotation = scrollPosition * 0.1; // Adjust the rotation speed
      focusRing.style.transform = `rotate(${rotation}deg)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
      <div className="focus-ring-container">
         
      <img loading="lazy"src={focusring} alt="Focus Ring" className="focus-ring" />
    </div>
  );
};

export default FocusRing;
