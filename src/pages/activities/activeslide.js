import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
    const [data, setData] = useState([]); // State to hold carousel data

    const fetchData = async () => {
        try {
            const response = await import('../../content_option'); // Import data
            setData(response.slides); // Set data from imported object
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData(); // Fetch data on component mount
    }, []); // Empty dependency array to fetch data only once

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} className='carouselactive' >
            {data.map((item, i) => (
                <Carousel.Item key={i} >
                    <img loading="lazy" className='imageslide'
                        src={item.src}
                        alt={item.alt || 'Image'}
                    />
                    <Carousel.Caption className='caption'>
                        <h3 className='carouseltext'>{item.description}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ControlledCarousel;
