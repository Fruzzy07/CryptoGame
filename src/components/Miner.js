import { useState } from 'react'; 
import './Miner.css'; 
import Square from './Square/Square'; 
 
function getRandomInt(min, max) { 
  min = Math.ceil(min); 
  max = Math.floor(max); 
  return Math.floor(Math.random() * (max - min + 1)) + min; 
} 
 
let randomNumbers = []; 
 
while (randomNumbers.length < 3) { 
  let randomNumber = getRandomInt(1, 25); 
  if (!randomNumbers.includes(randomNumber)) { 
    randomNumbers.push(randomNumber); 
  } 
} 
 
console.log(randomNumbers); 
 
function Miner() { 
  let [gameOver, setGameOver] = useState(false); 
  let [score, setScore] = useState(100); 
 
  let items = []; 
  for (let index = 1; index < 26; index++) { 
    items.push( 
      <Square 
        key={index} 
        mine={randomNumbers.includes(index)} 
        setGameOver={setGameOver} 
        gameOver={gameOver} 
        setScore={setScore} 
      /> 
    ); 
  } 
 
  return ( 
    <> 
      <div className='d-flex gap-10'> 
        <div className='totalScore'> 
          <p>Total Score</p> 
          <p>{score} PTS</p> 
        </div> 
        <div className='d-grid'>{items}</div> 
      </div> 
    </> 
  ); 
} 
 
export default Miner;