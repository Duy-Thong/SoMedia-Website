import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
    const [data, setData] = useState([]); 

    
    const fetchData = async () => {
        try {
            const response = await axios.get('https://sobackend.vercel.app/api/activity'); 
            setData(response.data); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData(); 
    }, []); 

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} className='carouselactive' >
            {data.map((item, i) => (
                <Carousel.Item key={i} >
                    <img loading="lazy"className='imageslide'
                        src={item.actImg}
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