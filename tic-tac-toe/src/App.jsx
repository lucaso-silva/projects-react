import { useState } from 'react';

import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx"
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

function obtainActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState({
        X: "Player 1",
        O: "Player 2"
    });
    // const [hasWinner, setHasWinner] = useState(false);
    // const [activePlayer, setActivePlayer] = useState('X');
    //to avoid managing unnecessary states the information about the active place will be gotten through a helper function
    const activePlayer = obtainActivePlayer(gameTurns);

    //to make possible that the initialGameBoard will be set to a null empty array when handleRestart is called, we need to create a deep copy of initialGameBoard
    let gameBoard = [...initialGameBoard.map(array => [...array])];

    for(const turn of gameTurns) {
        const { square, player } = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }

    let winner = null;

    for(const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        //checking if the squares are not null and have the same symbol
        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        ) {
            winner = players[firstSquareSymbol];
        }
    }

    const hasDraw = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex, colIndex) {
        //setActivePlayer((curActivePlayer)=> curActivePlayer === 'X' ? 'O' : 'X');
        setGameTurns((prevTurns) => {
            const currentPlayer = obtainActivePlayer(prevTurns);

            const updatedTurns = [{ square: {row: rowIndex, col: colIndex }, player: currentPlayer}, ...prevTurns];
            
            return updatedTurns;
        });
    }

    function handleRestart() {
      setGameTurns([]);
    }

    function handlePlayerName(symbol, newName) {
        setPlayers(player=> {
            return {
                ...player,
                [symbol]: newName
            };
        });
    }

    return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerName}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerName}/>
        </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare}
                   board={gameBoard}
        />
      </div>
        <Log turns={gameTurns}/>
    </main>
  )
}

export default App
