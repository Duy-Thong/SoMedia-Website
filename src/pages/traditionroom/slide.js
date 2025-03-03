import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { database } from '../../firebase/config';
import { ref, get } from 'firebase/database';
import './style.css'; // Import custom CSS

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
    const [data, setData] = useState([]); // State to hold carousel data

    const fetchData = async () => {
        try {
            const humansRef = ref(database, 'humans');
            const snapshot = await get(humansRef);
            if (snapshot.exists()) {
                const humansData = snapshot.val();
                setData(Object.values(humansData));
            }
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
        <Carousel activeIndex={index} onSelect={handleSelect} className='carouselroom'>
            {data.map((item, i) => (
                <Carousel.Item key={i} className='carousel-item'>
                    <div className="row">
                        <div className="col-md-6">
                            <img loading='lazy'
                                src={item.image}
                                alt={item.name || 'Image'}
                                className='imageactive1'
                            />
                        </div>
                        <div className="col-md-6" style={{ marginLeft: '0px' }}>
                            <div className="carousel-caption">
                                <h3>{item.name}</h3>
                                <h4>{item.description}</h4>
                                <p>{item.detail}</p>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ControlledCarousel;
