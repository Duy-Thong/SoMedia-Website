import React, { useState, useEffect } from 'react';
import './style.css';
const ImageSlider = ({ images, interval = 2000 }) => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, interval);

        return () => clearInterval(intervalId);
    }, [images, interval]);

    return (
        <div className="image-slider">
            {images.map((image, index) => (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img
                    key={index}
                    src={image}
                    alt={`image-${index}`}
                    className={index === currentImage ? 'visible' : 'hidden'}
                    style={{ objectFit: 'cover', height: '31%', width: '100%', position: 'absolute' }}
                />
            ))}
        </div>
    );
};

export default ImageSlider;
