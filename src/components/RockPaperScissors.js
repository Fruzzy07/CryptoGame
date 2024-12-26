import { useEffect, useState } from 'react';
import './rock-paper-scissors.css';

const RockPaperScissors = () => {
  const [buttonDisabled, setDisable] = useState(false);
  const [userChoice, setUserChoice] = useState('rock');
  const [computerChoice, setComputerChoice] = useState('rock');
  const [userPoints, setUserPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);
  const [turnResult, setTurnResult] = useState(null);
  const [result, setResult] = useState("Let's see who wins");
  const [gameOver, setGameOver] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);
  const [gameResults, setGameResults] = useState(() => {
    // Load results from localStorage on first load
    const savedResults = localStorage.getItem('gameResults');
    return savedResults ? JSON.parse(savedResults) : [];
  });

  const choices = ['rock', 'paper', 'scissors'];

  useEffect(() => {
    localStorage.setItem('gameResults', JSON.stringify(gameResults));
  }, [gameResults]);

  const handleClick = (value) => {
    setUserChoice(value);
    playGame(value);
  };

  const playGame = (playerChoice) => {
    const dealerChoice = choices[Math.floor(Math.random() * 3)];
    setComputerChoice(dealerChoice);

    const playerChoiceValue = choices.indexOf(playerChoice);
    const dealerChoiceValue = choices.indexOf(dealerChoice);

    if (playerChoiceValue === dealerChoiceValue) {
      setTurnResult("It's a tie!");
    } else if (
      (playerChoiceValue === 0 && dealerChoiceValue === 2) ||
      (playerChoiceValue === 1 && dealerChoiceValue === 0) ||
      (playerChoiceValue === 2 && dealerChoiceValue === 1)
    ) {
      setTurnResult('You win this round!');
      setUserPoints((prev) => prev + 1);
    } else {
      setTurnResult('You lose this round!');
      setComputerPoints((prev) => prev + 1);
    }

    const newHistory = {
      userChoice: playerChoice,
      computerChoice: dealerChoice,
      result: turnResult,
    };
    setGameHistory((prevHistory) => [...prevHistory, newHistory]);

    if (userPoints + computerPoints === 3) {
      setGameOver(true);
      const gameResult =
        userPoints === 2 ? 'You won the game!' : 'Computer won the game!';
      setResult(gameResult);

      // Save game results in the gameResults array and in localStorage
      const updatedResults = [...gameResults, gameResult];
      setGameResults(updatedResults);
      localStorage.setItem('gameResults', JSON.stringify(updatedResults));
    }
  };

  useEffect(() => {
    if (userPoints === 2) {
      setGameOver(true);
      setResult('Congratulations! You won the game!');
      setDisable(true);
    } else if (computerPoints === 2) {
      setGameOver(true);
      setResult('Game over! Computer won.');
      setDisable(true);
    }
  }, [userPoints, computerPoints]);

  const reset = () => {
    setDisable(false);
    setUserChoice('rock');
    setComputerChoice('rock');
    setUserPoints(0);
    setComputerPoints(0);
    setTurnResult(null);
    setResult("Let's see who wins");
    setGameOver(false);
    setGameHistory([]); // Clear round history when resetting
  };

  // Check for winner
  useEffect(() => {
    if (userPoints >= 2 || computerPoints >= 2) {
      const winner = userPoints >= 2 ? 'User' : 'Computer';
      setResult(`${winner} wins the game!`);
      setGameOver(true);

      // Add completed game result to gameResults
      setGameResults((prevResults) => [...prevResults, winner]);
    }
  }, [userPoints, computerPoints]);

  return (
    <div className="RockPaperScissors">
      <h1 className="heading">Rock-Paper-Scissors</h1>
      <div className="score">
        <h1>User Points: {userPoints}</h1>
        <h1>Computer Points: {computerPoints}</h1>
      </div>

      <div className="choice">
        <div className="choice-user">
          <img
            className="user-hand"
            src={`../images/${userChoice}.png`}
            alt="User choice"
          />
        </div>
        <div className="choice-computer">
          <img
            className="computer-hand"
            src={`../images/${computerChoice}.png`}
            alt="Computer choice"
          />
        </div>
      </div>

      <div className="buttons">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => handleClick(choice)}
            disabled={buttonDisabled}
          >
            {choice.charAt(0).toUpperCase() + choice.slice(1)}
          </button>
        ))}
      </div>

      <div className="result">
        <h1>{turnResult}</h1>
        <h2>{result}</h2>
      </div>

      {gameOver && (
        <button className="reset" onClick={reset}>
          Reset Game
        </button>
      )}

      <div className="history">
        <h2>Round History</h2>
        {gameHistory.map((round, index) => (
          <p key={index}>
            {index + 1}: You chose {round.userChoice}, Computer chose{' '}
            {round.computerChoice} - {round.result}
          </p>
        ))}
      </div>

      <div className="history">
        <h2>Game Results</h2>
        {gameResults.map((result, index) => (
          <p key={index}>
            {index + 1}: {result}
          </p>
        ))}
      </div>
    </div>
  );
};

export default RockPaperScissors;
