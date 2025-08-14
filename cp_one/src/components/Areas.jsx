import React, { useState } from 'react';
import { ArrowLeft, Star, Wifi, Tv, Refrigerator, WashingMachine } from 'lucide-react';
import './Areas.css';

const areasData = [
  {
    name: 'Koramangala',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    pgs: [
      { id: 1, name: 'kaalamma pg', images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&h=300', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&h=300', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&h=300'], price: 15000, sharing: 'Single', rating: 4.5, gender: 'Boys', location: 'Koramangala 1st Block', description: 'Experience the best of city living with top-notch amenities and a vibrant community.', facilities: ['Wifi', 'TV', 'Refrigerator'] },
      { id: 2, name: 'maaramma pg', images: ['https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=400&h=300', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&h=300'], price: 9500, sharing: 'Twin', rating: 4.2, gender: 'Girls', location: 'Koramangala 5th Block', description: 'A perfect blend of comfort and convenience, designed for students and professionals.', facilities: ['Wifi', 'Washing Machine'] },
    ],
  },
  {
    name: 'HSR Layout',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
    pgs: [
      { id: 3, name: 'rajanna pg', images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&h=300'], price: 8000, sharing: 'Triple', rating: 4.0, gender: 'Boys', location: 'HSR Layout Sector 2', description: 'Affordable and well-maintained PG with all essential facilities.', facilities: ['Wifi'] },
    ],
  },
  {
    name: 'Marathahalli',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
    pgs: [
      { id: 4, name: 'sia pg', images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=400&h=300'], price: 12000, sharing: 'Twin', rating: 4.8, gender: 'Unisex', location: 'Near Marathahalli Bridge', description: 'Premium accommodation with a focus on quality and service.', facilities: ['Wifi', 'TV', 'Refrigerator', 'Washing Machine'] },
      { id: 5, name: 'mariyappa pg', images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=400&h=300'], price: 7500, sharing: 'Four', rating: 3.9, gender: 'Boys', location: 'Outer Ring Road', description: 'Budget-friendly PG for those looking for a comfortable stay without breaking the bank.', facilities: ['Wifi'] },
    ],
  },
  {
    name: 'Vijayanagar',
    image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80',
    pgs: [
      { id: 6, name: 'maruthi pg', images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=400&h=300'], price: 10000, sharing: 'Twin', rating: 4.3, gender: 'Girls', location: 'Near Vijayanagar Metro', description: 'Modern living space with excellent connectivity and amenities.', facilities: ['Wifi', 'TV'] },
    ],
  },
];

const Areas = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedPg, setSelectedPg] = useState(null);

  const handleSelectArea = (area) => setSelectedArea(area);
  const handleBackToAreas = () => setSelectedArea(null);

  const handleSelectPg = (pg) => setSelectedPg(pg);
  const handleBackToPgs = () => setSelectedPg(null);

  // Render PG Image Gallery
  if (selectedPg) {
    return (
      <div id="pg-gallery" className="container mt-5 pt-5">
        <div className="pg-header">
          <button onClick={handleBackToPgs} className="back-button">
            <ArrowLeft size={20} /> Back to PGs
          </button>
        </div>
        <h2 className="text-center text-primary fw-bold mt-4 mb-5">{selectedPg.name} - Photos</h2>
        <div className="pg-image-grid">
          {selectedPg.images.map((image, index) => (
            <div key={index} className="pg-image-item">
              <img src={image} alt={`${selectedPg.name} ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render PG List for an Area
  if (selectedArea) {
    return (
      <div id="areas" className="container mt-5 pt-5">
        <div className="pg-header">
          <button onClick={handleBackToAreas} className="back-button">
            <ArrowLeft size={20} /> Back to Areas
          </button>
        </div>
        <h2 className="text-center text-primary fw-bold mt-4 mb-5">PGs in {selectedArea.name}</h2>
        <div className="pg-list-detailed">
          {selectedArea.pgs.map((pg) => (
            <div key={pg.id} className="pg-detailed-card">
              <img src={pg.images[0]} alt={pg.name} className="pg-card-image" onClick={() => handleSelectPg(pg)} />
              <div className="pg-detailed-info">
                <div className="pg-detailed-header">
                  <span className="pg-price">₹{pg.price.toLocaleString()}</span>
                  <span className="pg-sharing">{pg.sharing} Sharing</span>
                  <div className="pg-rating">
                    {pg.rating.toFixed(1)} <Star size={16} className="star-icon" />
                  </div>
                </div>
                <h3 className="pg-detailed-name">{pg.name}</h3>
                <p className="pg-location">in {pg.location}</p>
                                  <p className="pg-description">{pg.description}</p>
                  <div className="pg-facilities">
                    <h4 className="facilities-title">Facilities</h4>
                    <div className="facilities-grid">
                      {pg.facilities.map(facility => (
                        <div key={facility} className="facility-item">
                          {facility === 'Wifi' && <Wifi size={20} />}
                          {facility === 'TV' && <Tv size={20} />}
                          {facility === 'Refrigerator' && <Refrigerator size={20} />}
                          {facility === 'Washing Machine' && <WashingMachine size={20} />}
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                <div className="pg-detailed-footer">
                  <div className="d-flex justify-content-start"><a href="#contact-us" className="btn btn-danger">Contact</a><a href="#" className="btn btn-success ms-2">Apply</a></div>
                  <span className={`gender-tag ${pg.gender.toLowerCase()}`}>{pg.gender}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render Area Selection
  return (
    <div id="areas" className="container mt-5 pt-5">
      <h2 className="text-center text-primary fw-bold mt-5 mb-5">Select an Area</h2>
      <div className="area-grid">
        {areasData.map((area) => (
          <div key={area.name} className="area-card" onClick={() => handleSelectArea(area)}>
            <img src={area.image} alt={area.name} className="area-image" />
            <div className="area-card-overlay">
              <h3 className="area-card-name">{area.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Areas;
