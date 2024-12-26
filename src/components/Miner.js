import React, { useState } from 'react';
import './Miner.css';
import Square from './Square/Square';

// Генерация случайных чисел
function generateRandomNumbers() {
  let numbers = [];
  while (numbers.length < 3) {
    let randomNumber = Math.floor(Math.random() * 25) + 1;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
}

function Miner() {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(100);
  const [randomNumbers, setRandomNumbers] = useState(generateRandomNumbers());
  const [gameReset, setGameReset] = useState(false); // Состояние сброса игры

  const resetGame = () => {
    setGameOver(false);
    setScore(100);
    setRandomNumbers(generateRandomNumbers());
    setGameReset(true); // Указываем клеткам, что игра сброшена
    setTimeout(() => setGameReset(false), 0); // Сбрасываем флаг сразу после применения
  };

  const items = [];
  for (let index = 1; index <= 25; index++) {
    items.push(
        <Square
            key={index}
            mine={randomNumbers.includes(index)}
            setGameOver={setGameOver}
            gameOver={gameOver}
            setScore={setScore}
            gameReset={gameReset} // Передаем флаг сброса
        />
    );
  }

  return (
      <div className="d-flex gap-10">
        <div className="totalScore">
          <p>Total Score</p>
          <p>{score} PTS</p>
          {gameOver && (
              <button onClick={resetGame} className="try-again-btn">
                Try Again
              </button>
          )}
        </div>
        <div className="d-grid">{items}</div>
      </div>
  );
}

export default Miner;
