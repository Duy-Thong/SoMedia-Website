import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './style.css'; // Import custom CSS
import axios from 'axios';

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
    const [data, setData] = useState([]); // State to hold carousel data

    // Assuming `chairman` data is directly imported from a local file named `content_option.js`
    const fetchData = async () => {
        try {
            const response = await axios.get('http://somediabackend.com/api/humans') // Import data
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
        <Carousel activeIndex={index} onSelect={handleSelect} className='carouselroom'>
            {data.map((item, i) => (
                <Carousel.Item key={i} className='carousel-item'>
                    <div className="row">
                        <div className="col-md-6">
                            <img
                                src={item.tradiImg} // Assuming 'image' is still a part of the data
                                alt={item.tradiName || 'Image'}
                                className='imageactive1'
                            />
                        </div>
                        <div className="col-md-6" style={{ marginLeft: '0px' }}>
                            <div className="carousel-caption">
                                <h3>{item.tradiName}</h3> {/* Use tradiName */}
                                <h4>{item.tradiGen}</h4>   {/* Use tradiGen */}
                                <p>{item.tradiDetail}</p> {/* Use tradiDetail */}
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ControlledCarousel;
