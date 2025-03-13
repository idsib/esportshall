"use client";

import React, { useEffect, useState } from "react";


const gridSize = 20;

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState(generateFood());
  const [highScore, setHighScore] = useState(0);
  const [direction, setDirection] = useState("right");
  const [gameInterval, setGameInterval] = useState<NodeJS.Timeout | null>(null);
  const [gameSpeedDelay, setGameSpeedDelay] = useState(200);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!gameStarted && (event.code === "Space" || event.key === " ")) {
        startGame();
      } else {
        switch (event.key) {
          case "ArrowUp":
            setDirection("up");
            break;
          case "ArrowDown":
            setDirection("down");
            break;
          case "ArrowLeft":
            setDirection("left");
            break;
          case "ArrowRight":
            setDirection("right");
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [gameStarted]);

  function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
  }

  function startGame() {
    setGameStarted(true);
    setGameInterval(
      setInterval(() => {
        move();
        checkCollision();
      }, gameSpeedDelay)
    );
  }

  function move() {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };
      switch (direction) {
        case "up":
          head.y--;
          break;
        case "down":
          head.y++;
          break;
        case "left":
          head.x--;
          break;
        case "right":
          head.x++;
          break;
      }
      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setFood(generateFood());
        increaseSpeed();
      } else {
        newSnake.pop();
      }
      return newSnake;
    });
  }

  function increaseSpeed() {
    setGameSpeedDelay((prevSpeed) => {
      if (prevSpeed > 150) return prevSpeed - 5;
      if (prevSpeed > 100) return prevSpeed - 3;
      if (prevSpeed > 50) return prevSpeed - 2;
      if (prevSpeed > 25) return prevSpeed - 1;
      return prevSpeed;
    });
  }

  function checkCollision() {
    const head = snake[0];
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
      resetGame();
    }
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        resetGame();
      }
    }
  }

  function resetGame() {
    updateHighScore();
    stopGame();
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection("right");
    setGameSpeedDelay(200);
  }

  function stopGame() {
    if (gameInterval) clearInterval(gameInterval);
    setGameStarted(false);
  }

  function updateHighScore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScore) {
      setHighScore(currentScore);
    }
  }

  return (
    <div className="game-container">
      <div className="scores">
        <h1>{snake.length - 1}</h1>
        <h1>{highScore}</h1>
      </div>
      <div className="game-border-1">
        <div className="game-border-2">
          <div className="game-border-3">
            <div className="game-board">
              {snake.map((segment, index) => (
                <div
                  key={index}
                  className="snake"
                  style={{ gridColumn: segment.x, gridRow: segment.y }}
                ></div>
              ))}
              <div
                className="food"
                style={{ gridColumn: food.x, gridRow: food.y }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {!gameStarted && <h1 className="instruction-text">Presiona espacio para empezar</h1>}
    </div>
  );
};

export default SnakeGame;

// CSS del juego
const styles = `
  .game-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    font-family: 'VT323', monospace;
    background-color: #414141;
  }
  .game-board {
    display: grid;
    grid-template-columns: repeat(20, 20px);
    grid-template-rows: repeat(20, 20px);
    margin: 5px;
  }
  .game-border-1 { border: #595f43 solid 10px; border-radius: 30px; }
  .game-border-2 { border: #abb78a solid 8px; border-radius: 26px; }
  .game-border-3 { border: #8b966c solid 30px; border-radius: 20px; }
  .instruction-text { position: absolute; top: 60%; color: #333; text-align: center; }
  .scores { display: flex; justify-content: space-between; }
  .snake { background-color: #5a5a5a; }
  .food { background-color: #dedede; border: #999 5px solid; }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
