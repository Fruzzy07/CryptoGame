import { useEffect, useState } from 'react';
import './Square.css';

import hoverEffect from '../assets/Sound/hover.wav';
import DiamondEffect from '../assets/Sound/gold.wav';
import goldIcon from '../assets/gold.png';
import bombIcon from '../assets/bomb.png';

function Square({ mine, setGameOver, gameOver, setScore, gameReset }) {
    const [clicked, setClicked] = useState(false);
    const [image, setImage] = useState(null);

    // Скрыть все иконки при сбросе игры
    useEffect(() => {
        if (gameReset) {
            setClicked(false);
            setImage(null);
        }
    }, [gameReset]);

    // Показать все иконки при завершении игры
    useEffect(() => {
        if (gameOver) {
            if (mine) {
                setImage(bombIcon);
            } else {
                setImage(goldIcon);
            }
        }
    }, [gameOver, mine]);

    const mouseEnterHandle = () => {
        if (!image && !clicked) {
            const sound = new Audio(hoverEffect);
            sound.play();
        }
    };

    const clickHandler = () => {
        if (gameOver || clicked) return;

        setClicked(true);
        if (!mine) {
            setScore((prevValue) => prevValue * 2);
            setImage(goldIcon);
            const sound = new Audio(DiamondEffect);
            sound.play();
        } else {
            alert('You Lose The Game');
            setGameOver(true);
            setImage(bombIcon);
        }
    };

    return (
        <div className="square-item" onMouseEnter={mouseEnterHandle} onClick={clickHandler}>
            {image && <img height={90} width={90} src={image} alt="square-icon" />}
        </div>
    );
}

export default Square;
