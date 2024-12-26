import './Square.css'; 
import hoverEffect from '../assets/Sound/hover.wav'; 
import DiamondEffect from '../assets/Sound/gold.wav'; 
import goldIcon from '../assets/gold.png'; 
import bombIcon from '../assets/bomb.png'; 
import { useEffect, useState } from 'react'; 
 
function Square({ mine, setGameOver, gameOver, setScore }) { 
    let [clicked, setClicked] = useState(false); // Track if this square is clicked 
    let [image, setImage] = useState(null); 
 
    useEffect(() => { 
        if (gameOver) { 
            // Reveal all squares when the game is over 
            if (mine) { 
                setImage(bombIcon); // Show bomb for mines 
            } else { 
                setImage(goldIcon); // Show gold for non-mines 
            } 
        } 
    }, [gameOver, mine]); 
 
    function mouseEnterHandle() { 
        if (!image && !clicked) { 
            const sound = new Audio(hoverEffect); 
            sound.play(); 
        } 
    } 
 
    function clickHandler() { 
        if (gameOver || clicked) return; // Prevent further actions if already clicked or game is over 
 
        setClicked(true); // Mark the square as clicked 
 
        if (!mine) { 
            setScore((prevValue) => prevValue * 2); // Update score 
            setImage(goldIcon); // Show gold icon 
            const sound = new Audio(DiamondEffect); 
            sound.play(); 
        } else { 
            alert("You Lose The Game"); 
            setGameOver(true); // End the game 
            setImage(bombIcon); // Show bomb icon 
        } 
    } 
 
    return ( 
        <div 
            className='square-item' 
            onMouseEnter={mouseEnterHandle} 
            onClick={clickHandler} 
        > 
            {image && <img height={90} width={90} src={image} />} 
        </div> 
    ); 
} 
 
export default Square;