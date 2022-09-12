import React from "react";
import Square from "./Square";
import { useState, useEffect } from "react";

const initialState = ["", "", "", "", "", "", "", "", ""];

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};
const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};
const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};
const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};
const rowStyle = {
  display: "flex",
};

export default function Board() {
  const [gameState, updateState] = useState(initialState);
  const [chanceOfX, updateChanceOfX] = useState(false);
  const [players, setPlayers] = useState("X");
  
  const clearGame = () => {
    updateState(initialState);
  };
  useEffect(() => {
    let winner = checkwinner();
    if (winner) {
      alert(`${winner} won the game!!`);
      clearGame();
    }
  }, [gameState]);

  const checkwinner = () => {
    const totalLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < totalLines.length; i++) {
      const [a, b, c] = totalLines[i];
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return gameState[a];
      }
    }
    return null;
  };
 
  const handelEvent = (index) => {
    let stringOfGameState = Array.from(gameState);
    stringOfGameState[index] = chanceOfX ? "X" : "O";
    setPlayers(chanceOfX ? "O" : "X");
    updateState(stringOfGameState);
    updateChanceOfX(!chanceOfX);
  };
  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span> {players} </span>
      </div>
      <button
        style={buttonStyle}
        onClick={() => {
          updateState(initialState);
        }}
      >
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square state={gameState[0]} onClick={() => handelEvent(0)} />
          <Square state={gameState[1]} onClick={() => handelEvent(1)} />
          <Square state={gameState[2]} onClick={() => handelEvent(2)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square state={gameState[3]} onClick={() => handelEvent(3)} />
          <Square state={gameState[4]} onClick={() => handelEvent(4)} />
          <Square state={gameState[5]} onClick={() => handelEvent(5)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square state={gameState[6]} onClick={() => handelEvent(6)} />
          <Square state={gameState[7]} onClick={() => handelEvent(7)} />
          <Square state={gameState[8]} onClick={() => handelEvent(8)} />
        </div>
      </div>
    </div>
  );
}
