import React from 'react';
import PlaceItem from './PlaceItem';
// import './PlaceList.css';

const PlaceList = ({ places }) => {
  return (
    <div className="place-list">
      {places.map((place, index) => (
        <PlaceItem key={index} place={place} />
      ))}
    </div>
  );
};

export default PlaceList;
