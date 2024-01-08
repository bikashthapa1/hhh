
import { useState } from "react";

export default function GameBoard({onSelectSquare,board}) {
  
  
  //const [gameBoard, setGameBoard] = useState(initialGameBoard);
  // function handclick(rowIndex, colIndex) {
  //   setGameBoard((prevBoard) => {
  //     const updatedBoard = [...prevBoard].map((innerArray) => [...innerArray]);
  //     updatedBoard[rowIndex][colIndex] = currentPlayer;
  //     return updatedBoard;
  //   });
  //   onSelectSquare(rowIndex,colIndex);
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol >
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !==null}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
