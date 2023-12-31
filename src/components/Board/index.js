import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSquare } from "../../Redux/Reducers/gameReducer";
import { calculateWinner } from "../../Redux/Utils/utils";
import { resetGame } from "../../Redux/Reducers/gameReducer";
import Square from "../Square";
import "./board-styles.scss";

const Board = () => {
    const squares = useSelector((state) => state.game.squares);

    const xIsNext = useSelector((state) => state.game.xIsNext);

    const dispatch = useDispatch();

    const winner = calculateWinner(squares);
    
    let status;
    if (winner) {
        status = `Winner: ${winner.player}`;
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    const handleClick = (index) => {
        if (squares[index] || winner || calculateWinner(squares)) {
            return;
        }

        dispatch(updateSquare({ index }));
    };

    const renderSquare = (index) => {
        const { line: winnerSquares = [] } = winner || {};
        const isWinningSquare = winnerSquares.includes(index);
        const animationClass = isWinningSquare ? 'winning-square' : '';

        return (
            <div className={`square ${animationClass}`}>
                <Square
                    value={squares[index]}
                    onClick={() => handleClick(index)}
                />
            </div>
        );
    };

    const handleReset = () => {
        dispatch(resetGame());
    };

    return(
        <div className="game">
            <div className="status">{status}</div>
            <div className="board">
                <div className="board-row">
                    {renderSquare(0)}            
                    {renderSquare(1)}            
                    {renderSquare(2)}            
                </div>
                <div className="board-row">
                    {renderSquare(3)}            
                    {renderSquare(4)}            
                    {renderSquare(5)}            
                </div>
                <div className="board-row">
                    {renderSquare(6)}            
                    {renderSquare(7)}            
                    {renderSquare(8)}            
                </div>
            </div>
            <button onClick={handleReset} className="reset-button">
                Reset
            </button>
        </div>
    );
};

export default Board;