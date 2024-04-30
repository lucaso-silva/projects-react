import {useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard({onSelectSquare, activePlayerSymbol}){
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex, colIndex) {
        setGameBoard((prevGameBoard)=>{
            //This is not the correct way to change the array, instead we need to create a copy and then change this copy
            // prevGameBoard[rowIndex][colIndex] = 'X';
            // return prevGameBoard;

            const updateGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updateGameBoard[rowIndex][colIndex] = activePlayerSymbol;
            return updateGameBoard;
        });

        //we receive the function handleSelectSquare defined in the App component,
        //and then call this function inside the GameBoardComponent
        onSelectSquare();
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex)=><li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex)=><li key={colIndex}>
                                                                    <button onClick={()=>handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                                                                </li>)}
                </ol>
            </li>)}
        </ol>
    )
}