import React, { useState } from "react";
import './App.css'

const ChessBoard = () => {
  const [selected, setSelected] = useState(null);

  const handleSquareClick = (row, col) => {
    setSelected({ row, col });
  };

  const isHighlighted = (row, col) => {
    if (!selected) {
      return false;
    }
    const { row: selectedRow, col: selectedCol } = selected;
    return (
      row + col === selectedRow + selectedCol ||
      row - col === selectedRow - selectedCol
    );
  };

  const renderSquare = (row, col) => {
    const isWhite = (row + col) % 2 === 0;
    const className = `square ${isWhite ? "white" : "black"} ${
      selected && selected.row === row && selected.col === col
        ? "selected"
        : ""
    } ${isHighlighted(row, col) ? "highlighted" : ""}`;
    return (
      <div
        key={`${row}-${col}`}
        className={className}
        onClick={() => handleSquareClick(row, col)}
      />
    )
  }

  const renderRow = (row) => {
    const squares = [];
    for (let col = 0; col < 8; col++) {
      squares.push(renderSquare(row, col));
    }
    return <div key={row} className="row">{squares}</div>;
  };

  const rows = [];
  for (let row = 0; row < 8; row++) {
    rows.push(renderRow(row));
  }

  return <div className="board">{rows}</div>;
};

export default ChessBoard;
