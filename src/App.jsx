import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/log.jsx";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATION.jsx";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function deriveActivePlayer(turn){
  let player = "X";
    if ( turn.length>0 && turn[0].player == "X") player = "O";
  return player;  
}

function App() {
  const[gameTurn, setGameTurn] = useState([]);
  const [playerName, setPlayerName] = useState({
    X:'Player1',
    O:'Player2'
  })
  
  let gameBoard =[...initialGameBoard.map((array) => [...array])];
  
  for(const  turn of gameTurn){
    const {square,player}=turn;
    const {row,col}=square;
    gameBoard[row][col]=player;
  }

  const activePlayer = deriveActivePlayer(gameTurn);

  function handleSelectSquare(rowIndex, colIndex){
    setGameTurn((prevGameTurn) => {
      const player = deriveActivePlayer(prevGameTurn)
      const updatedGameTurn = [
        { square: { row: rowIndex, col: colIndex }, player: player },
        ...prevGameTurn,
      ];
      return updatedGameTurn;
    });
  }

  function playerNameChange(symbol, newName){
    setPlayerName((players) =>{
      return {
        ...players,
        [symbol] : newName
      };
    });
  }

  function handleRestart(){
    setGameTurn([]);
  }
  let winner ="";
  for (const combination of WINNING_COMBINATIONS){  
     let firstSymbol= gameBoard[combination[0].row] [combination[0].column];
     let  secondSymbol= gameBoard[combination[1].row][combination[1].column];
     let thirdSymbol = gameBoard[combination[2].row][combination[2].column];

      if(firstSymbol && firstSymbol==secondSymbol && firstSymbol==thirdSymbol){
        winner=playerName[firstSymbol];
      }    
  }
  let hasDraw = gameTurn.length ==9;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className= "highlight-player">
          <Player name="Player1" symbol="X" isActive={activePlayer=='X'} onChangeName={playerNameChange} />
          <Player name="Player2" symbol="O" isActive={activePlayer=='O'} onChangeName={playerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver restart={handleRestart} winner={winner} hasDraw={hasDraw}/>}
       <GameBoard onSelectSquare={handleSelectSquare} 
       board={gameBoard}/>
      </div>

      <Log gameTurn={gameTurn} restart={handleRestart}/>   
    </main>
  );
}

export default App;
