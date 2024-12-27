import React, { useState } from 'react';
import './Miner.css';
import Square from './Square/Square';
import { useGlobalState } from '../context/GlobalState';

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
  const [count, setCount] = useState(0.0);
  const [score, setScore] = useState(100);
  const [randomNumbers, setRandomNumbers] = useState(generateRandomNumbers());
  const [gameReset, setGameReset] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const { balance, setBalance } = useGlobalState();

  const takeMoney = () => {
    setBalance((balance) => balance + count);
    setGameOver(false);
    setGameStarted(false);
    setCount(0);
    setRandomNumbers(generateRandomNumbers());
    setGameReset(true);
    setTimeout(() => setGameReset(false), 0);
  };

  const resetGame = () => {
    setGameOver(false);
    setGameStarted(false);
    setScore(100);
    setCount(0);
    setRandomNumbers(generateRandomNumbers());
    setGameReset(true);
    setTimeout(() => setGameReset(false), 0);
  };

  const startGame = () => {
    if (balance >= 0.0001) {
      setGameStarted(true);
      setBalance((balance) => balance - 0.0001);
    } else {
      alert('Insufficient balance. Please top up to start the game.');
    }
  };

  const items = [];
  for (let index = 1; index <= 25; index++) {
    items.push(
      <Square
        count={count}
        setCount={setCount}
        key={index}
        mine={randomNumbers.includes(index)}
        setGameOver={setGameOver}
        gameOver={gameOver}
        setScore={setScore}
        gameReset={gameReset}
      />
    );
  }

  return (
    <div className="d-flex gap-10">
      <div className="totalScore">
        <p>Total Score : {count}</p>

        {gameOver && (
          <button
            onClick={resetGame}
            className="try-again-btn"
          >
            Try Again
          </button>
        )}
        {gameStarted && !gameOver && (
          <button
            onClick={takeMoney}
            className="try-again-btn"
          >
            Take the Money
          </button>
        )}
        {!gameStarted && (
          <div>
            {/* <p>Balance: {balance} ETH</p>  */}
            {balance >= 0.0001 ? (
              <button
                onClick={startGame}
                className="start-btn"
              >
                Start Game
              </button>
            ) : (
              <p>You need at least 0.0001 ETH to start the game.</p>
            )}
          </div>
        )}
      </div>
      {gameStarted && <div className="d-grid">{items}</div>}
    </div>
  );
}

export default Miner;
