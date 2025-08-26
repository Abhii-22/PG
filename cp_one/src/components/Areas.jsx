import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Wifi, Tv, Refrigerator, WashingMachine } from 'lucide-react';
import './Areas.css';
import staticAreasData from '../data/pgData';


const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const Areas = () => {
  const [areasData, setAreasData] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedPg, setSelectedPg] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const location = useLocation();

    useEffect(() => {
    const fetchPgsAndConstructAreas = async () => {
      try {
        const response = await axios.get('/api/pgs');
        const pgs = response.data;

        const pgsByArea = pgs.reduce((acc, pg) => {
          const areaName = pg.area;
          if (!acc[areaName]) {
            acc[areaName] = [];
          }
          acc[areaName].push(pg);
          return acc;
        }, {});

        const dynamicAreasData = staticAreasData.map(area => ({
          ...area,
          pgs: pgsByArea[area.name] || []
        }));

        setAreasData(dynamicAreasData);

      } catch (error) {
        console.error('Error fetching PGs:', error);
      }
    };

    fetchPgsAndConstructAreas();
  }, []);

  useEffect(() => {
    if (location.state?.searchQuery) {
      const query = location.state.searchQuery.toLowerCase();
      const matchedArea = areasData.find(area => area.name.toLowerCase() === query);
      if (matchedArea) {
        setSelectedArea(matchedArea);
      }
    }
  }, [location.state]);

  const handleSelectArea = (area) => setSelectedArea(area);
  const handleBackToAreas = () => setSelectedArea(null);

  const handleSelectPg = (pg) => {
    setSelectedPg(pg);
    setCurrentImage(0); // Reset to the first image when a new PG is selected
  };
  const handleBackToPgs = () => setSelectedPg(null);

  const renderFacilityIcon = (facility) => {
    switch (facility) {
      case 'Wifi': return <Wifi size={20} />;
      case 'TV': return <Tv size={20} />;
      case 'Refrigerator': return <Refrigerator size={20} />;
      case 'Washing Machine': return <WashingMachine size={20} />;
      default: return null;
    }
  };

  return (
    <div id="areas" className="container mt-5 pt-0">
      <AnimatePresence mode="wait">
        {!selectedArea && !selectedPg && (
          <motion.div
            key="areas-list"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <h2 className="text-center text-primary fw-bold mt-5 mb-5">Explore Our Localities</h2>
            <div className="area-grid">
              {areasData.map((area) => (
                <motion.div
                  key={area.name}
                  className="area-card-container"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  onClick={() => handleSelectArea(area)}
                >
                  <div className="area-card">
                    <img src={area.image} alt={area.name} className="area-image" />
                    <div className="area-card-overlay">
                      <h3 className="area-card-name">{area.name}</h3>
                    </div>
                  </div>
                  <div className="area-details">
                    <div className="area-features">
                      <h5>Features</h5>
                      <ul>
                        {area.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="area-famous">
                      <h5>Famous For</h5>
                      <ul>
                        {area.famous.map((place, index) => (
                          <li key={index}>{place}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedArea && !selectedPg && (
          <motion.div
            key="pg-list"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <div className="pg-header">
              <button onClick={handleBackToAreas} className="back-button">
                <ArrowLeft size={20} /> Back to Areas
              </button>
            </div>
            <h2 className="text-center text-primary fw-bold mt-4 mb-5">PGs in {selectedArea.name}</h2>
            <div className="pg-list-detailed">
              {selectedArea.pgs.map((pg) => (
                <motion.div
                  key={pg.id}
                  className="pg-detailed-card"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {pg.images && pg.images.length > 0 && (
                    <img src={pg.images[0]} alt={pg.name} className="pg-card-image" onClick={() => handleSelectPg(pg)} />
                  )}
                  <div className={`pg-detailed-info ${!pg.images || pg.images.length === 0 ? 'no-image' : ''}`}>
                    <div className="pg-detailed-header">
                      <span className="pg-price">₹{pg.price.toLocaleString()}/month</span>
                      <span className="pg-sharing">{pg.sharing} Sharing</span>
                      <div className="pg-rating">
                        {pg.rating.toFixed(1)} <Star size={16} className="star-icon" />
                      </div>
                    </div>
                    <h3 className="pg-detailed-name">{pg.name}</h3>
                    <p className="pg-location">{pg.location}</p>
                    <p className="pg-description">{pg.description}</p>
                    <div className="pg-facilities">
                      <h4 className="facilities-title">What we offer</h4>
                      <div className="facilities-grid">
                        {pg.facilities.map(facility => (
                          <div key={facility} className="facility-item">
                            {renderFacilityIcon(facility)}
                            <span>{facility}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pg-detailed-footer">
                      <div className="d-flex justify-content-start">
                        <a href="#contact-us" className="btn btn-danger">contact now</a>
                        <a href={`/register?pgId=${pg._id}`} className="btn btn-success ms-2">Book Now</a>
                      </div>
                      <span className={`gender-tag ${pg.gender.toLowerCase()}`}>{pg.gender}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedPg && (
          <motion.div
            key="pg-gallery"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <div className="pg-header">
              <button onClick={handleBackToPgs} className="back-button">
                <ArrowLeft size={20} /> Back to PGs
              </button>
            </div>
            <h2 className="text-center text-primary fw-bold mt-4 mb-5">{selectedPg.name}</h2>
            <div className="pg-gallery-container">
              <motion.div className="main-image-container" key={currentImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <img src={selectedPg.images[currentImage]} alt={`${selectedPg.name} ${currentImage + 1}`} className="main-pg-image" />
              </motion.div>
              <div className="thumbnail-grid">
                {selectedPg.images.map((image, index) => (
                  <motion.div
                    key={index}
                    className={`thumbnail-item ${currentImage === index ? 'active' : ''}`}
                    onClick={() => setCurrentImage(index)}
                    whileHover={{ scale: 1.1 }}
                  >
                    <img src={image} alt={`${selectedPg.name} thumbnail ${index + 1}`} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Areas;
