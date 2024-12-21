import './Square.css';
import hoverEffect from '../assets/Sound/hover.wav';
import DiamondEffect from '../assets/Sound/gold.wav';
import goldIcon from '../assets/gold.png';
import bombIcon from '../assets/bomb.png';
import { useEffect, useState } from 'react';

function Square({ mine, setGameOver, gameOver, setScore }) {

    let [image, setImage] = useState(null);

    useEffect(() => {
        if (gameOver) {
            if (mine) {
                setImage(bombIcon);
            }
            else {
                setImage(goldIcon);
            }
        }
    }, [gameOver, mine])

    function mouseEnterHandle() {
        if (!image) {
            const sound = new Audio(hoverEffect);
            sound.play();
        }
    }

    function clickHandler() {

        if(gameOver) return;

        if (!mine) {
            setScore((prevValue) => {
                return prevValue * 2;
            });
            setImage(goldIcon);
            const sound = new Audio(DiamondEffect);
            sound.play();
        } else {
            alert("You Loose The Game");
            setGameOver(true);
        }
    }

    return <>
        <div
            className='square-item'
            onMouseEnter={mouseEnterHandle}
            onClick={clickHandler}
        >
            {image && <img height={90} width={90} src={image} />}
        </div>
    </>
}

export default Square;