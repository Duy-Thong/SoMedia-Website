import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { database } from '../../firebase/config';
import { ref, get } from 'firebase/database';

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const slidesRef = ref(database, 'slides');
            const snapshot = await get(slidesRef);

            if (snapshot.exists()) {
                const slidesData = snapshot.val();
                // Convert the object to an array if it's not already
                const slidesArray = Array.isArray(slidesData)
                    ? slidesData
                    : Object.values(slidesData);
                setData(slidesArray);
            } else {
                console.log("No data available");
                setData([]);
            }
            setError(null);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to load slides. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    if (loading) return <div className="text-center py-5">Loading slides...</div>;
    if (error) return <div className="text-center py-5 text-danger">{error}</div>;
    if (data.length === 0) return <div className="text-center py-5">No slides available</div>;

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} className='carouselactive'>
            {data.map((item, i) => (
                <Carousel.Item key={i}>
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
