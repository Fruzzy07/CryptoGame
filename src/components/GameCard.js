// src/components/GameCard.js
import React from 'react';

function GameCard({ title, image, description }) {
  return (
    <div className="game-card">
      <img src={image} alt={`${title} thumbnail`} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default GameCard;
