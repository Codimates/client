import React from 'react';
import Banner from '../../images/BGG1.jpeg';

export default function HomePageBanner() {
  return (
    <div
      className="relative w-full bg-center bg-cover h-96"
      style={{ backgroundImage: `url(${Banner})` }}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">Unbeatable Prices, Unmatched Quality – Find Your Perfect Laptop Today!</h1>
      </div>
    </div>
  );
}
