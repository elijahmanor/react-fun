import React, { useState } from "react";
import classNames from "classnames";
import { useSpring, animated } from "react-spring";
import "./TicTacToe.scss";

function Square({ value, index, onClick }) {
  const props = useSpring({ opacity: value ? 1 : 0 });
  return (
    <button className="Square" onClick={() => onClick(index)}>
      <animated.div style={props}>{value}</animated.div>
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let winner = lines.reduce((memo, [a, b, c]) => {
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      memo = squares[a];
    }
    return memo;
  }, "");
  if (!winner && squares.every(s => s)) {
    winner = "tie";
  }
  return winner;
}

function Board({ squares, onClick }) {
  return (
    <div className="Board">
      {squares.map((square, i) => (
        <Square key={i} index={i} value={square} onClick={onClick} />
      ))}
    </div>
  );
}

function Announcement({ winner, onStart }) {
  const props = useSpring({
    to: async (next, cancel) => {
      await next({ opacity: 1 });
      await next({ opacity: 1, transform: "scale(1.1)" });
    },
    from: { opacity: 0, transform: "scale(1)" }
  });
  return (
    <animated.div style={props} className="Announcement">
      {winner === "tie" ? (
        <div>Tie Game</div>
      ) : (
        <div>
          <div>Congrats</div>
          <h1>{winner}</h1>
        </div>
      )}
      <button
        className="Announcement-button Announcement-button--primary"
        onClick={onStart}
      >
        Start
      </button>
    </animated.div>
  );
}

function Message({ hasStarted, isXNext }) {
  return (
    <div className="Message">
      {hasStarted
        ? isXNext
          ? "It's Xs turn"
          : "It's Os turn"
        : "Click to start game"}
    </div>
  );
}

export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState("");

  function handleClick(i) {
    const moves = [...squares];
    moves[i] = isXNext ? "X" : "O";
    setSquares(moves);
    setIsXNext(!isXNext);
    const winner = calculateWinner(moves);
    if (winner) {
      setWinner(winner);
    }
  }
  function handleStart() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  }

  return (
    <div className={classNames("Game", { "Game--winner": !!winner })}>
      <Board squares={squares} onClick={handleClick} />
      <Message hasStarted={squares.some(s => s)} isXNext={isXNext} />
      {!!winner && <Announcement winner={winner} onStart={handleStart} />}
    </div>
  );
}
