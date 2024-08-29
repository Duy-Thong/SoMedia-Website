import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
    const [data, setData] = useState([]); // State to hold carousel data

    // Assuming `chairman` data is directly imported from a local file named `content_option.js`
    const fetchData = async () => {
        try {
            const response = await axios.get('https://sobackend.vercel.app/api/activity'); // Import data
            setData(response.data); // Set data from imported object
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
                    <img loading="lazy"className='imageslide'
                        src={item.actImg}
                        // alt={item.alt || 'Image'}
                    />
                    <Carousel.Caption className='caption'>
                        <h3 className='carouseltext'>{item.actName}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ControlledCarousel;