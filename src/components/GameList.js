import React from 'react';
import { Link } from 'react-router-dom';
import './GameList.css';
import minerImage from '../images/miner.png';
import monetkaImage from '../images/monetka.png';
import scissorsImage from '../images/scissors-paper-stone.jpg';

function GameList() {
  const games = [
    { title: 'Miner', image: minerImage, path: '/miner' },
    { title: 'Monetka', image: monetkaImage, path: '/monetka' },
    { title: 'Scissors-Paper-Stone', image: scissorsImage, path: '/rock-paper-scissors' }
  ];

  const imageStyle = {
    width: '300px',
    height: '250px',
    objectFit: 'cover',
    borderRadius: '8px'
  };

  return (
    <div className="game-list">
      {games.map((game, index) => (
        <Link to={game.path} key={index} className="game-card-link">
          <div className="game-card">
            <img src={game.image} alt={game.title} style={imageStyle} />
            <h3>{game.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default GameList;



