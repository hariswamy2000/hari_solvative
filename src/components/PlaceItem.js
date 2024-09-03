import React from 'react';
// import './PlaceItem.css';

const PlaceItem = ({ place }) => {
  return (
    <div className="place-item">
      <h4>{place.name}</h4>
      <p>{place.description}</p>
    </div>
  );
};

export default PlaceItem;
